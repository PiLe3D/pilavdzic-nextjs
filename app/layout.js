import './globals.css';

export const metadata = {
  title: 'Pilavdžić',
  description: 'Personal Gaming & Portfolio Website',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bs">
      <head />
      <body>{children}</body>
    </html>
  );
}