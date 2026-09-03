import { Link } from '@tanstack/react-router';
import { BlogStyles } from '#/components/blog/blog-styles';
import { DATA } from '#/components/home/data';
import { Footer } from '#/components/home/footer';
import { Nav } from '#/components/home/nav';
import { PhosphorStyles } from '#/components/home/phosphor-styles';
import { jottings } from '#/lib/source';

interface JottingPageProps {
  slug: string;
}

export function JottingPage({ slug }: JottingPageProps) {
  const scrollTo = () => {};

  const entry = jottings.get(`${slug}.mdx`) ?? jottings.get(`${slug}.md`);
  const Body = entry?.body;

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
                <span className="post-header__path">~/jottings/{slug}</span>
              </div>
              <h1 className="post-header__title">{entry.title}</h1>
              <p className="post-header__desc">{entry.description}</p>
            </header>
            <div className="post-body">
              <Body />
            </div>
          </article>
        ) : (
          <div className="post-missing">
            cat: /jottings/{slug}: No such file or directory
          </div>
        )}
        <Link className="post-back" to="/jottings">
          ← cd ~/jottings
        </Link>
      </main>

      <Footer handle={DATA.handle} host={DATA.host} />
    </div>
  );
}
