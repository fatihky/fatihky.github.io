import { Link } from '@tanstack/react-router';
import { BlogStyles } from '#/components/blog/blog-styles';
import { DATA } from '#/components/home/data';
import { Footer } from '#/components/home/footer';
import { Nav } from '#/components/home/nav';
import { PhosphorStyles } from '#/components/home/phosphor-styles';
import { Section } from '#/components/home/section';
import { blogSource, getTags } from '#/lib/source';

interface TagPageProps {
  tag: string;
}

export function TagPage({ tag }: TagPageProps) {
  const scrollTo = () => {};

  const posts = blogSource
    .getPages()
    .slice()
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1))
    .filter((p) => getTags(p.slugs.join('/')).includes(tag));

  return (
    <div className="phosphor-root">
      <PhosphorStyles />
      <BlogStyles />

      <div className="crt-overlay" aria-hidden="true" />
      <div className="crt-vignette" aria-hidden="true" />
      <div className="crt-flicker" aria-hidden="true" />

      <Nav handle={DATA.handle} host={DATA.host} onNavigate={scrollTo} />

      <main className="container">
        <Section id="posts" index="01" label={`~/posts/tags/${tag}`}>
          <div className="post-filter">
            <span className="post-filter__label">$ grep #{tag}</span>
            <Link className="post-filter__clear" to="/posts">
              ✕ clear
            </Link>
          </div>
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
                    {getTags(p.slugs.join('/')).map((t) => (
                      <Link
                        className="tag"
                        key={t}
                        params={{ slug: t }}
                        to="/posts/tags/$slug"
                      >
                        #{t}
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
          {posts.length === 0 && (
            <div className="post-missing">
              grep: /posts/tags/{tag}: no posts matching
            </div>
          )}
        </Section>
      </main>

      <Footer handle={DATA.handle} host={DATA.host} />
    </div>
  );
}
