import { createFileRoute } from '@tanstack/react-router';
import ProjectsPage from '#/components/pages/projects';

export const Route = createFileRoute('/projects')({
  component: Projects,
  head: () => ({
    meta: [{ title: 'projects — fatihky' }],
  }),
});

function Projects() {
  return <ProjectsPage />;
}
