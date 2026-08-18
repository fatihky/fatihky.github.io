interface BootLine {
	text: string;
	delay: number;
}

interface BootScreenProps {
	lines: BootLine[];
	visibleCount: number;
	onSkip: () => void;
}

export function BootScreen({ lines, visibleCount, onSkip }: BootScreenProps) {
	return (
		<div className="boot-screen" role="status" aria-live="polite">
			{lines.slice(0, visibleCount).map((l, i) => (
				<div className="boot-line" key={i}>
					{l.text}
				</div>
			))}
			<button className="boot-skip" onClick={onSkip} type="button">
				skip [enter]
			</button>
		</div>
	);
}
