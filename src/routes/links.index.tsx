import { createFileRoute } from '@tanstack/react-router';
import { LinksPage } from '#/components/links/links-page';

export const Route = createFileRoute('/links/')({
  head: () => ({ meta: [{ title: 'links — fatihky' }] }),
  component: LinksPage,
});
