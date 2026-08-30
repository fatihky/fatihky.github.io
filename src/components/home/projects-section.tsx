import { Section } from './section';

interface ProjectLink {
  label: string;
  url: string;
}

interface Project {
  id: string;
  name: string;
  desc: string;
  stack: string[];
  links: ProjectLink[];
}

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <Section id="projects" index="01" label="~/projects">
      <div className="project-list">
        {projects.map((p) => (
          <article className="project" key={p.id}>
            <div className="project__top">
              <span className="project__id">{p.id}</span>
              <span className="project__name">{p.name}</span>
              <div className="project__links flex items-center gap-2">
                <span className="project__arrow">→</span>
                {p.links.map((l, i) => (
                  <span key={l.label}>
                    <a
                      className="project__link"
                      href={l.url}
                      rel="noopener"
                      target="_blank"
                    >
                      {l.label}
                    </a>
                    {i < p.links.length - 1 && (
                      <span className="project__sep"> | </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
            <div className="project__desc">{p.desc}</div>
            <div className="project__stack">
              {p.stack.map((s) => (
                <span className="tag" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
