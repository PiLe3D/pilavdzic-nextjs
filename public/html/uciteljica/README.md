# 🎮 Učiteljica u Panici!

Mobilna 2D browser igrica - održavaj red u razredu!

## 📦 Kako pokrenuti

1. **Raspakuj ZIP arhivu**
2. **Otvori `index.html` u browseru**
   - Preporučeno: Chrome, Firefox, Safari
   - Najbolje iskustvo: mobilni uređaj ili desktop browser u mobile view (F12 → Device Toolbar)

## 🎯 Kako igrati

### Cilj
Održavaj disciplinu u razredu dok ti učenici prave nestašluke. Ako disciplina padne na 0 - Game Over!

### Kontrole
- **Tapni učenika** → Otvara se radijalni meni sa 3 akcije:
  - ⚠️ **Upozori** (8⚡) - brzo, jeftino, kratko smiri
  - 💬 **Smiri** (15⚡) - efikasnije, duže traje
  - ⭐ **Zabavi** (22⚡) - mini-igra, najjači efekat

- **HUD Dugmad:**
  - ☕ **Čaj pauza** - vraća 30 energije (cooldown 20s)
  - 👔 **Pozovi direktora** - gasi sve nestašluke (cooldown 30s)

### Učenici
Svaki učenik ima svoj tip:
- 🤔 **Radoznala** - često prave sitne probleme
- 🎨 **Umjetnik** - rijetko, ali tvrdoglavi
- 😜 **Zafrkant** - česti nestašlučina
- ⚽ **Sportista** - vole mini-igre

### State-ovi
- 😊 **Mirno** - sve OK
- ⚠️ **Upozorenje** - imaš 3s da reaguješ!
- 💥 **Aktivan nestašluk** - gubi se disciplina
- 💚 **Umiren** - siguran period bez problema

### Mini-igra: Brzi račun
Kada izabereš "Zabavi", dobijaš 3 sekunde da riješiš jednostavan zadatak (npr. 7+5=?). 
- Tačan odgovor = +18 discipline
- Pogrešan = +9 discipline (i dalje korisno!)

### Nivoi
1. **Matematika** (90s) - 8 učenika, uvod
2. **Likovno** (90s) - 10 učenika, više umjetnika
3. **Informatika** (90s) - 10 učenika, hakerski događaji

### Medalje
- 🥇 **Zlato** - Disciplina ≥70, Skor ≥800
- 🥈 **Srebro** - Disciplina ≥50, Skor ≥500
- 🥉 **Bronza** - Disciplina ≥30, Skor ≥300

## 🛠️ Tehnički detalji

### Stack
- HTML5 Canvas
- Vanilla JavaScript (ES6 modules)
- Web Audio API (proceduralni zvukovi)
- Touch & Mouse support

### Struktura projekta
```
uciteljica-u-panici/
├── index.html              # Entry point
└── src/
    ├── game.js            # Game engine & loop
    ├── scenes.js          # Menu, Play, Results, GameOver
    ├── entities.js        # Učenik class sa AI
    ├── ui.js              # HUD, radijalni meni, mini-igra
    ├── input.js           # Touch/mouse handling
    ├── audio.js           # Sound manager
    ├── config.js          # Balans konstante
    └── data/
        ├── students.js    # 10 učenika sa osobinama
        └── levels.js      # 3 nivoa
```

### Performanse
- Target: 60 FPS na modernim mobitelima
- Fallback: 30 FPS
- Canvas: 360×640 (portrait), responsive scaling

### Balansiranje

Može se lako prilagoditi u `src/config.js`:

```javascript
ACTIONS: {
    upozori: { cost: 8, gain: 6, calmTime: 4 },
    smiri: { cost: 15, gain: 12, calmTime: 8 },
    zabavi: { cost: 22, gain: 18, calmTime: 10 }
}
```

Osobine učenika u `src/data/students.js`:
```javascript
{
    nestasluk_baza: 0.22,    // Šansa za nestašluk
    nestasluk_var: 0.08,     // Varijacija
    otpornost: 0.2           // Otpor akcijama
}
```

## 🎨 Customizacija

### Dodaj nove učenike
U `src/data/students.js` dodaj novi objekat:
```javascript
{
    id: "novi_ucenik",
    ime: "Ime",
    tip: "zafrkant", // ili: radoznala, umjetnik, sportista
    nestasluk_baza: 0.25,
    nestasluk_var: 0.1,
    otpornost: 0.18,
    sklonosti: ["avioncic", "sapuce"],
    boja: "#FF6B9D"
}
```

### Dodaj nove nivoe
U `src/data/levels.js`:
```javascript
{
    id: 4,
    naziv: "Fizičko",
    trajanje: 90,
    broj_ucenika: 12,
    eventi: [],
    opis: "Sportski haos!"
}
```

### Promijeni boje
U `src/config.js` → `COLORS` objekt

## 📱 Browser kompatibilnost

✅ **Testirano:**
- Chrome/Android 90+
- Safari/iOS 14+
- Firefox 88+
- Edge 90+

⚠️ **Napomena:** Potreban moderan browser sa:
- ES6 modules support
- Canvas API
- Web Audio API
- Touch events

## 🐛 Debugging

Omogući FPS counter u `src/game.js` (linija ~69):
```javascript
if (true) { // Promijeni false u true
    // FPS display
}
```

## 📄 Licenca

Ovo je prototipu projekat kreiran za edukativne svrhe. 
Slobodno ga koristi, modifikuj i unaprijedi! 🚀

## 🎯 Ideje za proširenje

- [ ] Više mini-igara (memory, quick tap, pattern match)
- [ ] Power-up sistem (kafa, alarm, pomoćnik)
- [ ] Leaderboard (localStorage)
- [ ] Zvučni efekti (učitaj MP3/OGG)
- [ ] Animirane sprite-ove
- [ ] Posebni eventi po nivou (požarni alarm, poplava flomastera)
- [ ] Večer roditelja (boss level)
- [ ] Multiplayer (WebRTC)

---

**Napravljeno sa ❤️ za sve hrabre učiteljice!**
