// src/lib/wordpress.ts

// Logic for the Slideshow on the home page. 
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

// Logic for changing the headers on the subpages.
export async function getPageHeader(categoryId: string) {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  try {
    const res = await fetch(
      `${WP_URL}/posts?categories=${categoryId}&per_page=1&_embed`,
      { next: { revalidate: 60 } }
    );
    const posts = await res.json();
    
    if (posts && posts.length > 0) {
      return posts[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-header.jpg';
    }
    return '/default-header.jpg';
  } catch (error) {
    return '/default-header.jpg';
  }
}