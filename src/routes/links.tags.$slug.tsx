import { createFileRoute } from '@tanstack/react-router';
import { LinksTagPage } from '#/components/links/links-tag-page';

export const Route = createFileRoute('/links/tags/$slug')({
  head: ({ params }) => ({
    meta: [{ title: `#${params.slug} — links — fatihky` }],
    links: [
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        href: '/links/feed.atom',
        title: 'Links Atom Feed',
      },
    ],
  }),
  component: LinksTagRoute,
});

function LinksTagRoute() {
  const { slug } = Route.useParams();
  return <LinksTagPage tag={slug} />;
}
