import { getTeamPageData, getTeamMembers } from '@/src/lib/wordpress';
import SubpageHeader from '@/src/components/SubpageHeader';
import Image from 'next/image';

export default async function TeamPage() {
  const [pageData, members] = await Promise.all([
    getTeamPageData(),
    getTeamMembers()
  ]);

  return (
    <main className="min-h-screen bg-transparent">
      <SubpageHeader title={pageData.title} headerImage={pageData.headerImage} />

      <section className="max-w-5xl mx-auto py-24 px-8">
        
        {/* Optional Intro Section */}
        {pageData.intro && (
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <p className="text-2xl font-courier italic text-[#251605]">{pageData.intro}</p>
          </div>
        )}

        {/* The Team List */}
        <div className="space-y-32"> {/* Large vertical gap between members */}
          {members.map((member: any, index: any) => (
            <div 
              key={member.id} 
              className={`flex flex-col md:flex-row gap-12 items-center ${
                index % 2 !== 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Photo Side */}
              <div className="w-full md:w-1/3 aspect-square relative shadow-xl rotate-1 group-hover:rotate-0 transition-transform">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Text Side */}
              <div className="w-full md:w-2/3">
                <h2 className="text-4xl font-cormorant font-bold text-[#251605] mb-4 uppercase tracking-tight">
                  {member.name}
                </h2>
                <div 
                  className="prose prose-lg font-courier text-[#251605]/90 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: member.bio }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}