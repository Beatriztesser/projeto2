// import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "Minha primeira aplicação",
  description: "Aplicação front-end2",
  charset: 'UTF-8',
  author: 'Beatriz Eduarda',
  keywords: 'HTML, CSS, JavaScript, react, Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
