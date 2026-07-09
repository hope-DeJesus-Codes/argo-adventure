import { getPostBySlug } from '@/src/lib/wordpress';
import SubpageHeader from '@/src/components/SubpageHeader';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function ExpeditionDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen relative pb-24">
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

      {post.bookingUrl && (
        <div className="fixed bottom-8 right-8 z-50 md:bottom-12 md:right-12">
          <Link 
            href={post.bookingUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#688e83] hover:bg-[#56776e] text-white font-zen px-10 py-4 text-2xl transition-all text-center rounded-[17px] tracking-wide uppercase shadow-lg"
          >
            Click to Book
          </Link>
        </div>
      )}
    </main>
  );
}