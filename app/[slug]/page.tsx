import SubpageHeader from '@/src/components/SubpageHeader';
import { getPostBySlug } from '@/src/lib/wordpress';
import { notFound } from 'next/navigation';

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  // 1. Await the params to get the slug from the URL
  const { slug } = await params;

  // 2. Use your existing logic to fetch the post
  const post = await getPostBySlug(slug);

  // 3. If your friend hasn't made the post in WP yet, show a 404
  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Reusing your header component with the WP Featured Image */}
      <SubpageHeader 
        title={post.title} 
        headerImage={post.image || '/default-header.jpg'} 
      />

      <section className="max-w-4xl mx-auto py-20 px-8">
        {/* 'prose' classes here ensure that the WP Editor content 
            inherits your global font rules (Courier, etc.) 
        */}
        <div 
          className="prose prose-lg max-w-none font-courier text-gray-800 
                     prose-h2:font-cormorant prose-h2:uppercase prose-h2:text-3xl
                     prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </section>
    </main>
  );
}