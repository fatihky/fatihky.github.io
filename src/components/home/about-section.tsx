import { Section } from "./section";

interface AboutSectionProps {
	lines: string[];
}

export function AboutSection({ lines }: AboutSectionProps) {
	return (
		<Section id="about" index="01" label="about.txt">
			<div className="about-block">
				<span className="about-block__filename">cat about.txt</span>
				{lines.join("\n")}
			</div>
		</Section>
	);
}
