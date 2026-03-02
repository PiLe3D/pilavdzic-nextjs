// ============================================================
// ASTER PLESNI KLUB — Podaci iz Google Sheets-a
// Ažurirano: Mart 2026
// ============================================================

// ===== ČLANICE =====
export const members = [
  // Djeca 1 (Trenerica: Lamija Svraka)
  { id: 1, name: "Nađa", fullName: "Nađa Purgić", category: "Juniori 1", level: "D3", group: "Djeca 3", trainingGroup: "Djeca 1" },
  { id: 2, name: "Amna", fullName: "Amna Kaljić", category: "Juniori 1", level: "D3", group: "Djeca 3", trainingGroup: "Djeca 1" },
  { id: 3, name: "Neđla", fullName: "Neđla", category: null, level: null, group: null, trainingGroup: "Djeca 1" },
  { id: 4, name: "Naida", fullName: "Naida", category: null, level: null, group: null, trainingGroup: "Djeca 1" },

  // Djeca 2 (Trenerica: Andrea Brekalo + Lamija Svraka)
  { id: 10, name: "Eva", fullName: "Eva Anđelić", category: "Pioniri 1", level: null, group: "Grupa Pioniri 1", trainingGroup: "Djeca 2" },
  { id: 11, name: "Zana", fullName: "Zana Alić", category: "Pioniri 1", level: null, group: "Grupa Pioniri 1", trainingGroup: "Djeca 2" },
  { id: 12, name: "Nika", fullName: "Nika Bilić", category: "Pioniri 1", level: null, group: "Grupa Pioniri 1", trainingGroup: "Djeca 2" },
  { id: 13, name: "Hana M.", fullName: "Hana Močević", category: "Pioniri 1", level: null, group: "Grupa Pioniri 1", trainingGroup: "Djeca 2" },
  { id: 14, name: "Merjem B.", fullName: "Merjem Beganović", category: "Pioniri 1", level: null, group: "Grupa Pioniri 1", trainingGroup: "Djeca 2" },
  { id: 15, name: "Hana K.", fullName: "Hana Kičević", category: "Pioniri 1", level: null, group: "Grupa Pioniri 1", trainingGroup: "Djeca 2" },
  { id: 16, name: "Una", fullName: "Una Hadžiefendić", category: "Pioniri 1", level: null, group: "Grupa Pioniri 1", trainingGroup: "Djeca 2" },
  { id: 17, name: "Farah", fullName: "Farah Ćurovac", category: "Pioniri 1", level: null, group: "Grupa Pioniri 1", trainingGroup: "Djeca 2" },
  { id: 18, name: "Hana Č.", fullName: "Hana Čengić", category: "Pioniri 1", level: null, group: "Grupa Pioniri 1", trainingGroup: "Djeca 2" },
  { id: 19, name: "Nadin U.", fullName: "Nadin Uštović", category: "Pioniri 1", level: "D1", group: "Grupa Pioniri 1", trainingGroup: "Djeca 2" },
  { id: 20, name: "Ena", fullName: "Ena", category: "Pioniri 1", level: null, group: null, trainingGroup: "Djeca 2" },
  { id: 21, name: "Uma", fullName: "Uma Gološ", category: "Youth", level: null, group: null, trainingGroup: "Djeca 2" },
  { id: 22, name: "Iman", fullName: "Iman Tahirović", category: "Juniori 1", level: "C", group: "Djeca 3", trainingGroup: "Djeca 2" },
  { id: 23, name: "Mia", fullName: "Mia Zukaj", category: "Pioniri 1", level: null, group: "Grupa Pioniri 1", trainingGroup: "Djeca 2" },
  { id: 24, name: "Sajra", fullName: "Sajra Gušo", category: "Pioniri 1", level: null, group: "Grupa Pioniri 1", trainingGroup: "Djeca 2" },
  { id: 25, name: "Nadin Z.", fullName: "Nadin Zukić", category: "Pioniri 1", level: null, group: "Grupa Pioniri 1", trainingGroup: "Djeca 2" },
  { id: 26, name: "Elena", fullName: "Elena Tahirović", category: "Pioniri 1", level: null, group: null, trainingGroup: "Djeca 2" },
  { id: 27, name: "Anabela", fullName: "Anabela Tahirović", category: "Pioniri 1", level: null, group: null, trainingGroup: "Djeca 2" },
  { id: 28, name: "Nina", fullName: "Nina Čečo", category: "Pioniri 1", level: null, group: "Grupa Pioniri 1", trainingGroup: "Djeca 2" },

  // Djeca 3 (Trenerica: Andrea Brekalo + Esma Ahmić)
  { id: 30, name: "Merjem S.", fullName: "Merjem Slamnik", category: "Juniori 1", level: "C", group: "Grupa Junior 1", trainingGroup: "Djeca 3" },
  { id: 31, name: "Nora", fullName: "Nora Arsić", category: "Pioniri 2", level: "D3", group: "Djeca 3", trainingGroup: "Djeca 3" },
  { id: 32, name: "Nađa P.", fullName: "Nađa Purgić", category: "Juniori 1", level: "D3", group: "Grupa Junior 1", trainingGroup: "Djeca 3" },
  { id: 33, name: "Asja D.", fullName: "Asja Delija", category: "Pioniri 2", level: null, group: "Grupa Pioniri 2", trainingGroup: "Djeca 3" },
  { id: 34, name: "Hana H.", fullName: "Hana Hasanbegović", category: "Pioniri 2", level: null, group: null, trainingGroup: "Djeca 3" },
  { id: 35, name: "Amna K.", fullName: "Amna Kaljić", category: "Juniori 1", level: "D3", group: "Grupa Junior 1", trainingGroup: "Djeca 3" },
  { id: 36, name: "Suana", fullName: "Suana Majstorić", category: "Juniori 1", level: "C", group: "Grupa Junior 1", trainingGroup: "Djeca 3" },
  { id: 37, name: "Dalia", fullName: "Dalia Ćelam", category: "Juniori 1", level: "D3", group: "Grupa Junior 1", trainingGroup: "Djeca 3" },
  { id: 38, name: "Iman T.", fullName: "Iman Tahirović", category: "Juniori 1", level: "C", group: "Grupa Junior 1", trainingGroup: "Djeca 3" },
  { id: 39, name: "Nasiha", fullName: "Nasiha Pilavdžić", category: "Pioniri 2", level: "D1", group: "Grupa Pioniri 2", trainingGroup: "Djeca 3" },
  { id: 40, name: "Džana H.", fullName: "Džana Hadžiefendić", category: "Pioniri 2", level: null, group: "Grupa Pioniri 2", trainingGroup: "Djeca 3" },
  { id: 41, name: "Merjem H.", fullName: "Merjem Harbinja", category: "Pioniri 2", level: "D1", group: "Grupa Pioniri 2", trainingGroup: "Djeca 3" },
  { id: 42, name: "Ida", fullName: "Ida Muminović", category: "Pioniri 2", level: "D1", group: "Grupa Pioniri 2", trainingGroup: "Djeca 3" },
  { id: 43, name: "Irma", fullName: "Irma Purgić", category: "Pioniri 1", level: "D1", group: "Grupa Pioniri 2", trainingGroup: "Djeca 3" },
  { id: 44, name: "Lara", fullName: "Lara Borovina", category: "Pioniri 2", level: null, group: "Grupa Pioniri 2", trainingGroup: "Djeca 3" },
  { id: 45, name: "Dunja", fullName: "Dunja Harbinja", category: "Pioniri 2", level: "D1", group: "Grupa Pioniri 2", trainingGroup: "Djeca 3" },
  { id: 46, name: "Leena", fullName: "Leena Teparić", category: "Pioniri 2", level: null, group: "Grupa Pioniri 2", trainingGroup: "Djeca 3" },
  { id: 47, name: "Dalal", fullName: "Dalal Alić", category: "Pioniri 2", level: "D1", group: "Grupa Pioniri 2", trainingGroup: "Djeca 3" },

  // Djeca 4 (Trenerica: Andrea Brekalo)
  { id: 50, name: "Esma", fullName: "Esma Ahmić", category: "Youth", level: "B", group: "Formacija Youth", trainingGroup: "Djeca 4" },
  { id: 51, name: "Hana S.", fullName: "Hana Silahić", category: "Juniori 2", level: "B", group: "Formacija Youth", trainingGroup: "Djeca 4" },
  { id: 52, name: "Nadin O.", fullName: "Nadin Olovčić", category: "Youth", level: "B", group: "Formacija Youth", trainingGroup: "Djeca 4" },
  { id: 53, name: "Lamija B.", fullName: "Lamija Brka", category: "Youth", level: null, group: "Formacija Youth", trainingGroup: "Djeca 4" },
  { id: 54, name: "Džana Ć.", fullName: "Džana Ćelam", category: "Youth", level: "B", group: "Formacija Youth", trainingGroup: "Djeca 4" },
  { id: 55, name: "Adna", fullName: "Adna Čekan", category: "Youth", level: "B", group: "Formacija Youth", trainingGroup: "Djeca 4" },
  { id: 56, name: "Dania", fullName: "Dania Glušac", category: "Youth", level: "B", group: "Formacija Youth", trainingGroup: "Djeca 4" },
  { id: 57, name: "Šejma", fullName: "Šejma Ferhatović", category: "Youth", level: "D3", group: "Formacija Youth", trainingGroup: "Djeca 4" },
  { id: 58, name: "Hena", fullName: "Hena Jaganjac", category: "Youth", level: "B", group: "Formacija Youth", trainingGroup: "Djeca 4" },
  { id: 59, name: "Gerda", fullName: "Gerda", category: "Youth", level: null, group: "Formacija Youth", trainingGroup: "Djeca 4" },
  { id: 60, name: "Dea", fullName: "Dea", category: "Youth", level: null, group: "Formacija Youth", trainingGroup: "Djeca 4" },
  { id: 61, name: "Amina", fullName: "Amina", category: "Youth", level: null, group: "Formacija Youth", trainingGroup: "Djeca 4" },
  { id: 62, name: "Lajla Nur", fullName: "Lajla Nur Potogija", category: "Juniori 1", level: "D1", group: null, trainingGroup: "Djeca 4" },

  // Djeca 5 (Trenerica: Andrea Brekalo)
  { id: 70, name: "Asja C.", fullName: "Asja C.", category: null, level: null, group: null, trainingGroup: "Djeca 5" },
  { id: 71, name: "Lamija Š.", fullName: "Lamija Š.", category: null, level: null, group: null, trainingGroup: "Djeca 5" },
  { id: 72, name: "Mia D5", fullName: "Mia", category: null, level: null, group: null, trainingGroup: "Djeca 5" },
];

