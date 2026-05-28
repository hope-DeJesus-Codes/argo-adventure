'use client';

import dynamic from 'next/dynamic';

// Move the dynamic import boundary completely into this Client file context
const LeafletMap = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-[#ebdcb9] flex items-center justify-center border-y-4 border-[#251605]">
      <p className="font-goudy text-xl italic text-[#251605]/60 animate-pulse">
        Adventure awaits...
      </p>
    </div>
  )
});

interface ExpeditionMarker {
  title: string;
  slug: string;
  dates: string;
  image: string;
  coordinates: [number, number];
}

export default function MapWrapper({ expeditions }: { expeditions: ExpeditionMarker[] }) {
  return <LeafletMap expeditions={expeditions} />;
}