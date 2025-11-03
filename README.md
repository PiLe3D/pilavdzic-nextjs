# Pilavdžić.org - Next.js verzija

## 🚀 Kako pokrenuti lokalno

```bash
# 1. Instaliraj dependencies
npm install

# 2. Pokreni development server
npm run dev

# 3. Otvori browser na http://localhost:3000
```

## 📦 Deployment na Vercel

```bash
# 1. Push na GitHub
git add .
git commit -m "Next.js site"
git push

# 2. Vercel će automatski deployovati!
```

## 📁 Struktura projekta

```
pilavdzic-nextjs/
├── app/
│   ├── page.js          → Glavna stranica (bila index.html)
│   ├── layout.js        → HTML struktura i SEO
│   └── globals.css      → Globalni stilovi
├── components/
│   └── GameCard.js      → Reusable komponenta za igre
├── public/
│   └── images/          → Slike (pristup sa /images/...)
├── package.json         → Dependencies
├── next.config.js       → Next.js konfiguracija
└── tailwind.config.js   → Tailwind CSS config
```

## ✨ Prednosti ovog Next.js setup-a

### 1. **Automatsko SEO** 📈
- Metadata u `layout.js` automatski postavlja title, description, keywords
- Google vidi kompletan HTML (nije kao React gdje je prazan)

### 2. **Image Optimizacija** 🖼️
- `<Image>` komponenta automatski:
  - Kompresuje slike
  - Pravi različite veličine za različite ekrane
  - Lazy load (učitava samo kad treba)
  - WebP format za manje fajlove

### 3. **Brži Load** ⚡
- Automatski code splitting
- Preload samo što treba
- CSS se automatski optimizuje

### 4. **Bolja organizacija** 📦
- Komponente su odvojene i reusable
- Lakše maintainovanje
- Jedan fajl = jedna funkcionalnost

### 5. **Tailwind CSS** 🎨
- Nema više pisanja CSS-a
- Utility classes direktno u JSX-u
- Automatski purge (briše nekorišteni CSS)

## 🆚 Poređenje sa HTML verzijom

### HTML verzija (šta trenutno imaš):
```html
<!-- index.html -->
<div class="game-card">
  <img src="images/uciteljica.jpg">
  <h2>Učiteljica</h2>
  <p>Opis...</p>
</div>
<!-- Ponavljaš isti kod 3 puta -->
```

### Next.js verzija:
```jsx
// GameCard.js - napravi jednom
<GameCard title="Učiteljica" ... />

// page.js - samo pozovi 3 puta
{games.map(game => <GameCard {...game} />)}
```

## 🎯 Šta učiš kroz ovaj projekat

1. **React komponente** - kako razbiti UI na dijelove
2. **Props** - kako proslediti podatke
3. **Map funkcija** - kako dinamički renderovati listu
4. **Next.js routing** - automatski (file-based)
5. **Image optimizacija** - `<Image>` komponenta
6. **Tailwind** - utility-first CSS
7. **SEO** - metadata i server-side rendering

## 💡 Sledeći koraci (kad naučiš osnove)

1. Dodaj **stranicu za svaku igru**:
   ```
   app/
     uciteljica/
       page.js
   ```

2. Dodaj **API route** za statistiku:
   ```
   app/api/stats/route.js
   ```

3. Dodaj **bazu podataka** (npr. Supabase) za komentare

4. Dodaj **animacije** sa Framer Motion

## 🔗 Korisni linkovi

- [Next.js dokumentacija](https://nextjs.org/docs)
- [Tailwind dokumentacija](https://tailwindcss.com/docs)
- [React dokumentacija](https://react.dev)
