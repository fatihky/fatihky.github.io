import type { ReactNode } from 'react';
import { useReveal } from './hooks';

interface SectionProps {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
}

export function Section({ id, index, label, children }: SectionProps) {
  const [ref, visible] = useReveal<HTMLElement>();
  return (
    <section
      id={id}
      ref={ref}
      className={`section${visible ? ' section--visible' : ''}`}
    >
      <div className="section__head">
        <span className="section__index">[{index}]</span>
        <span className="section__label">{label}</span>
        <span className="section__rule" aria-hidden="true" />
      </div>
      <div className="section__body">{children}</div>
    </section>
  );
}
