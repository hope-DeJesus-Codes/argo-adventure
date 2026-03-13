// src/lib/wordpress.ts

// Logic for the Slideshow on the home page. 
export async function getSlideshowPosts() {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const HOME_SLIDE_CATEGORY_ID = '2'; 

  try {
    // Try catch to fetch posts from WordPress, with error handling for failed fetches
    const res = await fetch(
      `${WP_URL}/posts?categories=${HOME_SLIDE_CATEGORY_ID}&_embed`,
      { next: { revalidate: 60 } } 
    );

    if (!res.ok) throw new Error("Failed to fetch from WordPress");

    const posts = await res.json();

    // Logic for slide show: Extracting post data and featured image URL, with error handling for missing featured images
    return posts.map((post: any) => ({
      id: post.id,
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

// Logic to change content based on a wordpress "slug" (the html provided by word press editor)
export async function getPostBySlug(slug: string) {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  try {
    const res = await fetch(
      `${WP_URL}/posts?slug=${slug}&_embed`,
      { next: { revalidate: 60 } }
    );
    const posts = await res.json();
    
    if (posts && posts.length > 0) {
      return {
        title: posts[0].title.rendered,
        content: posts[0].content.rendered,
        image: posts[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

// Logic to fetch all the data for the about page using ACF fields. (no relying on  slugs)
export async function getAboutPageData(slug: string) {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  try {
    const res = await fetch(
      `${WP_URL}/posts?slug=${slug}&_embed`,
      { next: { revalidate: 60 } }
    );
    const posts = await res.json();
    
    if (posts && posts.length > 0) {
      const post = posts[0];
      return {
        title: post.title.rendered,
        intro: post.acf?.intro_text || '',
        mission: post.acf?.mission_text || '',
        philosophy: post.acf?.philosophy_text || '',
        headerImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-header.jpg'
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching ACF data:", error);
    return null;
  }
}