import { Geist, Geist_Mono, Archivo } from "next/font/google";
import "./globals.css";


const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata = {
  title: "Article Finder",
  description: "List of acticles",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