// ===== TRENERI =====
export const trainers = [
  { id: 1, name: "Andrea Brekalo", role: "Glavna trenerica", groups: ["Djeca 2", "Djeca 3", "Djeca 4", "Djeca 5"] },
  { id: 2, name: "Lamija Svraka", role: "Trenerica / Asistent", groups: ["Djeca 1", "Djeca 2"] },
  { id: 3, name: "Esma Ahmić", role: "Asistent", groups: ["Djeca 3"] },
];

// ===== GRUPE TRENINGA =====
export const trainingGroups = [
  { id: "pocetna", name: "Male početnna", level: "Početni", days: ["Pon", "Sri", "Ned"], time: "18:00-19:00", color: "#22c55e", bgColor: "#22c55e15" },
  { id: "srednja", name: "Male srednja", level: "Srednji", days: ["Pon", "Uto", "Sri", "Ned"], time: "19:00-20:00", color: "#3b82f6", bgColor: "#3b82f615" },
  { id: "napredna", name: "Male napredna", level: "Napredni", days: ["Pon", "Uto", "Sri", "Ned"], time: "20:00-21:00", color: "#8b5cf6", bgColor: "#8b5cf615" },
  { id: "velike", name: "Velike napredna", level: "Napredni+", days: ["Pon", "Uto", "Sri", "Ned"], time: "20:30-22:00", color: "#ec4899", bgColor: "#ec489915" },
  { id: "formacija", name: "Formacija", level: "Svi", days: ["Pet", "Sub"], time: "10:00-12:00", color: "#f59e0b", bgColor: "#f59e0b15" },
  { id: "mala", name: "Grupa mala", level: "Mali", days: ["Pet", "Sub"], time: "12:00-13:00", color: "#10b981", bgColor: "#10b98115" },
  { id: "balet", name: "Balet", level: "Svi", days: ["Čet"], time: "19:45-21:00", color: "#06b6d4", bgColor: "#06b6d415" },
];

