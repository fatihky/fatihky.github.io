import { Link } from '@tanstack/react-router';
import { BlogStyles } from '#/components/blog/blog-styles';
import { DATA } from '#/components/home/data';
import { Footer } from '#/components/home/footer';
import { Nav } from '#/components/home/nav';
import { PhosphorStyles } from '#/components/home/phosphor-styles';
import { Section } from '#/components/home/section';
import { jottingsSource } from '#/lib/source';

export function JottingsPage() {
  const scrollTo = () => {};

  const entries = jottingsSource
    .getPages()
    .slice()
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1));

  return (
    <div className="phosphor-root">
      <PhosphorStyles />
      <BlogStyles />

      <div className="crt-overlay" aria-hidden="true" />
      <div className="crt-vignette" aria-hidden="true" />
      <div className="crt-flicker" aria-hidden="true" />

      <Nav handle={DATA.handle} host={DATA.host} onNavigate={scrollTo} />

      <main className="container">
        <Section id="jottings" index="02" label="~/jottings">
          <div className="post-list">
            {entries.map((p) => (
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
              </article>
            ))}
          </div>
        </Section>
      </main>

      <Footer handle={DATA.handle} host={DATA.host} />
    </div>
  );
}
