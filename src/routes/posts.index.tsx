import { createFileRoute } from '@tanstack/react-router';
import { PostsPage } from '#/components/blog/posts-page';

export const Route = createFileRoute('/posts/')({
  head: () => ({
    meta: [{ title: 'posts — fatihky' }],
    links: [
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        href: '/posts/feed.atom',
        title: 'Posts Atom Feed',
      },
    ],
  }),
  component: PostsPage,
});
