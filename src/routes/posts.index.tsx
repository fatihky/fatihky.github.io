import { createFileRoute } from '@tanstack/react-router';
import { PostsPage } from '#/components/blog/posts-page';

export const Route = createFileRoute('/posts/')({
  head: () => ({
    meta: [{ title: 'posts — fatihky' }],
  }),
  component: PostsPage,
});
