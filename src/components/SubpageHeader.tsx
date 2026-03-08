import Image from 'next/image';

interface SubpageHeaderProps {
  title: string;
  headerImage: string;
}

export default function SubpageHeader({ title, headerImage }: SubpageHeaderProps) {
  return (
    <section className="relative h-[45vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={headerImage}
          alt={title}
          fill
          className="object-cover brightness-75"
          priority
        />
      </div>

      {/* Title Overlay */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-metal uppercase text-white tracking-widest drop-shadow-lg">
          {title}
        </h1>
      </div>
    </section>
  );
}