import { createFileRoute } from '@tanstack/react-router';
import { JottingPage } from '#/components/jottings/jotting-page';
import { jottings } from '#/lib/source';

export const Route = createFileRoute('/jottings/$slug')({
  head: ({ params }) => {
    const entry =
      jottings.get(`${params.slug}.mdx`) ?? jottings.get(`${params.slug}.md`);
    return {
      meta: [
        {
          title: entry ? `${entry.title} — fatihky` : 'jotting — fatihky',
        },
        ...(entry ? [{ name: 'description', content: entry.description }] : []),
      ],
    };
  },
  component: JottingRoute,
});

function JottingRoute() {
  const { slug } = Route.useParams();
  return <JottingPage slug={slug} />;
}
