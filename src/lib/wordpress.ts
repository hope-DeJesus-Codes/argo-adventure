// src/lib/wordpress.ts

// function to grap posts from WordPress and add it to `slides` in page.tsx
export async function getSlideshowPosts() {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL; 
  
  const res = await fetch(`${WP_URL}/posts?_embed`); 
  
  if (!res.ok) {
    console.error("WordPress Fetch Failed");
    return [];
  }

  // Logic for fetiching post data and featured image URL
  const posts = await res.json();
  return posts.map((post: any) => ({
    id: post.id,
    image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-slideshow.jpg',
    title: post.title.rendered
  }));
}