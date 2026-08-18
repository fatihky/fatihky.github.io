import { Section } from "./section";

interface Project {
	id: string;
	name: string;
	desc: string;
	stack: string[];
	link: string;
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
							<a className="project__link" href={p.link}>
								→ view
							</a>
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
