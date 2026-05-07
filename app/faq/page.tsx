import { getGroupedFAQs, getPageHeader } from '@/src/lib/wordpress';
import SubpageHeader from '@/src/components/SubpageHeader';
import FAQAccordion from '@/src/components/FAQAccordion'; // Import the new component

export default async function FAQPage() {
  // Fetch the newly grouped data
  const groupedFaqs = await getGroupedFAQs();
  const headerImage = await getPageHeader('faq'); 

  return (
    <main className="min-h-screen bg-transparent">
      <SubpageHeader title="FAQ" headerImage={headerImage} />

      <section className="max-w-4xl mx-auto py-20 px-6 md:px-8">
        {/* Pass the data to our interactive Client Component */}
        <FAQAccordion groupedFaqs={groupedFaqs} />
      </section>
    </main>
  );
}