import { Link } from '@tanstack/react-router';
import { BlogStyles } from '#/components/blog/blog-styles';
import { DATA } from '#/components/home/data';
import { Footer } from '#/components/home/footer';
import { Nav } from '#/components/home/nav';
import { PhosphorStyles } from '#/components/home/phosphor-styles';
import { blog, getTags } from '#/lib/source';

interface PostPageProps {
  slug: string;
}

export function PostPage({ slug }: PostPageProps) {
  const scrollTo = () => {};

  const entry = blog.get(`${slug}.mdx`) ?? blog.get(`${slug}.md`);
  const Body = entry?.body;
  const tags = getTags(slug);

  return (
    <div className="phosphor-root">
      <PhosphorStyles />
      <BlogStyles />

      <div className="crt-overlay" aria-hidden="true" />
      <div className="crt-vignette" aria-hidden="true" />
      <div className="crt-flicker" aria-hidden="true" />

      <Nav handle={DATA.handle} host={DATA.host} onNavigate={scrollTo} />

      <main className="container">
        {entry && Body ? (
          <article>
            <header className="post-header my-10">
              <div className="post-header__top">
                <span className="post-header__date">{entry.date}</span>
                <span className="post-header__path">~/posts/{slug}</span>
              </div>
              <h1 className="post-header__title">{entry.title}</h1>
              <p className="post-header__desc">{entry.description}</p>
              {tags.length > 0 && (
                <div className="post-header__tags">
                  {tags.map((tag) => (
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
            </header>
            <div className="post-body">
              <Body />
            </div>
          </article>
        ) : (
          <div className="post-missing">
            cat: /posts/{slug}: No such file or directory
          </div>
        )}
        <Link className="post-back" to="/posts">
          ← cd ~/posts
        </Link>
      </main>

      <Footer handle={DATA.handle} host={DATA.host} />
    </div>
  );
}
