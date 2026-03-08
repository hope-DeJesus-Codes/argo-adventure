import SubpageHeader from '@/src/components/SubpageHeader';
import { getPageHeader } from '@/src/lib/wordpress';

export default async function ExpeditionsPage() {
  const headerImage = await getPageHeader('4');

  return (
    <main className="min-h-screen bg-white">
      {/* Consistent Header Structure */}
      <SubpageHeader title="Expeditions" headerImage={headerImage} />

      {/* Page Content */}
      <section className="max-w-7xl mx-auto py-20 px-8">
        <div className="prose prose-lg max-w-none font-courier text-gray-800">
          <h2 className="text-3xl mb-6 uppercase font-bold">Upcoming Journeys</h2>
          <p>
            This is where you will list your various expeditions. 
            Since it's in a standard container, it will align with your navbar.
          </p>
        </div>
      </section>
    </main>
  );
}