import { Section } from "./section";

interface ExperienceEntry {
	hash: string;
	date: string;
	role: string;
	org: string;
	note: string;
}

interface LogSectionProps {
	entries: ExperienceEntry[];
}

export function LogSection({ entries }: LogSectionProps) {
	return (
		<Section id="log" index="02" label="experience.log">
			{entries.map((e) => (
				<div className="log-entry" key={e.hash}>
					<span className="log-entry__hash">{e.hash}</span>
					<span className="log-entry__bar" />
					<div>
						<div className="log-entry__date">{e.date}</div>
						<div className="log-entry__role">{e.role}</div>
						<div className="log-entry__org">{e.org}</div>
						<div className="log-entry__note">{e.note}</div>
					</div>
				</div>
			))}
		</Section>
	);
}
