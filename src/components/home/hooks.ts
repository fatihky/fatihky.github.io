import { useEffect, useRef, useState } from "react";

// ---------- HOOK: typewriter ----------
export function useTypewriter(text: string, speed = 28, startDelay = 0) {
	const [out, setOut] = useState("");
	const [done, setDone] = useState(false);
	useEffect(() => {
		let i = 0;
		let interval: ReturnType<typeof setInterval>;
		const start = setTimeout(() => {
			interval = setInterval(() => {
				i += 1;
				setOut(text.slice(0, i));
				if (i >= text.length) {
					clearInterval(interval);
					setDone(true);
				}
			}, speed);
		}, startDelay);
		return () => {
			clearTimeout(start);
			clearInterval(interval);
		};
	}, [text, speed, startDelay]);
	return { out, done };
}

// ---------- HOOK: reveal on scroll ----------
export function useReveal<T extends HTMLElement>() {
	const ref = useRef<T>(null);
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const node = ref.current;
		if (!node) return;
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					obs.disconnect();
				}
			},
			{ threshold: 0.15 },
		);
		obs.observe(node);
		return () => obs.disconnect();
	}, []);
	return [ref, visible] as const;
}
