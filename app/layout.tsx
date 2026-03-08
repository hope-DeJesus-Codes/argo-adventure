// src/app/layout.tsx
import { Metal_Mania, Courier_Prime } from 'next/font/google';
import Navbar from '@/src/components/Navbar';
import './globals.css';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${metalMania.variable} ${courierPrime.variable}`}>
      <body className="antialiased font-courier">
        <Navbar /> 
        {children}
      </body>
    </html>
  );
}