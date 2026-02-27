/**
 * SEA Fertility Genomics Research — Frontend
 * Vanilla JS, no frameworks, no build step.
 * Loads data from /api/ JSON files (or inline fallback for file:// protocol).
 */

(function () {
  'use strict';

  // --- State ---
  let CLINICS = [];
  let STATS = {};
  let REGULATORY = [];
  let activeCountries = new Set();
  let activeTier = 'all';
  let searchTerm = '';
  let map, markerGroup;

  // --- Tier config ---
  const TIER_COLORS = {
    1: '#10B981',
    2: '#F59E0B',
    3: '#94A3B8',
    null: '#CBD5E1',
  };
  const TIER_RADIUS = { 1: 8, 2: 6, 3: 5, null: 5 };
  const TIER_LABELS = {
    1: 'Tier 1',
    2: 'Tier 2',
    3: 'Tier 3',
    null: 'Untiered',
  };
  const TIER_CLASSES = {
    1: 'badge-tier1',
    2: 'badge-tier2',
    3: 'badge-tier3',
    null: 'badge-untiered',
  };

  // Priority country order
  const COUNTRY_ORDER = ['Vietnam', 'Malaysia', 'Singapore', 'Thailand', 'Indonesia', 'Brunei'];

  // --- Data loading ---
  async function loadData() {
    try {
      const [clinicsRes, statsRes, regRes] = await Promise.all([
        fetch('api/clinics.json'),
        fetch('api/clinics-stats.json'),
        fetch('api/regulatory.json'),
      ]);
      CLINICS = await clinicsRes.json();
      STATS = await statsRes.json();
      REGULATORY = await regRes.json();
    } catch (e) {
      console.warn('Could not fetch JSON (file:// protocol?). Trying inline data...');
      // Fallback: show error message
      document.getElementById('metrics-grid').innerHTML =
        '<p style="color:#EF4444; grid-column: 1/-1;">Data loading failed. Please serve this site via HTTP (e.g., <code>npx serve .</code> or <code>python3 -m http.server</code>).</p>';
      return false;
    }
    return true;
  }

  // --- Render hero metrics ---
  function renderMetrics() {
    const tier1Count = CLINICS.filter(c => c.tier === 1).length;
    const grid = document.getElementById('metrics-grid');
    grid.innerHTML = `
      <div class="metric-card">
        <div class="metric-value">${CLINICS.length}</div>
        <div class="metric-label">Clinics Mapped</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">${Object.keys(STATS.by_country || {}).length}</div>
        <div class="metric-label">Countries</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">${tier1Count}</div>
        <div class="metric-label">Tier 1 — Ready Now</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">3</div>
        <div class="metric-label">Priority Countries</div>
      </div>
    `;
  }

  // --- Render map ---
  function initMap() {
    map = L.map('map', {
      scrollWheelZoom: false,
    }).setView([5, 106], 5);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 18,
    }).addTo(map);

    markerGroup = L.markerClusterGroup({
      maxClusterRadius: 40,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      iconCreateFunction: function (cluster) {
        const count = cluster.getChildCount();
        return L.divIcon({
          html: '<div style="background:var(--primary);color:white;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;font-family:Inter,sans-serif;box-shadow:0 2px 4px rgba(0,0,0,0.2)">' + count + '</div>',
          className: '',
          iconSize: [36, 36],
        });
      },
    });

    map.addLayer(markerGroup);
    renderMapMarkers();
  }

  function renderMapMarkers() {
    markerGroup.clearLayers();
    const filtered = getFilteredClinics();

    filtered.forEach(c => {
      if (!c.lat || !c.lng) return;
      const color = TIER_COLORS[c.tier] || TIER_COLORS[null];
      const size = (TIER_RADIUS[c.tier] || TIER_RADIUS[null]) * 2;

      const marker = L.marker([c.lat, c.lng], {
        icon: L.divIcon({
          className: '',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
          html: '<div style="width:' + size + 'px;height:' + size + 'px;background:' + color + ';border:1.5px solid #fff;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,0.3)"></div>',
        }),
      });

      const website = c.website
        ? `<a href="https://${c.website}" target="_blank" rel="noopener">${c.website}</a>`
        : '<span style="color:#94A3B8">No website</span>';
      const tierBadge = `<span class="badge ${TIER_CLASSES[c.tier] || TIER_CLASSES[null]}">${TIER_LABELS[c.tier] || TIER_LABELS[null]}</span>`;
      const services = c.services || '<span style="color:#94A3B8">Not listed</span>';

      marker.bindPopup(`
        <div style="font-family:Inter,sans-serif;font-size:13px;line-height:1.5;min-width:200px">
          <strong style="font-size:14px">${escapeHtml(c.clinic_name)}</strong><br>
          ${escapeHtml(c.city)}, ${escapeHtml(c.country)} ${tierBadge}<br>
          <span style="color:#475569">${services}</span><br>
          ${website}
        </div>
      `);

      markerGroup.addLayer(marker);
    });
  }

  // --- Render filters ---
  function renderFilters() {
    // Country filters
    const countryDiv = document.getElementById('country-filters');
    const countries = COUNTRY_ORDER.filter(c => STATS.by_country && STATS.by_country[c]);
    activeCountries = new Set(countries);

    const allBtn = createFilterBtn('All', true, () => {
      activeCountries = new Set(countries);
      document.querySelectorAll('#country-filters .filter-btn').forEach(b => b.classList.add('active'));
      applyFilters();
    });
    countryDiv.appendChild(allBtn);

    countries.forEach(country => {
      const count = STATS.by_country[country] || 0;
      const btn = createFilterBtn(`${country} (${count})`, true, (e) => {
        const target = e.currentTarget;
        if (target.classList.contains('active')) {
          activeCountries.delete(country);
          target.classList.remove('active');
        } else {
          activeCountries.add(country);
          target.classList.add('active');
        }
        // Update All button
        const allButton = countryDiv.querySelector('.filter-btn');
        if (activeCountries.size === countries.length) {
          allButton.classList.add('active');
        } else {
          allButton.classList.remove('active');
        }
        applyFilters();
      });
      countryDiv.appendChild(btn);
    });

    // Tier filters
    const tierDiv = document.getElementById('tier-filters');
    ['all', '1', '2', '3'].forEach(tier => {
      const label = tier === 'all' ? 'All' : `Tier ${tier}`;
      const btn = createFilterBtn(label, tier === 'all', () => {
        activeTier = tier;
        tierDiv.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        event.currentTarget.classList.add('active');
        applyFilters();
      });
      tierDiv.appendChild(btn);
    });

    // Search
    document.getElementById('search-input').addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase();
      applyFilters();
    });
  }

  function createFilterBtn(label, active, onClick) {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (active ? ' active' : '');
    btn.textContent = label;
    btn.addEventListener('click', onClick);
    return btn;
  }

  // --- Filter logic ---
  function getFilteredClinics() {
    return CLINICS.filter(c => {
      if (!activeCountries.has(c.country)) return false;
      if (activeTier !== 'all' && c.tier !== parseInt(activeTier)) return false;
      if (searchTerm && !c.clinic_name.toLowerCase().includes(searchTerm)) return false;
      return true;
    });
  }

  function applyFilters() {
    renderTable();
    renderMapMarkers();
  }

  // --- Render table ---
  function renderTable() {
    const tbody = document.getElementById('clinic-tbody');
    const filtered = getFilteredClinics();

    document.getElementById('result-count').textContent = `Showing ${filtered.length} of ${CLINICS.length} clinics`;

    tbody.innerHTML = filtered.map((c, i) => {
      const tierBadge = `<span class="badge ${TIER_CLASSES[c.tier] || TIER_CLASSES[null]}">${TIER_LABELS[c.tier] || TIER_LABELS[null]}</span>`;
      const services = c.services
        ? `<span class="services-text">${escapeHtml(c.services)}</span>`
        : '<span class="empty-field">&mdash;</span>';
      const shipsOverseas = c.ships_overseas
        ? escapeHtml(c.ships_overseas)
        : '<span class="empty-field">&mdash;</span>';
      const nameCell = c.website
        ? `<a href="https://${c.website}" target="_blank" rel="noopener">${escapeHtml(c.clinic_name)}</a>`
        : escapeHtml(c.clinic_name);

      return `
        <tr class="clinic-row" data-index="${i}" onclick="this.nextElementSibling.classList.toggle('open')">
          <td data-label="Clinic"><span class="clinic-name">${nameCell}</span></td>
          <td data-label="Country">${escapeHtml(c.country)}</td>
          <td data-label="City">${escapeHtml(c.city)}</td>
          <td data-label="Tier">${tierBadge}</td>
          <td data-label="Services">${services}</td>
          <td data-label="Ships Overseas">${shipsOverseas}</td>
        </tr>
        <tr class="expand-row">
          <td colspan="6">
            <div class="expand-detail">
              ${c.email ? `<div><div class="detail-label">Email</div><div class="detail-value"><a href="mailto:${escapeHtml(c.email)}">${escapeHtml(c.email)}</a></div></div>` : ''}
              ${c.phone ? `<div><div class="detail-label">Phone</div><div class="detail-value">${escapeHtml(c.phone)}</div></div>` : ''}
              ${c.notes ? `<div><div class="detail-label">Notes</div><div class="detail-value">${escapeHtml(c.notes)}</div></div>` : ''}
              ${!c.email && !c.phone && !c.notes ? '<div class="detail-value"><span class="empty-field">No additional details available</span></div>' : ''}
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // --- Sort ---
  let sortCol = 'country';
  let sortAsc = true;

  document.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.sort;
      if (sortCol === col) {
        sortAsc = !sortAsc;
      } else {
        sortCol = col;
        sortAsc = true;
      }
      sortClinics();
      renderTable();
    });
  });

  function sortClinics() {
    CLINICS.sort((a, b) => {
      let aVal = a[sortCol];
      let bVal = b[sortCol];

      // Country: sort by priority order
      if (sortCol === 'country') {
        aVal = COUNTRY_ORDER.indexOf(aVal);
        bVal = COUNTRY_ORDER.indexOf(bVal);
        if (aVal === -1) aVal = 99;
        if (bVal === -1) bVal = 99;
      }

      // Tier: nulls last
      if (sortCol === 'tier') {
        if (aVal === null) aVal = 99;
        if (bVal === null) bVal = 99;
      }

      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });
  }

  // --- Render regulatory cards ---
  function renderRegulatory() {
    const priorityGrid = document.getElementById('reg-grid-priority');
    const secondaryGrid = document.getElementById('secondary-content');

    REGULATORY.forEach(r => {
      const card = createRegCard(r);
      if (r.priority <= 3) {
        priorityGrid.appendChild(card);
      } else {
        secondaryGrid.appendChild(card);
      }
    });
  }

  function createRegCard(r) {
    const card = document.createElement('div');
    card.className = 'reg-card';

    const pgtItems = Object.entries(r.pgt_status).map(([key, val]) => {
      const label = key.replace('_', '-').toUpperCase().replace('SEX-SELECTION', 'Sex sel.');
      const badgeClass = 'badge-' + val.status.replace(/_/g, '-').replace('not-approved', 'not-approved');
      return `<div class="pgt-item"><span class="label">${label}</span> <span class="badge ${badgeClass}">${val.label}</span></div>`;
    }).join('');

    const shippingStatus = r.cross_border_shipping.status;
    const shippingColor = shippingStatus === 'yes' ? '#10B981' : shippingStatus === 'unclear' ? '#F59E0B' : '#94A3B8';

    const costRange = r.ivf_cost_usd
      ? `$${r.ivf_cost_usd.min.toLocaleString()}–$${r.ivf_cost_usd.max.toLocaleString()}`
      : 'No data';

    card.innerHTML = `
      <div class="reg-card-header">
        <span class="flag">${r.flag}</span>
        <div>
          <h3>${r.country}</h3>
          <div class="regulator">${escapeHtml(r.regulator)}</div>
        </div>
      </div>
      <div class="pgt-grid">${pgtItems}</div>
      <div class="reg-shipping">
        <strong style="color:${shippingColor}">Cross-border biopsy shipping: ${shippingStatus}</strong><br>
        ${escapeHtml(r.cross_border_shipping.summary)}
      </div>
      <div class="reg-stats">
        <div>IVF cost/cycle: <span class="stat-value">${costRange}</span></div>
        <div>Clinics: <span class="stat-value">${r.clinic_count}</span></div>
        <div>Tier 1: <span class="stat-value">${r.tier1_count}</span></div>
      </div>
      ${r.key_insight ? `<div class="reg-insight">${escapeHtml(r.key_insight)}</div>` : ''}
      ${r.sources && r.sources.length > 0 ? `
        <div class="reg-sources">
          <div class="reg-sources-toggle" onclick="this.parentElement.classList.toggle('open')">
            Sources (${r.sources.length})
          </div>
          <ul class="reg-sources-list">
            ${r.sources.map(s => `<li><a href="${escapeHtml(s.url)}" target="_blank" rel="noopener">${escapeHtml(s.title)}</a></li>`).join('')}
          </ul>
        </div>
      ` : ''}
    `;
    return card;
  }

  // --- Render completeness ---
  function renderCompleteness() {
    const list = document.getElementById('completeness-list');
    if (!STATS.data_completeness) return;
    const dc = STATS.data_completeness;
    const total = CLINICS.length;
    list.innerHTML = `
      <li><strong>Email:</strong> ${dc.has_email}/${total} clinics (${Math.round(dc.has_email/total*100)}%)</li>
      <li><strong>Phone:</strong> ${dc.has_phone}/${total} clinics (${Math.round(dc.has_phone/total*100)}%)</li>
      <li><strong>Services:</strong> ${dc.has_services}/${total} clinics (${Math.round(dc.has_services/total*100)}%)</li>
      <li><strong>Tiered:</strong> ${dc.has_tier}/${total} clinics (${Math.round(dc.has_tier/total*100)}%)</li>
    `;
  }

  // --- Workflow accordion ---
  function initWorkflowAccordion() {
    document.querySelectorAll('.wf-header').forEach(header => {
      header.addEventListener('click', () => {
        const step = header.closest('.wf-step');
        step.classList.toggle('open');
      });
    });
    // Open first step by default
    const first = document.querySelector('.wf-step');
    if (first) first.classList.add('open');
  }

  // --- Nav scroll effect ---
  window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 10);
  });

  // --- Copy API URL ---
  window.copyApiUrl = function (path) {
    const base = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/');
    const url = base + path;
    navigator.clipboard.writeText(url).then(() => {
      const btn = event.currentTarget;
      const orig = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = orig; }, 2000);
    });
  };

  // --- Utility ---
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // --- Init ---
  async function init() {
    const ok = await loadData();
    if (!ok) return;

    sortClinics();
    renderMetrics();
    renderFilters();
    initMap();
    renderTable();
    renderRegulatory();
    renderCompleteness();
    initWorkflowAccordion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
