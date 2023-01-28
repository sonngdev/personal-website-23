import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Container from '../../components/container';
import { formatDate } from '../../lib/time';
import { getAllPosts } from '../../lib/getPost';

export default function NotePage({
  allPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <Head>
        <title>Son Nguyen • Blog</title>
      </Head>

      {allPosts.length ? (
        allPosts.map((post) => (
          <article key={post.slug} className="mb-10">
            <Link
              as={`/blog/${post.slug}`}
              href="/blog/[slug]"
              className="text-lg leading-6 font-bold"
            >
              {post.title}
            </Link>
            <p>{post.excerpt}</p>
            <div className="text-gray-400">
              <time>{formatDate(post.date ? new Date(post.date) : new Date())}</time>
            </div>
          </article>
        ))
      ) : (
        <p>No blog posted yet :/</p>
      )}
    </Container>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['slug', 'title', 'excerpt', 'date']);

  return {
    props: { allPosts },
  };
}
