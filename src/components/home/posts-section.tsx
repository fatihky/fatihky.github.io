import { Link } from '@tanstack/react-router';
import { blogSource, getTags } from '#/lib/source';
import { Section } from './section';

export function PostsSection() {
  const posts = blogSource
    .getPages()
    .slice()
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1));

  return (
    <Section id="posts" index="01" label="~/posts">
      <div className="post-list">
        {posts.map((p) => (
          <article className="post" key={p.url}>
            <div className="post__top">
              <span className="post__date">{p.data.date}</span>
              <Link className="post__link" to={p.url}>
                → read
              </Link>
            </div>
            <Link className="post__title" to={p.url}>
              {p.data.title}
            </Link>
            <div className="post__excerpt">{p.data.description}</div>
            {getTags(p.slugs.join('/')).length > 0 && (
              <div className="post__tags">
                {getTags(p.slugs.join('/')).map((tag) => (
                  <Link
                    className="tag"
                    key={tag}
                    params={{ slug: tag }}
                    to="/posts/tags/$slug"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
