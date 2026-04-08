import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Importujemy komponenty do nawigacji i ikonki
import Link from "next/link";
import { Home, PlusCircle, User } from "lucide-react";

// Konfiguracja fontów
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Informacje o aplikacji (SEO)
export const metadata: Metadata = {
  title: "Moja Książka Kucharska",
  description: "Zapisuj i generuj przepisy z TikToka",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      {/* 1. Tło całej strony i wyśrodkowanie aplikacji */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-muted/10 pb-20 md:pb-0 min-h-screen flex justify-center`}>
        
        {/* 2. Główny kontener Mobile-First (ogranicza szerokość jak na telefonie) */}
        <div className="w-full max-w-md bg-background min-h-screen relative shadow-2xl overflow-x-hidden">
          
          {/* Tu będzie się ładować treść podstron (np. lista przepisów) */}
          <main className="p-4">{children}</main>
          
          {/* 3. DOLNY PASEK NAWIGACJI (Bottom Bar) */}
          <nav className="fixed bottom-0 w-full max-w-md bg-background/80 backdrop-blur-md border-t flex justify-around items-center h-16 px-4 z-50">
            
            {/* Przycisk: Home (Przepisy) */}
            <Link href="/" className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-foreground transition-colors">
              <Home size={24} />
              <span className="text-[10px] mt-1 font-medium">Przepisy</span>
            </Link>
            
            {/* Przycisk: Dodaj (Wielki Plus) */}
            <Link href="/add" className="flex flex-col items-center justify-center w-full h-full relative group">
              <div className="bg-[#4A5D4E] text-white p-3 rounded-full shadow-lg absolute -top-5 transition-transform group-hover:scale-105 group-active:scale-95">
                <PlusCircle size={28} />
              </div>
            </Link>
            
            {/* Przycisk: Profil */}
            <Link href="/profile" className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-foreground transition-colors">
              <User size={24} />
              <span className="text-[10px] mt-1 font-medium">Profil</span>
            </Link>

          </nav>
        </div>
      </body>
    </html>
  );
}