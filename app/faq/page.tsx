import { getFAQList, getPageHeader } from '@/src/lib/wordpress';
import SubpageHeader from '@/src/components/SubpageHeader';

export default async function FAQPage() {
  // Fetch data
  const faqs = await getFAQList();
  
  const headerImage = await getPageHeader('faq'); 

  return (
    <main className="min-h-screen bg-transparent">
      <SubpageHeader title="FAQ" headerImage={headerImage} />

      <section className="max-w-4xl mx-auto py-20 px-8">
        <div className="space-y-12">
          {faqs.length > 0 ? (
            faqs.map((faq) => (
              <div key={faq.id} className="border-b border-[#251605]/20 pb-8">
                <h2 className="faq-question text-3xl font-cormorant text-[#251605] mb-4">
                    {faq.question}
                </h2>
                
                <div 
                    className="prose prose-lg max-w-none font-courier text-[#251605]/90 pl-12"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
                </div>
            ))
          ) : (
            <p className="font-courier text-center">No questions found. Check back soon.</p>
          )}
        </div>
      </section>
    </main>
  );
}