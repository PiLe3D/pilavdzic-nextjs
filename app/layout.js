import './globals.css';

export const metadata = {
  title: 'Pilavdžić - Dobrodošli',
  description: 'Zabavne igrice i projekti',
  keywords: ['igrice', 'games', 'pilavdzic'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="bs">
      <body>{children}</body>
    </html>
  );
}
