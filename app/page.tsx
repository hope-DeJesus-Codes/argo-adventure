// this is the home page!!
import Link from 'next/link';
import HeroSlideshow from '@/src/components/HeroSlideshow';
import { getSlideshowPosts } from '@/src/lib/wordpress';

export default async function HomePage() {
  
  // Slide show error handling: If fetching fails, set a default slide or leave it empty
  let slides = [];
  try {
    slides = await getSlideshowPosts();
  } catch (error) {
    console.error("Failed to fetch slides:", error);
    slides = [{ id: 0, image: '/default-slideshow.jpg', title: 'Default' }];
  }

  return (
    <main className="min-h-screen">
      <section className="relative h-[85vh] flex items-center justify-start overflow-hidden">
        
        {/* Slideshow background */}
        {slides.length > 0 && <HeroSlideshow slides={slides} />}
        
        {/* Inner Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pt-20"> 
          <div className="max-w-4xl text-left">
            <h1 className="text-6xl md:text-9xl font-metal uppercase mb-4 text-[#FFFFFF] leading-none">
              Argo Adventure
            </h1>
            
            <p className="text-xl md:text-2xl font-courier text-[#FFFFFF] mb-8 max-w-xl leading-relaxed">
              The new <i>Golden Age</i> of Exploration 
            </p>
            
            {/* Buttons container */}
            <div className="flex flex-col sm:flex-row gap-4 font-courier">
              <Link 
                href="/expeditions" 
                className="bg-[#688e83] hover:opacity-90 text-white px-10 py-4 text-lg transition-all text-center rounded-[17px]"
              >
                expeditions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}