// ===== SEDMIČNI RASPORED (Mart 2026 — tipična sedmica) =====
export const weeklySchedule = [
  // PONEDJELJAK
  { day: "Pon", time: "18:00", duration: 60, group: "pocetna", type: "group" },
  { day: "Pon", time: "19:00", duration: 60, group: "srednja", type: "group" },
  { day: "Pon", time: "20:00", duration: 60, group: "napredna", type: "group" },
  { day: "Pon", time: "20:30", duration: 90, group: "velike", type: "group" },

  // UTORAK (individualni)
  { day: "Uto", time: "17:00", duration: 60, type: "individual", student: "Merjem S.", dance: null },

  // SRIJEDA
  { day: "Sri", time: "18:00", duration: 60, group: "pocetna", type: "group" },
  { day: "Sri", time: "19:00", duration: 60, group: "srednja", type: "group" },
  { day: "Sri", time: "20:00", duration: 60, group: "napredna", type: "group" },
  { day: "Sri", time: "20:30", duration: 90, group: "velike", type: "group" },

  // ČETVRTAK
  { day: "Čet", time: "17:00", duration: 60, type: "individual", student: "Suana", dance: null },
  { day: "Čet", time: "19:00", duration: 45, type: "individual", student: "Amna", dance: null },
  { day: "Čet", time: "19:45", duration: 75, group: "balet", type: "group" },

  // PETAK
  { day: "Pet", time: "10:00", duration: 120, group: "formacija", type: "group" },
  { day: "Pet", time: "12:00", duration: 60, group: "mala", type: "group" },
  { day: "Pet", time: "12:00", duration: 60, type: "individual", student: "Nasiha", dance: "Esma" },
  { day: "Pet", time: "13:00", duration: 60, type: "individual", student: "Iman", dance: "Cha-cha/Jive" },
  { day: "Pet", time: "13:00", duration: 60, type: "individual", student: "Merjem S.", dance: null },
  { day: "Pet", time: "14:00", duration: 60, type: "individual", student: "Dalia", dance: null },
  { day: "Pet", time: "15:00", duration: 60, type: "individual", student: "Nora", dance: null },

  // SUBOTA
  { day: "Sub", time: "10:00", duration: 120, group: "formacija", type: "group" },
  { day: "Sub", time: "12:00", duration: 60, group: "mala", type: "group" },

  // NEDJELJA
  { day: "Ned", time: "18:00", duration: 60, group: "pocetna", type: "group" },
  { day: "Ned", time: "19:00", duration: 60, group: "srednja", type: "group" },
  { day: "Ned", time: "20:00", duration: 60, group: "napredna", type: "group" },
  { day: "Ned", time: "20:30", duration: 90, group: "velike", type: "group" },
];

