import Link from 'next/link';
import Script from 'next/script';
import HeroSlideshow from '@/src/components/HeroSlideshow';
import { getSlideshowPosts, getMapExpeditions } from '@/src/lib/wordpress';
import MapWrapper from '@/src/components/MapWrapper';

export default async function HomePage() {
  const mapData = await getMapExpeditions();

  // Slideshow error handling
  let slides = [];
  try {
    slides = await getSlideshowPosts();
  } catch (error) {
    console.error("Failed to fetch slides:", error);
    slides = [{ id: 0, image: '/default-slideshow.jpg', title: 'Default' }];
  }

  return (
    <main className="min-h-screen">
<<<<<<< HEAD
       
       {/* Pop up*/}
        <Script 
          id="mcjs"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/fd1c007e515d187bb46a0138b/847b505a9ca8570e1e0507b24.js");`
          }}
        />
        
=======
      
      {/* SECTION 1: HERO BANNER */}
>>>>>>> feature/expedition-page
      <section className="relative h-[85vh] flex items-center justify-start overflow-hidden">
        
        {/* Slideshow background */}
        {slides.length > 0 && <HeroSlideshow slides={slides} />}
        
        {/* Inner Content Overlay Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16"> 
          <div className="max-w-4xl text-left">
            <h1 className="text-6xl md:text-7xl font-inknut mb-4 text-[#FFFFFF] leading-none drop-shadow-md">
              Argo Adventures
            </h1>
            
            <p className="text-xl md:text-4xl font-goudy text-[#FFFFFF] mb-8 max-w-xl leading-relaxed drop-shadow-md">
              The new Golden Age of Exploration 
            </p>
            
            {/* Action Callout Button */}
            <div className="flex flex-col sm:flex-row gap-4 font-zen">
              <Link 
                href="/expeditions" 
                className="bg-[#688e83] hover:bg-[#56776e] text-white px-10 py-4 text-2xl transition-all text-center rounded-[17px] tracking-wide uppercase shadow-lg"
              >
                expeditions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MAP */}
      <section className="py-20 bg-transparent">
        {/* Map Header Box */}
        <div className="text-center max-w-2xl mx-auto px-6 mb-12">
          <h2 className="font-zen text-4xl uppercase tracking-widest text-[#251605] mb-4">
            Adventure Awaits
          </h2>
          <p className="font-goudy text-xl italic text-[#251605]/80 leading-relaxed">
            Explore our Expeditions. Click on a marker to discover your next journey.
          </p>
        </div>

        {/* The map component wrapper running full-width */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <MapWrapper expeditions={mapData} />
        </div>
      </section>

    </main>
  );
}