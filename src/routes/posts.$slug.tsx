import { createFileRoute } from '@tanstack/react-router';
import { PostPage } from '#/components/blog/post-page';
import { blog } from '#/lib/source';

export const Route = createFileRoute('/posts/$slug')({
  head: ({ params }) => {
    const entry =
      blog.get(`${params.slug}.mdx`) ?? blog.get(`${params.slug}.md`);
    return {
      meta: [
        {
          title: entry ? `${entry.title} — fatihky` : 'post — fatihky',
        },
        ...(entry ? [{ name: 'description', content: entry.description }] : []),
      ],
    };
  },
  component: PostRoute,
});

function PostRoute() {
  const { slug } = Route.useParams();
  return <PostPage slug={slug} />;
}
