"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'expeditions', href: '/expeditions' },
    { name: 'about us', href: '/about' },
    { name: 'faq', href: '/faq' },
    { name: 'blogs', href: '/blogs' },
  ];

  return (
    <nav className="absolute w-full top-0 z-50 py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-baseline">
          
          {/* Brand - ARGO ADVENTURE - Metal Mania Font */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-4xl uppercase font-metal"
              style={{ fontFamily: 'var(--font-metal-mania)', color: '#ffffff' }}
            >
              Argo Adventure
            </Link>
          </div>

          {/* NAV BAR - Courier Prime Font */}
          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-lg lowercase border-b border-transparent hover:border-gray-300 transition-colors"
                style={{ fontFamily: 'var(--font-courier-prime)', color: '#ffffff' }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle (remains black) */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-[#ffffff]">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Matches Courier Prime style) */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md absolute w-full left-0 py-6 px-8 border-b border-black">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="block py-3 text-xl lowercase border-b border-gray-100 last:border-0"
              style={{ fontFamily: 'var(--font-courier-prime)', color: '#000000' }}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}