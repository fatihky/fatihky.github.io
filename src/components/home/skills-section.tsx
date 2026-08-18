import { Section } from "./section";

interface SkillsSectionProps {
	skills: Record<string, string[]>;
}

export function SkillsSection({ skills }: SkillsSectionProps) {
	return (
		<Section id="skills" index="03" label="skills.cfg">
			<div className="skills-cfg">
				{Object.entries(skills).map(([key, vals]) => (
					<div className="skills-cfg__row" key={key}>
						<span className="skills-cfg__key">{key}</span>
						<span className="skills-cfg__val">
							{" "}
							= [
							{vals.map((v, i) => (
								<span key={v}>
									"{v}"
									{i < vals.length - 1 ? (
										<span className="comma">, </span>
									) : (
										""
									)}
								</span>
							))}
							]
						</span>
					</div>
				))}
			</div>
		</Section>
	);
}
