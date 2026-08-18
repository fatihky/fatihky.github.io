import type { SubmitEvent } from 'react';
import { Section } from './section';

export interface TermLine {
  type: 'in' | 'out';
  text: string;
}

interface MiniTerminalProps {
  handle: string;
  host: string;
  history: TermLine[];
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
}

export function MiniTerminal({
  handle,
  host,
  history,
  input,
  onInputChange,
  onSubmit,
}: MiniTerminalProps) {
  return (
    <Section id="try-it" index="04" label="terminal">
      <div className="mini-term">
        <div className="mini-term__bar">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="mini-term__title">
            {handle}@{host}: ~
          </span>
        </div>
        <div className="mini-term__body">
          {history.map((line, i) => (
            <div
              className={`mini-term__line mini-term__line--${line.type}`}
              key={i}
            >
              {line.text}
            </div>
          ))}
        </div>
        <form onSubmit={onSubmit}>
          <span>$</span>
          <input
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="type 'help'"
            aria-label="terminal command input"
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </Section>
  );
}
