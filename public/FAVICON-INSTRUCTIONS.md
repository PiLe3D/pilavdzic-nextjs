# 🐔 FAVICON INSTALACIJA - KORAK PO KORAK

## 📥 KORAK 1: Download fajlove

Download sve ove fajlove iz outputs foldera:
- favicon.ico
- favicon-16.png
- favicon-32.png
- favicon-192.png
- favicon-512.png
- apple-touch-icon.png
- site.webmanifest

## 📂 KORAK 2: Stavi fajlove u projekat

Kopiraj SVE fajlove u:
```
D:\projekti\pilavdzic-nextjs\public\
```

Rezultat:
```
D:\projekti\pilavdzic-nextjs\
├── public\
│   ├── favicon.ico          ✅
│   ├── favicon-16.png        ✅
│   ├── favicon-32.png        ✅
│   ├── favicon-192.png       ✅
│   ├── favicon-512.png       ✅
│   ├── apple-touch-icon.png  ✅
│   ├── site.webmanifest      ✅
│   └── images\
```

## 💻 KORAK 3: Dodaj u layout.tsx

Otvori: `D:\projekti\pilavdzic-nextjs\app\layout.tsx`

### OPCIJA A: Ako koristiš App Router (Next.js 13+)

Dodaj IZMEĐU <head> tagova (ili u metadata export):

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pilavdžić',
  description: 'Emir Pilavdžić - Personal Gaming & Portfolio Website',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bs">
      <body>{children}</body>
    </html>
  )
}
```

### OPCIJA B: Ručno u <head> (Pages Router ili custom)

U layout.tsx ili _document.tsx dodaj:

```tsx
<head>
  {/* Favicon */}
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/favicon-16.png" sizes="16x16" type="image/png" />
  <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
  
  {/* Apple Touch Icon */}
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  
  {/* Web Manifest */}
  <link rel="manifest" href="/site.webmanifest" />
  
  {/* Theme Color */}
  <meta name="theme-color" content="#FFF9E6" />
</head>
```

## 🚀 KORAK 4: Commit i Push

```powershell
cd D:\projekti\pilavdzic-nextjs

git add public/favicon* public/apple-touch-icon.png public/site.webmanifest
git add app/layout.tsx
git commit -m "Add chicken favicon 🐔"
git push
```

Vercel će automatski deployovati!

## 🧪 KORAK 5: Testiranje

Nakon što Vercel deploya (2-3 min):

1. Otvori: https://pilavdzic.org
2. Pogledaj tab - vidiš pilića! 🐔
3. Dodaj bookmark - vidi pilića!
4. Na mobitelu: Add to Home Screen - vidi ikonu!

## 🔍 PROVJERA:

### Browser:
- Chrome: Dev Tools → Application → Manifest
- Vidi sve ikonice

### Online alat:
https://realfavicongenerator.net/favicon_checker?site=pilavdzic.org

## ⚠️ CACHE PROBLEM?

Ako ne vidiš pilića odmah:

1. **Hard Refresh:**
   - Windows: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Clear Browser Cache:**
   - Chrome: Settings → Privacy → Clear browsing data

3. **Incognito Mode:**
   - Otvori u privatnom prozoru

4. **Čekaj 5-10 min:**
   - Browseri cache-uju favicone dugo!

## 📱 REZULTAT:

✅ Desktop: Pilić u tab-u
✅ Bookmark: Pilić ikonica
✅ Mobile: Pilić na home screen
✅ PWA: Pilić app ikona

---

## 🎨 BONUS: Ako želiš da promijeniš boju

Otvori `site.webmanifest` i mijenjaj:
```json
"theme_color": "#FFF9E6"  ← Tvoja boja (hex)
```

---

Gotovo! 🎉
