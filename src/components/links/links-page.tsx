import { Link } from '@tanstack/react-router';
import { DATA } from '#/components/home/data';
import { Footer } from '#/components/home/footer';
import { Nav } from '#/components/home/nav';
import { PhosphorStyles } from '#/components/home/phosphor-styles';
import { Section } from '#/components/home/section';
import { getLinks } from '#/lib/source';

export function LinksPage() {
  const scrollTo = () => {};
  const links = getLinks();

  return (
    <div className="phosphor-root">
      <PhosphorStyles />

      <div className="crt-overlay" aria-hidden="true" />
      <div className="crt-vignette" aria-hidden="true" />
      <div className="crt-flicker" aria-hidden="true" />

      <Nav handle={DATA.handle} host={DATA.host} onNavigate={scrollTo} />

      <main className="container">
        <Section id="links" index="01" label="~/links">
          <div className="post-list">
            {links.map((link) => (
              <article className="post" key={link.url}>
                <div className="post__top">
                  {link.date && <span className="post__date">{link.date}</span>}
                  <a
                    className="post__link"
                    href={link.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    → visit
                  </a>
                </div>
                <a
                  className="post__title"
                  href={link.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.title}
                </a>
                {link.description && (
                  <div className="post__excerpt">{link.description}</div>
                )}
                {link.tags && link.tags.length > 0 && (
                  <div className="post__tags">
                    {link.tags.map((tag) => (
                      <Link
                        className="tag"
                        key={tag}
                        params={{ slug: tag }}
                        to="/links/tags/$slug"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
          <div className="post-filter">
            <span className="post-filter__label">$ cat feed.atom</span>
            <a className="post-filter__clear" href="/links/feed.atom">
              → subscribe (Atom)
            </a>
          </div>
        </Section>
      </main>

      <Footer handle={DATA.handle} host={DATA.host} />
    </div>
  );
}
