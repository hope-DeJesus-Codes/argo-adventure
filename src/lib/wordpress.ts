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

export async function getBlogsPageData() {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  try {
    const res = await fetch(
      `${WP_URL}/posts?slug=blogs_page&_embed`, 
      { next: { revalidate: 60 } }
    );
    const posts = await res.json();
    
    // Check if the array has our "blogs_page" post
    if (posts && posts.length > 0) {
      const post = posts[0];
      return {
        title: post.title.rendered,
        intro: post.acf?.intro_text || '', 
        headerImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-header.jpg'
      };
    }
    return null; 
  } catch (error) {
    console.error("Error fetching Blogs Page (Post) header data:", error);
    return null;
  }
}


export async function getBlogPosts() {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  try {
    const catRes = await fetch(`${WP_URL}/categories?slug=blog`);
    const categories = await catRes.json();

    if (!categories || categories.length === 0) {
      console.warn("Category 'blog' not found in WordPress.");
      return [];
    }

    const blogCategoryId = categories[0].id;
    const postsRes = await fetch(
      `${WP_URL}/posts?categories=${blogCategoryId}&_embed&per_page=100`,
      { next: { revalidate: 60 } }
    );
    const posts = await postsRes.json();

    return posts.map((post: any) => {
  // 1. Dig into the _embedded data to find the source URL
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return {
      id: post.id,
      slug: post.slug,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      
      /* 2. THE LOGIC: 
        If featuredImage exists, use it. 
        Otherwise, use your specific local default from /public.
      */
      image: featuredImage || '/default-blog-thumbnail.jpg',
      
      date: new Date(post.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    };
  });
  } catch (error) {
    console.error("Error in getBlogPosts logic:", error);
    return [];
  }
}

// Logic to fetch FAQ list from WordPress, using a specific "FAQ" category and returning question-answer pairs.
export async function getFAQList() {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  try {
    // 1. Get the Category ID for "FAQ"
    const catRes = await fetch(`${WP_URL}/categories?slug=faq`);
    const categories = await catRes.json();
    
    if (!categories || categories.length === 0) return [];
    const faqId = categories[0].id;

    // 2. Fetch all posts in that category
    const res = await fetch(
      `${WP_URL}/posts?categories=${faqId}&per_page=100&_embed`,
      { next: { revalidate: 60 } }
    );
    const posts = await res.json();

    return posts.map((post: any) => ({
      id: post.id,
      question: post.title.rendered,
      answer: post.content.rendered,
    }));
  } catch (error) {
    console.error("Error fetching FAQ list:", error);
    return [];
  }
}

// Logic to get FAQ posts and associate it with a category
export async function getGroupedFAQs() {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  // The categories we expect. We use these to guarantee the order on the page.
  const expectedCategories = [
    "Expeditions",
    "Registration",
    "Meals & Accommodations",
    "Flights, Travel, Packing",
    "Health & Safety"
  ];

  try {
    // 1. Fetch all categories to build an ID-to-Name map
    const catRes = await fetch(`${WP_URL}/categories?per_page=100`);
    const allCategories = await catRes.json();
    
    const categoryMap: Record<number, string> = {};
    let parentFaqId = null;

    allCategories.forEach((cat: any) => {
      categoryMap[cat.id] = cat.name;
      // We also want to find the main "FAQ" category ID just in case
      if (cat.slug === 'faq') parentFaqId = cat.id; 
    });

    // 2. Fetch the posts
    // We fetch posts that belong to the FAQ category (or just fetch all if you only use WP for this)
    const postUrl = parentFaqId 
      ? `${WP_URL}/posts?categories=${parentFaqId}&per_page=100&_embed`
      : `${WP_URL}/posts?per_page=100&_embed`;

    const res = await fetch(postUrl, { next: { revalidate: 60 } });
    const posts = await res.json();

    // 3. Initialize our empty buckets
    const groupedData: Record<string, any[]> = {};
    expectedCategories.forEach(cat => {
      groupedData[cat] = [];
    });

    // 4. Sort posts into their buckets
    posts.forEach((post: any) => {
      // Find which of the post's category IDs matches our expected subcategories
      const postCategoryNames = post.categories.map((id: number) => categoryMap[id]);
      
      const matchedCategory = expectedCategories.find(expected => 
        postCategoryNames.includes(expected)
      );

      if (matchedCategory) {
        groupedData[matchedCategory].push({
          id: post.id,
          question: post.title.rendered,
          answer: post.content.rendered,
        });
      }
    });

    return expectedCategories.map(category => ({
      categoryName: category,
      questions: groupedData[category]
    }));

  } catch (error) {
    console.error("Error fetching grouped FAQs:", error);
    return [];
  }
}

// Logic to fetch team members from WordPress, using a specific "Team" category and returning name, bio, and photo for each member.
export async function getTeamPageData() {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  try {
    const res = await fetch(`${WP_URL}/posts?slug=team-page&_embed`, { next: { revalidate: 60 } });
    const posts = await res.json();
    if (posts && posts.length > 0) {
      const p = posts[0];
      return {
        title: p.title.rendered,
        intro: p.acf?.intro_text || '',
        headerImage: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-header.jpg'
      };
    }
    return { title: "The Team", intro: "", headerImage: "/default-header.jpg" };
  } catch (error) {
    return { title: "The Team", intro: "", headerImage: "/default-header.jpg" };
  }
}

// Fetch Team Members List
export async function getTeamMembers() {
  const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  try {
    const catRes = await fetch(`${WP_URL}/categories?slug=team`);
    const categories = await catRes.json();
    if (!categories || categories.length === 0) return [];
    
    const teamId = categories[0].id;
    const res = await fetch(`${WP_URL}/posts?categories=${teamId}&_embed&per_page=50&orderby=date&order=asc`, { next: { revalidate: 60 } });
    const posts = await res.json();

    return posts.filter((p: any) => p.slug !== 'team_page').map((post: any) => ({
      id: post.id,
      name: post.title.rendered,
      bio: post.content.rendered,
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-blog-thumbnail.jpg',
    }));
  } catch (error) {
    return [];
  }
}