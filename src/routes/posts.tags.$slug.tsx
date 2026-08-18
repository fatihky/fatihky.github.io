import { createFileRoute } from '@tanstack/react-router';
import { TagPage } from '#/components/blog/tag-page';

export const Route = createFileRoute('/posts/tags/$slug')({
  head: ({ params }) => ({
    meta: [{ title: `#${params.slug} — fatihky` }],
  }),
  component: TagRoute,
});

function TagRoute() {
  const { slug } = Route.useParams();
  return <TagPage tag={slug} />;
}