// ===== TAKMIČENJA 2026 =====
export const competitions = [
  { id: 1, date: "2026-02-14", city: "Split / Solin", country: "HR", flag: "🇭🇷", type: "Solo, grupa, formacija", org: "WDSF", categories: "D razredi, open kategorije, grupe i formacije", venue: "Gradska sportska dvorana Bilankuša" },
  { id: 2, date: "2026-03-14", endDate: "2026-03-15", city: "Istanbul", country: "TR", flag: "🇹🇷", type: "Solo", org: "WDSF", categories: "WDSF solo", note: "60€ karte" },
  { id: 3, date: "2026-03-26", endDate: "2026-03-29", city: "Sarajevo", country: "BA", flag: "🇧🇦", type: "Grupe, formacije, show", org: "IDO", categories: "D1, B razredi", venue: "Interdance Sarajevo" },
  { id: 4, date: "2026-04-03", endDate: "2026-04-04", city: "Solun", country: "GR", flag: "🇬🇷", type: "Solo, grupa, formacija", org: "WDSF", categories: "Open kategorije solo + EUROPSKO grupa i formacija", note: "Europsko prvenstvo", highlight: true },
  { id: 5, date: "2026-04-11", endDate: "2026-04-12", city: "Plesni kamp Aster", country: "BA", flag: "🇧🇦", type: "Kamp", org: null, categories: "D razredi, open kategorije, grupe i formacije" },
  { id: 6, date: "2026-04-18", endDate: "2026-04-19", city: "Tuzla / Srbija", country: "BA", flag: "🇧🇦", type: "Solo, grupa, formacija", org: "WDSF", categories: "D razredi, open kategorije, grupe i formacije" },
  { id: 7, date: "2026-05-01", city: "Prag", country: "CZ", flag: "🇨🇿", type: "Solo", org: "WDSF", categories: "Europsko Youth", note: "Europsko prvenstvo Youth", highlight: true },
  { id: 8, date: "2026-05-09", city: "Travnik", country: "BA", flag: "🇧🇦", type: "Solo, grupa, formacija", org: "Državno", categories: "Formacija i grupa", venue: "Srednjoškolski centar Travnik", note: "Državno prvenstvo" },
  { id: 9, date: "2026-05-17", city: "Srbija", country: "RS", flag: "🇷🇸", type: "Solo, grupa, formacija", org: "WDSF", categories: "D razredi, open kategorije, grupe i formacije" },
  { id: 10, date: "2026-05-22", endDate: "2026-05-24", city: "Zagreb", country: "HR", flag: "🇭🇷", type: "Solo, grupa, formacija", org: "WDSF", categories: "Open + WDSF + D razredi, grupe i formacije" },
  { id: 11, date: "2026-06-06", city: "Beograd", country: "RS", flag: "🇷🇸", type: "WDSF Open Junior 1, Pioniri", org: "WDSF", categories: "Open kategorije (do 14 godina)" },
  { id: 12, date: "2026-06-13", endDate: "2026-06-14", city: "Banja Luka", country: "BA", flag: "🇧🇦", type: "IDO Državno", org: "IDO", categories: "IDO državno prvenstvo", note: "Upitno" },
  { id: 13, date: "2026-06-20", endDate: "2026-06-21", city: "Graz", country: "AT", flag: "🇦🇹", type: "Grupa, formacija, Junior 2, Youth, Adult", org: "WDSF", categories: "Open kategorije (od 14 godina)" },
  { id: 14, date: "2026-06-28", city: "Bremen", country: "DE", flag: "🇩🇪", type: "Svjetsko Junior 2, solo", org: "WDSF", categories: "Svjetsko Junior 2", note: "Upitno", highlight: true },
  { id: 15, date: "2026-07-05", city: "Wuppertal", country: "DE", flag: "🇩🇪", type: "Solo", org: "WDSF", categories: "WDSF", note: "Možda samo Youth" },
  // Ljetna pauza
  { id: 16, date: "2026-09-27", city: "Prag", country: "CZ", flag: "🇨🇿", type: "WDSF", org: "WDSF", categories: "WDSF" },
  { id: 17, date: "2026-10-03", endDate: "2026-10-04", city: "Zadar", country: "HR", flag: "🇭🇷", type: "Solo, grupa, formacija", org: "WDSF", categories: "D razredi, open kategorije, grupe i formacije" },
  { id: 18, date: "2026-10-10", endDate: "2026-10-11", city: "Zlatibor", country: "RS", flag: "🇷🇸", type: "Solo, grupa, formacija", org: "WDSF", categories: "D razredi, open, WDSF, grupe i formacije" },
  { id: 19, date: "2026-10-18", city: "Varaždin", country: "HR", flag: "🇭🇷", type: "Solo, grupa, formacija", org: "WDSF", categories: "D razredi, open kategorije, grupe i formacije" },
  { id: 20, date: "2026-10-24", endDate: "2026-10-25", city: "Samobor", country: "HR", flag: "🇭🇷", type: "Solo, grupa, formacija", org: "WDSF", categories: "D razredi, open kategorije, grupe i formacije" },
  { id: 21, date: "2026-11-07", endDate: "2026-11-08", city: "Zagreb", country: "HR", flag: "🇭🇷", type: "Solo, grupa, formacija", org: "WDSF", categories: "D razredi, open kategorije, grupe i formacije" },
  { id: 22, date: "2026-11-27", endDate: "2026-11-29", city: "Guadalajara", country: "ES", flag: "🇪🇸", type: "WDSF Svjetsko grupa i formacija", org: "WDSF", categories: "Svjetsko prvenstvo", highlight: true },
  { id: 23, date: "2026-11-27", endDate: "2026-11-30", city: "Sarajevo", country: "BA", flag: "🇧🇦", type: "WDSF", org: "WDSF", categories: "D razredi, open, WDSF, grupe i formacije" },
  { id: 24, date: "2026-12-13", city: "Makarska", country: "HR", flag: "🇭🇷", type: "Solo, grupa, formacija", org: "WDSF", categories: "D razredi, open kategorije, grupe i formacije" },
];

// ===== KATEGORIJE =====
export const categories = [
  { name: "Pioniri 1", ageRange: "do 9 god.", order: 1 },
  { name: "Pioniri 2", ageRange: "10-11 god.", order: 2 },
  { name: "Juniori 1", ageRange: "12-13 god.", order: 3 },
  { name: "Juniori 2", ageRange: "14-15 god.", order: 4 },
  { name: "Youth", ageRange: "16-18 god.", order: 5 },
  { name: "Adult", ageRange: "18+ god.", order: 6 },
];

// ===== KOMPETITIVNI RAZREDI =====
export const competitiveLevels = [
  { code: "D1", name: "D1 - Početni", order: 1 },
  { code: "D3", name: "D3 - Napredni početni", order: 2 },
  { code: "C", name: "C - Srednji", order: 3 },
  { code: "B", name: "B - Napredni", order: 4 },
];

// ===== DANI =====
export const dayNames = ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"];
export const dayNamesFull = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota", "Nedjelja"];
