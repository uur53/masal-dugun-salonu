import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { getSession } from "@/lib/session";
import MenuBar from "@/app/components/MenuBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Masal Düğün Salonu",
  description: "Masal Düğün Salonu tanıtım ve randevu takip sistemi",
};

export default async function RootLayout({ children }) {
  const session = await getSession();
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-pink-50 via-white to-purple-50 min-h-screen`}>
        <nav className="w-full flex justify-between items-center p-4 bg-white/80 shadow-md sticky top-0 z-20 backdrop-blur-md">
          <Link href="/" className="text-2xl font-extrabold text-pink-600 tracking-tight drop-shadow-md">Masal Düğün Salonu</Link>
          <MenuBar session={session} />
        </nav>
        {children}
      </body>
    </html>
  );
}
