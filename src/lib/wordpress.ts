// src/lib/wordpress.ts

export async function getSlideshowPosts() {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const HOME_SLIDE_CATEGORY_ID = '2'; 

  try {
    // Try catch to fetch posts from WordPress, with error handling for failed fetches
    const res = await fetch(
      `${WP_URL}/posts?categories=${HOME_SLIDE_CATEGORY_ID}&_embed`,
      { cache: 'no-store', next: { revalidate: 60 } } // clearing cache and revalidating every 60 to update with posts
    );

    if (!res.ok) throw new Error("Failed to fetch from WordPress");

    const posts = await res.json();

    // Logic for slide show: Extracting post data and featured image URL, with error handling for missing featured images
    return posts.map((post: any) => ({
      id: post.id,
      // This path is where WordPress hides the Featured Image URL
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-slideshow.jpg',
      title: post.title.rendered,
    }));
  } catch (error) {
    console.error("WordPress API Error:", error);
    return []; 
  }
}