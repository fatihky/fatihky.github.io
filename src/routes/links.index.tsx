import { createFileRoute } from '@tanstack/react-router';
import { LinksPage } from '#/components/links/links-page';

export const Route = createFileRoute('/links/')({
  head: () => ({
    meta: [{ title: 'links — fatihky' }],
    links: [
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        href: '/links/feed.atom',
        title: 'Links Atom Feed',
      },
    ],
  }),
  component: LinksPage,
});
