// src/app/layout.tsx
import { Metal_Mania, Courier_Prime } from 'next/font/google';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
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

// Root Layout (every page has a nav bar, footer)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* We add the font variables here so they are available throughout the app */}
      <body className={`${metalMania.variable} ${courierPrime.variable} flex flex-col min-h-screen`}>
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