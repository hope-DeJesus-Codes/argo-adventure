import Link from 'next/link';
import HeroSlideshow from '@/src/components/HeroSlideshow';
import { getSlideshowPosts } from '@/src/lib/wordpress';

export default async function HomePage() {
  
  // Error Handling
  let slides = [];

  // Slide show error handling: If fetching fails, set a default slide or leave it empty
  try {
    slides = await getSlideshowPosts();
  } catch (error) {
    console.error("Failed to fetch slides:", error);
    slides = [{ id: 0, image: '/default-slideshow.jpg', title: 'Default' }];
  }

  return (
    <main className="min-h-screen">
      <section className="relative h-[85vh] flex items-end justify-start pb-20 px-8 md:px-16 lg:px-24 overflow-hidden">
        
        {/* Now slides is guaranteed to be defined (at least an empty list) */}
        {slides.length > 0 && <HeroSlideshow slides={slides} />}
        
        <div className="relative z-10 max-w-4xl text-left">
          <h1 className="text-6xl md:text-9xl font-metal uppercase mb-4 text-[#000000] leading-none">
            Argo Adventure
          </h1>
          
          <p className="text-xl md:text-2xl font-courier text-[#000000] mb-8 max-w-xl leading-relaxed">
            The adventures you always dreamed about, come to life. 
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 font-courier">
            <Link 
              href="/expeditions" 
              className="bg-[#688e83] hover:opacity-90 text-white px-10 py-4 text-lg transition-all text-center rounded-[17px]"
            >
              expeditions
            </Link>
            
            <Link 
              href="/interest-form" 
              className="bg-[#688e83] hover:opacity-90 text-white px-10 py-4 text-lg transition-all text-center rounded-[17px]"
            >
              interest form
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}