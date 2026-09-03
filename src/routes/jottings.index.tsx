import { createFileRoute } from '@tanstack/react-router';
import { JottingsPage } from '#/components/jottings/jottings-page';

export const Route = createFileRoute('/jottings/')({
  head: () => ({
    meta: [{ title: 'jottings — fatihky' }],
  }),
  component: JottingsPage,
});
