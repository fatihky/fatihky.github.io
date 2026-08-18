import { useCallback } from 'react';
import { DATA } from '#/components/home/data';
import { Footer } from '#/components/home/footer';
import { Nav } from '#/components/home/nav';
import { PhosphorStyles } from '#/components/home/phosphor-styles';
import { ProjectsSection } from '#/components/home/projects-section';

export default function ProjectsPage() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const navItems = [
    { id: 'home', label: 'home', href: '/' },
    // /about is temporarily deprecated, will be re-enabled later.
    // { id: 'about', label: 'about', href: '/about' },
    { id: 'projects', label: 'projects', href: '/projects' },
    { id: 'contact', label: 'contact', href: '/#contact' },
  ];

  return (
    <div className="phosphor-root">
      <PhosphorStyles />

      <div className="crt-overlay" aria-hidden="true" />
      <div className="crt-vignette" aria-hidden="true" />
      <div className="crt-flicker" aria-hidden="true" />

      <Nav
        handle={DATA.handle}
        host={DATA.host}
        items={navItems}
        onNavigate={scrollTo}
      />

      <main className="container">
        <ProjectsSection projects={DATA.projects} />
      </main>

      <Footer handle={DATA.handle} host={DATA.host} />
    </div>
  );
}
