import { useCallback } from 'react';
import { ContactSection } from '#/components/home/contact-section';
import { DATA } from '#/components/home/data';
import { Footer } from '#/components/home/footer';
import { Hero } from '#/components/home/hero';
import { useTypewriter } from '#/components/home/hooks';
import { Nav } from '#/components/home/nav';
import { PhosphorStyles } from '#/components/home/phosphor-styles';
import { PostsSection } from '#/components/home/posts-section';

export default function HomePage() {
  const tagline = useTypewriter(DATA.tagline, 24, 250);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="phosphor-root">
      <PhosphorStyles />

      <div className="crt-overlay" aria-hidden="true" />
      <div className="crt-vignette" aria-hidden="true" />
      <div className="crt-flicker" aria-hidden="true" />

      <Nav handle={DATA.handle} host={DATA.host} onNavigate={scrollTo} />

      <Hero
        name={DATA.name}
        role={DATA.role}
        location={DATA.location}
        taglineOut={tagline.out}
      />

      <main className="container">
        <PostsSection />

        <ContactSection />
      </main>

      <Footer handle={DATA.handle} host={DATA.host} />
    </div>
  );
}
