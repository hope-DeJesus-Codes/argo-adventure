// src/app/layout.tsx
import { Metal_Mania, Courier_Prime, Cormorant_SC } from 'next/font/google'; 
import Footer from '@/src/components/Footer';
import Navbar from '@/src/components/Navbar';
import './globals.css';

// Font configuration
const metalMania = Metal_Mania({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-metal-mania', 
});

const courierPrime = Courier_Prime({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-courier-prime',
});

const cormorantSC = Cormorant_SC({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant-sc',
});

// Root Layout (every page has a nav bar, footer)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* We add the font variables here so they are available throughout the app */}
      <body className={`${metalMania.variable} ${courierPrime.variable} ${cormorantSC.variable} flex flex-col min-h-screen`}>
        <Navbar />
        
        {/* 'flex-grow' ensures the footer stays at the bottom even on short pages */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}