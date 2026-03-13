import SubpageHeader from '@/src/components/SubpageHeader';
import { getAboutPageData } from '@/src/lib/wordpress';

export default async function AboutPage() {
  const data = await getAboutPageData('about-page');

  if (!data) return <div>Loading...</div>;

  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      <SubpageHeader title={data.title} headerImage={data.headerImage} />

      <section className="max-w-4xl mx-auto py-20 px-8">
        <div className="space-y-12">
          
          {/* Main Intro */}
          <div className="text-center">
            <h2 className="font-metal text-4xl uppercase mb-6 text-gray-900">
              We crave adventure, but we also crave meaning.
            </h2>
            <p className="font-courier text-lg leading-relaxed text-gray-700 whitespace-pre-line">
              {data.intro}
            </p>
          </div>

          <hr className="border-gray-200" />

          {/* Two-Column Detail Section */}
          <div className="grid md:grid-cols-2 gap-12 font-courier text-gray-600">
            <div>
              <h3 className="font-bold uppercase text-gray-900 mb-4">Our Mission</h3>
              <p className="whitespace-pre-line">{data.mission}</p>
            </div>
            <div>
              <h3 className="font-bold uppercase text-gray-900 mb-4">Our History</h3>
              <p className="whitespace-pre-line">{data.philosophy}</p>
            </div>
          </div>
          
        </div>
      </section>
    </main>
  );
}