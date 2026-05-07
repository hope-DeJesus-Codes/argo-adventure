// src/app/layout.tsx
import { Inknut_Antiqua, Zen_Antique, Goudy_Bookletter_1911 } from 'next/font/google';import Footer from '@/src/components/Footer';
import Navbar from '@/src/components/Navbar';
import './globals.css';

// Font configuration
const inknut = Inknut_Antiqua({ 
  subsets: ['latin'], 
  weight: ['400', '700'], 
  variable: '--font-inknut' 
});

const zen = Zen_Antique({ 
  subsets: ['latin'], 
  weight: ['400'], 
  variable: '--font-zen' 
});

const goudy = Goudy_Bookletter_1911({ 
  subsets: ['latin'], 
  weight: ['400'], 
  variable: '--font-goudy' 
});

// Root Layout (every page has a nav bar, footer)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inknut.variable} ${zen.variable} ${goudy.variable} flex flex-col min-h-screen`}>
        <Navbar />        
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}