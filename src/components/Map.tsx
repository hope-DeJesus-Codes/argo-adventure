'use client';

import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const antiqueIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface ExpeditionMarker {
  title: string;
  slug: string;
  dates: string;
  image: string;
  coordinates: [number, number];
}

function MapController({ markers }: { markers: ExpeditionMarker[] }) {
  const map = useMap();
  if (markers.length > 0) {
    const bounds = L.latLngBounds(markers.map(m => m.coordinates));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 5 });
  }
  return null;
}

export default function AntiqueMap({ expeditions }: { expeditions: ExpeditionMarker[] }) {
  // Define strict world bounds so the map cannot be dragged endlessly into blank space
  const worldBounds = L.latLngBounds([[-90, -180], [90, 180]]);

  return (
    /* Removed border-y-4 border-[#251605] and added a smooth rounded layout radius */
    <div className="relative w-full h-[600px] bg-[#ebdcb9] overflow-hidden shadow-lg group rounded-xl">
      
      {/* Changed bg-repeat to bg-cover to stop the paper texture from creating an ugly repeating grid pattern */}
      <div className="absolute inset-0 z-[400] pointer-events-none mix-blend-multiply opacity-35 bg-[url('/paper-texture.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 z-[401] pointer-events-none bg-radial-vignette shadow-[inset_0_0_100px_rgba(37,22,5,0.5)]" />

      <div className="w-full h-full antique-map-tiles">
        <MapContainer 
          center={[20, 0]} 
          zoom={2} 
          minZoom={2}
          maxBounds={worldBounds}
          maxBoundsViscosity={1.0}
          scrollWheelZoom={false}
          className="w-full h-full bg-[#ebdcb9]"
        >
          {/* Added noWrap={true} to stop Leaflet from painting secondary duplicate continents on drag loops */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
            noWrap={true}
          />

          {expeditions.map((exp) => (
            <Marker 
              key={exp.slug} 
              position={exp.coordinates} 
              icon={antiqueIcon}
              eventHandlers={{
                click: () => {
                  window.location.href = `/expeditions/${exp.slug}`;
                }
              }}
            >
              <Tooltip direction="top" offset={[0, -20]} opacity={1} className="custom-antique-tooltip">
                <div className="w-64 p-2 bg-[#fcf5e3] border-2 border-[#4a321a] rounded shadow-xl font-goudy text-[#251605]">
                  <div className="relative w-full h-32 mb-2 rounded overflow-hidden border border-[#251605]/30">
                    <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-zen uppercase text-sm tracking-wide border-b border-[#4a321a]/30 pb-1 mb-1 font-bold">
                    {exp.title}
                  </h4>
                  <p className="text-xs italic text-[#251605]/80">{exp.dates}</p>
                  <p className="text-[10px] text-right text-[#b38646] uppercase tracking-widest font-zen mt-2">Click to Explore →</p>
                </div>
              </Tooltip>
            </Marker>
          ))}
          
          <MapController markers={expeditions} />
        </MapContainer>
      </div>
    </div>
  );
}