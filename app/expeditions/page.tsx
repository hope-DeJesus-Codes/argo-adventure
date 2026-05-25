import Link from 'next/link';
import Image from 'next/image';
import { getExpeditions, getPageHeader } from '@/src/lib/wordpress';
import SubpageHeader from '@/src/components/SubpageHeader';

export default async function ExpeditionsIndexPage() {
  const expeditions = await getExpeditions();
  const headerImage = await getPageHeader('expeditions_page') || '/wood-texture.jpg'; 

  return (
    <main className="min-h-screen bg-transparent">
      <SubpageHeader title="Expeditions" headerImage={headerImage} />

      <section className="max-w-7xl mx-auto py-20 px-6 md:px-12 space-y-12">
        {expeditions.length > 0 ? (
          expeditions.map((exp: any) => (
            <Link 
              href={`/expeditions/${exp.slug}`} 
              key={exp.slug}
              className="block relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden group shadow-xl"
            >
              {/* Background Image */}
              <Image 
                src={exp.image} 
                alt={exp.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Dark Overlay so text is readable */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />

              {/* TOP RIGHT: Title and Dates */}
              <div className="absolute top-6 right-6 md:top-10 md:right-10 text-right">
                <h2 className="text-3xl md:text-5xl font-zen text-white uppercase tracking-wider mb-2 drop-shadow-md">
                  {exp.title}
                </h2>
                <p className="text-xl md:text-2xl font-goudy text-white/90 italic drop-shadow-md">
                  {exp.dates}
                </p>
              </div>

              {/* BOTTOM RIGHT: Status Badge */}
              <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10">
                <div className="bg-[#B5AB86]/90 backdrop-blur-sm border border-[#251605]/20 text-[#251605] px-6 py-3 text-lg md:text-xl font-zen uppercase tracking-widest shadow-lg">
                  {exp.status}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="font-goudy text-2xl text-center">New expeditions are being planned. Check back soon.</p>
        )}
      </section>
    </main>
  );
}