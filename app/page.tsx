import { request, gql } from 'graphql-request';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string;

const GET_POSTS = gql`
  query GetPosts {
    posts {
      nodes {
        title
        slug
      }
    }
  }
`;

export default async function Home() {
  const data: any = await request(API_URL, GET_POSTS);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Blog Posts</h1>
      <ul>
        {data.posts.nodes.map((post: any) => (
          <li key={post.slug} className="mt-2 text-blue-500">
            {post.title}
          </li>
        ))}
      </ul>
    </main>
  );
}