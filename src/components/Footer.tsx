import Link from 'next/link';
import { Mail, Instagram, Music2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#251605] text-white font-courier pt-24 pb-16 px-8 md:px-16">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-50">
        
        {/* Left Column: Contact Us */}
        <div className="flex flex-col space-y-6 flex-1">
          <h2 className="text-[36px] font-bold italic uppercase leading-none tracking-tighter">
            CONTACT US
          </h2>
          <p className="text-lg">Email: theemail@gmail.com</p>
          
          <div className="flex gap-6 mt-2">
            <Link href="#" className="hover:opacity-70 transition-opacity">
              <Instagram size={24} />
            </Link>
            <Link href="#" className="hover:opacity-70 transition-opacity">
              <Music2 size={24} />
            </Link>
            <Link href="mailto:theemail@gmail.com" className="hover:opacity-70 transition-opacity">
              <Mail size={24} />
            </Link>
          </div>
        </div>

        {/* Right Column: Links */}
        <div className="flex flex-col space-y-3 uppercase text-sm tracking-wide flex-1 italic underline">
          <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <Link href="/expeditions" className="hover:opacity-70 transition-opacity">Expeditions</Link>
          <Link href="/about" className="hover:opacity-70 transition-opacity">About Us</Link>
          <Link href="/team" className="hover:opacity-70 transition-opacity">The Team</Link>
          <Link href="/faq" className="hover:opacity-70 transition-opacity">FAQ</Link>
          <Link href="/blogs" className="hover:opacity-70 transition-opacity">Blogs</Link>
          <Link href="/terms-and-conditions" className="hover:opacity-70 transition-opacity">Terms & Conditions</Link>
          <Link href="/privacy-policy" className="hover:opacity-70 transition-opacity">Privacy Policy</Link>
        </div>
      </div>

      {/* Bottom Line & Copyright */}
      <div className="max-w-5xl mx-auto mt-40">
        <div className="border-t border-white opacity-50 w-full mb-8"></div>
        <p className="text-center text-sm opacity-50 uppercase tracking-widest">
          Argo Adventure . EST 2026.
        </p>
      </div>
    </footer>
  );
}