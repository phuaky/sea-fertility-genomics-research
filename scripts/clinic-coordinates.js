// Clinic coordinates — hardcoded from address research
// Used by build-json.js to assign real lat/lng per clinic
const CLINIC_COORDS = {
  // === VIETNAM — HANOI ===
  'Tam Anh General Hospital IVF Centre (IVFTA)': { lat: 21.0069, lng: 105.8726 },
  // 108 Hoang Nhu Tiep, Long Bien — north bank of Red River
  'Andrology & Fertility Hospital of Hanoi': { lat: 21.0135, lng: 105.8468 },
  // 431 Tam Trinh, Hoang Mai
  'Hong Ngoc IVF Fertility Center': { lat: 21.0408, lng: 105.8374 },
  // 55 Yen Ninh, Ba Dinh — near West Lake south shore
  'Vinmec Times City IVF Center': { lat: 20.9950, lng: 105.8685 },
  // Vinmec Times City, 458 Minh Khai, Hai Ba Trung
  'Vietnam National Hospital of OB-GYN (VNHOG)': { lat: 21.0247, lng: 105.8477 },
  // 43 Trang Thi, Hoan Kiem — central Hanoi
  'Dong Do IVF Center': { lat: 21.0143, lng: 105.8316 },
  // 5 Xa Dan, Dong Da
  'Duc Phuc Hospital': { lat: 21.0108, lng: 105.8198 },
  // 121 O Dong Lam (Pho O Cho Dua area), Dong Da
  'Phuong Dong General Hospital IVF': { lat: 20.9825, lng: 105.7897 },
  // 9 Pham Hung, Nam Tu Liem — west Hanoi
  'Superior A.R.T. Hanoi': { lat: 21.0125, lng: 105.8283 },
  // Hanoi consultation office — approximate Dong Da area
  'Hanoi Obstetrics & Gynecology Hospital': { lat: 21.0319, lng: 105.8504 },
  // 929 La Thanh, Ba Dinh — major maternity hospital
  'Hanoi Medical University Hospital IVF Center': { lat: 21.0022, lng: 105.8310 },
  // 1 Ton That Tung, Dong Da
  'Bach Mai Hospital IVF Support Unit': { lat: 21.0000, lng: 105.8425 },
  // 78 Giai Phong, Dong Da — one of Hanoi's largest hospitals
  'Vietnam Belgium Hospital': { lat: 21.0035, lng: 105.8673 },
  // 97-99 Thanh Nhan, Hai Ba Trung
  'Thien An Obstetrics Hospital': { lat: 21.0175, lng: 105.8115 },
  // Cau Giay district area
  'Hanoi Post Hospital IVF Center': { lat: 20.9780, lng: 105.8550 },
  // 49 Tran Dien, Hoang Mai — south Hanoi
  'Hoe Nhai General Hospital IVF Unit': { lat: 21.0393, lng: 105.8466 },
  // Hoe Nhai, Ba Dinh — near Old Quarter north

  // === VIETNAM — HO CHI MINH CITY ===
  'Tu Du Hospital IVF Centre': { lat: 10.7783, lng: 106.6914 },
  // 284 Cong Quynh, District 1 — Vietnam's most famous maternity hospital
  'IVFMD (My Duc Hospital)': { lat: 10.7590, lng: 106.6608 },
  // 4 Nui Thanh, Tan Binh — IVFMD main campus
  'Hanh Phuc International Hospital': { lat: 11.0165, lng: 106.6090 },
  // Binh Duong New City — north of HCMC (Thu Dau Mot area)
  'Tam Anh General Hospital HCMC': { lat: 10.8035, lng: 106.7135 },
  // 2B Pho Quang, Tan Binh (HCMC campus, near Tan Son Nhat)
  'Vinmec Central Park OLEA IVF': { lat: 10.7880, lng: 106.7220 },
  // Vinhomes Central Park, 208 Nguyen Huu Canh, Binh Thanh
  'An Sinh Hospital / IVFAS': { lat: 10.7925, lng: 106.6545 },
  // 10 Tran Huy Lieu, Phu Nhuan
  'IVF Van Hanh': { lat: 10.7700, lng: 106.6685 },
  // 781 Le Hong Phong, District 10
  'Saigon International OB-GYN Hospital (SIH)': { lat: 10.7760, lng: 106.6970 },
  // District 1 area
  'IVFMD Gia Dinh (branch)': { lat: 10.8100, lng: 106.6655 },
  // Binh Thanh, satellite of IVFMD
  'Superior A.R.T. Ho Chi Minh City': { lat: 10.7870, lng: 106.6915 },
  // District 3/1 area — Genea joint venture office
  'City International Hospital IVF Center': { lat: 10.8515, lng: 106.6065 },
  // 3 Nguyen Luong Bang, District 7 (Phu My Hung area)
  'Hung Vuong Hospital': { lat: 10.7555, lng: 106.6570 },
  // 128 Hong Bang, District 5 — major public maternity hospital
  'IVF Phuong Chau Saigon': { lat: 10.7670, lng: 106.6830 },
  // District 10 area
  'Mekong OB-GYN Hospital': { lat: 10.7875, lng: 106.6650 },
  // Tan Binh area
  'Saigon IVF Hospital': { lat: 10.7950, lng: 106.6690 },
  // Tan Binh/Phu Nhuan area
  'Saigon Reproductive & Andrology Hospital': { lat: 10.8020, lng: 106.6620 },
  // Tan Binh area

  // === MALAYSIA — KUALA LUMPUR ===
  'Alpha IVF & Women\'s Specialists': { lat: 3.1571, lng: 101.6151 },
  // 3 Jalan Kerinchi, Bangsar South — purpose-built fertility centre
  'Sunfert International Fertility Centre': { lat: 3.1080, lng: 101.6350 },
  // Nexus Bangsar South, 7 Jalan Kerinchi
  'Thomson Fertility Centre (TMC)': { lat: 3.1140, lng: 101.6375 },
  // Tropicana Medical Centre, Kota Damansara — recently rebranded
  'KPJ Damansara Fertility Centre': { lat: 3.1306, lng: 101.6185 },
  // KPJ Damansara Specialist Hospital, SS 20/19
  'Sunway Fertility Centre': { lat: 3.0673, lng: 101.6044 },
  // Sunway Medical Centre, 5 Jalan Lagoon Selatan, Bandar Sunway
  'Evelyn Fertility & Women\'s Specialist': { lat: 3.1150, lng: 101.6270 },
  // Petaling Jaya, two locations
  'Avisena Women\'s & Children\'s Hospital': { lat: 3.0884, lng: 101.5490 },
  // Shah Alam, Seksyen 16
  'Columbia Asia Hospital': { lat: 3.1030, lng: 101.6415 },
  // Columbia Asia Hospital Petaling Jaya, Jalan 13/6
  'KL Fertility Centre': { lat: 3.1556, lng: 101.7112 },
  // Jalan Ampang, KLCC area
  'Metro IVF': { lat: 3.1075, lng: 101.6335 },
  // Multiple branches — main at PJ area
  'Alhaya Fertility Centre': { lat: 3.1088, lng: 101.6350 },
  // Part of Alpha IVF Group, PJ area
  'Sophea Fertility Centre': { lat: 3.1095, lng: 101.6340 },
  // PJ area
  'Ever-Link Fertility Centre': { lat: 3.0740, lng: 101.5175 },
  // Shah Alam, associated with GenPrime
  'Pantai Hospital KL': { lat: 3.1105, lng: 101.6660 },
  // 8 Jalan Bukit Pantai, Bangsar
  'Prince Court Medical Centre': { lat: 3.1595, lng: 101.7170 },
  // 39 Jalan Kia Peng, KL city centre near KLCC
  'Gleneagles Hospital KL': { lat: 3.1570, lng: 101.7350 },
  // 282 & 286 Jalan Ampang
  'Global Doctors Hospital (Dr Hu Shan)': { lat: 3.1725, lng: 101.6540 },
  // Global Doctors, Mont Kiara
  'UMMC Fertility Unit': { lat: 3.1133, lng: 101.6555 },
  // University Malaya Medical Centre, Lembah Pantai
  'GGA Malaysia (genetics lab)': { lat: 3.1550, lng: 101.7130 },
  // Genetics lab, Jalan Ampang area

  // === MALAYSIA — JOHOR BAHRU ===
  'Monash IVF KPJ Johor': { lat: 1.5285, lng: 103.7554 },
  // KPJ Johor Specialist Hospital, 39B Jalan Abdul Samad
  'TMC Fertility JB': { lat: 1.4725, lng: 103.7625 },
  // Thomson Iskandar, Jalan Mutiara Emas
  'Victory IVF Fertility Centre': { lat: 1.4625, lng: 103.7620 },
  // Menara Landmark, 12 Jalan Ngee Heng — central JB
  'IVF Bridge Fertility Centre': { lat: 1.4780, lng: 103.7365 },
  // Mid Valley Southkey, Jalan Batu Pahat
  'Kensington Hospital Johor': { lat: 1.4375, lng: 103.6395 },
  // Iskandar Puteri (Nusajaya)
  'GS IVF Centre @ Medini (Sincere Healthcare)': { lat: 1.4225, lng: 103.6340 },
  // Gleneagles Medini, Iskandar Puteri
  'Regency Specialist Hospital': { lat: 1.5105, lng: 103.8880 },
  // Masai, Pasir Gudang area — east of central JB
  'SR Women & Children Specialist Clinic': { lat: 1.4830, lng: 103.7558 },
  // Gleneagles Hospital Johor, Jalan Medini Utara

  // === MALAYSIA — PENANG ===
  'Lam Wah Ee Hospital Fertility': { lat: 5.3870, lng: 100.2915 },
  // 141 Jalan Tan Sri Teh Ewe Lim, Jelutong
  'Island Hospital Fertility': { lat: 5.3960, lng: 100.3090 },
  // 308 Jalan Macalister, Georgetown

  // === SINGAPORE ===
  'KK Women\'s & Children\'s Hospital (KKIVF)': { lat: 1.3104, lng: 103.8467 },
  // 100 Bukit Timah Road
  'SGH Centre for Assisted Reproduction (CARE)': { lat: 1.2791, lng: 103.8358 },
  // Singapore General Hospital, Outram Road
  'NUH Clinic for Human Reproduction (CHR)': { lat: 1.2935, lng: 103.7832 },
  // National University Hospital, 5 Lower Kent Ridge Road
  'Alpha International Women\'s Specialists': { lat: 1.3066, lng: 103.8355 },
  // 3 Mount Elizabeth, #14-08 — Mt Elizabeth Medical Centre
  'Thomson Fertility Centre': { lat: 1.3207, lng: 103.8419 },
  // 339 Thomson Road — Thomson Medical Centre
  'Monash IVF Singapore': { lat: 1.3066, lng: 103.8355 },
  // 3 Mount Elizabeth, Mt Elizabeth Medical Centre
  'Virtus Fertility Centre Singapore': { lat: 1.3066, lng: 103.8355 },
  // 3 Mount Elizabeth, #15-04
  'Mount Elizabeth Fertility Centre': { lat: 1.3066, lng: 103.8355 },
  // 3 Mount Elizabeth — Parkway
  'Health & Fertility Centre for Women': { lat: 1.3040, lng: 103.8330 },
  // 290 Orchard Road, #18-01 Paragon
  'Majella Women\'s Specialist': { lat: 1.3206, lng: 103.8432 },
  // 101 Irrawaddy Road — Royal Square at Novena
  'O&G Partners Fertility Centre': { lat: 1.3073, lng: 103.8232 },
  // 6A Napier Road — Gleneagles Hospital
  'Sincere IVF Center': { lat: 1.3073, lng: 103.8232 },
  // 6A Napier Road — Gleneagles Hospital
  'CARE IVF (Foundation Women\'s Centre)': { lat: 1.3073, lng: 103.8232 },
  // 6A Napier Road — Gleneagles Hospital
  'Raffles Fertility Centre': { lat: 1.3113, lng: 103.8561 },
  // 585 North Bridge Road — Raffles Hospital
  'Aspire Centre for Women & Fertility': { lat: 1.3066, lng: 103.8355 },
  // 3 Mount Elizabeth
  'Seed of Life Fertility & Women\'s Care': { lat: 1.3066, lng: 103.8355 },
  // 3 Mount Elizabeth #12-05
  'STO+G Laparoscopy & Fertility Practice': { lat: 1.3040, lng: 103.8330 },
  // 290 Orchard Road, Paragon
  'Wendy Women\'s Clinic': { lat: 1.3201, lng: 103.8435 },
  // 38 Irrawaddy Road #05-34 — Mount Elizabeth Novena
  'GynaeMD Women\'s & Rejuvenation Clinic': { lat: 1.3055, lng: 103.8270 },
  // 1 Orchard Boulevard, Camden Medical Centre
  'The O&G Specialist Clinic': { lat: 1.3066, lng: 103.8355 },
  // 3 Mount Elizabeth
  'Noel Leong Fertility & IVF Clinic': { lat: 1.3138, lng: 103.8555 },
  // 1 Farrer Park Station Road — Connexion, Farrer Park Hospital
  'Women Fertility & Fetal Centre': { lat: 1.3066, lng: 103.8355 },
  // 3 Mount Elizabeth
  'Motoko Clinic For Women': { lat: 1.3066, lng: 103.8355 },
  // 3 Mount Elizabeth
  'Astra Centre for Women & Fertility': { lat: 1.3201, lng: 103.8435 },
  // Mt Elizabeth Novena, 38 Irrawaddy Road
  'Daniel Koh Clinic For Women and Fertility': { lat: 1.3201, lng: 103.8435 },
  // Mt Elizabeth Novena

  // === INDONESIA — JAKARTA ===
  'Morula IVF': { lat: -6.1880, lng: 106.8290 },
  // RSAB Harapan Kita / Bunda area — Menteng, Central Jakarta (main location)
  'RSAB Harapan Kita': { lat: -6.1870, lng: 106.8210 },
  // Jalan Letjend S. Parman Kav 87, Slipi
  'BIC (Bocah Indonesia Centre)': { lat: -6.2240, lng: 106.8095 },
  // Jalan Teuku Cik Ditiro, Menteng area
  'Siloam Hospitals Fertility Clinic': { lat: -6.2260, lng: 106.7990 },
  // Siloam Hospitals Semanggi, Jalan Jend. Sudirman
  'Bundamedik IVF Centre': { lat: -6.2050, lng: 106.8425 },
  // RS Bunda Menteng, Jalan Teuku Cik Ditiro 28
  'RSIA Bunda Jakarta': { lat: -6.2050, lng: 106.8425 },
  // Jalan Teuku Cik Ditiro 28, Menteng
  'RS Pondok Indah IVF': { lat: -6.2640, lng: 106.7840 },
  // Jalan Metro Duta, Pondok Indah — south Jakarta

  // === THAILAND — BANGKOK ===
  'Jetanin Institute': { lat: 13.7438, lng: 100.5494 },
  // 5 Soi Chidlom, Ploenchit Road — Lumpini, Pathumwan
  'Superior A.R.T.': { lat: 13.8020, lng: 100.5625 },
  // A-One Bangkok Tower, Lat Phrao area (Phaholyothin Rd)
  'SAFE Fertility Group': { lat: 13.7380, lng: 100.5565 },
  // Bangkok — Silom/Sathorn area
  'Bumrungrad Hospital Fertility Centre': { lat: 13.7405, lng: 100.5513 },
  // 33 Soi Sukhumvit 3, Wattana — Bumrungrad International
  'Bangkok Hospital Fertility Centre': { lat: 13.7675, lng: 100.5580 },
  // 2 Soi Soonvijai 7, New Petchburi Road
  'IVF & Women Clinic (IWC)': { lat: 13.7375, lng: 100.5475 },
  // Sukhumvit/Nana area
  'Genea Thailand / First Fertility': { lat: 13.7450, lng: 100.5310 },
  // Ratchadamri Road area — central Bangkok
  'Phyathai Sriracha IVF': { lat: 13.1665, lng: 100.9275 },
  // Sriracha, Chonburi — actually east of Bangkok, not in Bangkok proper

  // === BRUNEI ===
  'RIPAS Hospital Fertility Unit': { lat: 4.9340, lng: 114.9460 },
  // Raja Isteri Pengiran Anak Saleha Hospital, Bandar Seri Begawan
};

module.exports = CLINIC_COORDS;
