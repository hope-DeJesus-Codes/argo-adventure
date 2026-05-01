import { getBlogsPageData, getBlogPosts } from '@/src/lib/wordpress';
import SubpageHeader from '@/src/components/SubpageHeader';
import Link from 'next/link';
import Image from 'next/image';

export default async function BlogsPage() {
  // Fetch both sets of data in parallel for speed
  const [pageData, posts] = await Promise.all([
    getBlogsPageData(),
    getBlogPosts()
  ]);

  if (!pageData) return <div>Page not found</div>;

  return (
    <main className="min-h-screen bg-transparent">
      <SubpageHeader 
        title={pageData.title} 
        headerImage={pageData.headerImage} 
      />

      <section className="max-w-7xl mx-auto py-20 px-8 ">
        {pageData.intro && (
        <div className="max-w-4xl mx-auto pt-12 mb-20 text-center">
            <p className="text-xl md:text-3xl font-courier text-[#251605] leading-relaxed italic drop-shadow-sm">
            {pageData.intro}
            </p>
            
        </div>
        )}

        {/* The Grid of Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post: any) => (
            <Link href={`/blogs/${post.slug}`} key={post.id} className="group">
              <div className="relative aspect-[4/3] overflow-hidden mb-4">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h2 className="text-2xl font-cormorant font-bold mb-2 group-hover:underline">
                {post.title}
              </h2>
              <div 
                className="text-sm font-courier line-clamp-2 opacity-80"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}