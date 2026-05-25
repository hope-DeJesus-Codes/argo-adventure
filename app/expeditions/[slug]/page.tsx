import { getPostBySlug } from '@/src/lib/wordpress';
import SubpageHeader from '@/src/components/SubpageHeader';
import { notFound } from 'next/navigation';

export default async function ExpeditionDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <SubpageHeader
        title={post.title}
        headerImage={post.image || '/wood-texture.jpg'}
      />

      <section className="max-w-4xl mx-auto py-20 px-6 md:px-8">
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