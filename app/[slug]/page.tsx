import SubpageHeader from '@/src/components/SubpageHeader';
import { getPostBySlug } from '@/src/lib/wordpress';
import { notFound } from 'next/navigation';

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  // Using the slug from the URL, fetch the corresponding post data from WordPress
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Reusing  header component with the WP Featured Image */}
      <SubpageHeader 
        title={post.title} 
        headerImage={post.image || '/default-header.jpg'} 
      />

      <section className="max-w-4xl mx-auto py-20 px-8">
        <div
          className="prose prose-lg max-w-none font-goudy text-gray-800
                     prose-h2:font-zen prose-h2:uppercase prose-h2:text-3xl
                     prose-p:leading-relaxed prose-all:inherit"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </section>
    </main>
  );
}