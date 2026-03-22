// src/app/blogs/[slug]/page.tsx
import Image from 'next/image';
import { getPostBySlug } from '@/src/lib/wordpress';
import { notFound } from 'next/navigation';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-transparent py-24 px-8">
      
      <article className="max-w-4xl mx-auto">
        
        <h1 className="text-5xl md:text-7xl font-metal text-center text-[#251605] uppercase mb-12">
          {post.title}
        </h1>

        {/* Featured Image as an inline piece */}
        {post.image && (
          <div className="relative w-full aspect-video mb-12">
            <Image 
              src={post.image} 
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* The Blog Content */}
        <div 
          className="prose prose-lg max-w-none text-[#251605]
                     prose-h2:font-cormorant prose-h2:uppercase prose-h2:text-3xl
                     prose-p:font-courier prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        
      </article>
    </main>
  );
}