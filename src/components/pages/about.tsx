import { useNavigate } from '@tanstack/react-router';
import { type SubmitEvent, useCallback, useEffect, useState } from 'react';
import { AboutSection } from '#/components/home/about-section';
import { BootScreen } from '#/components/home/boot-screen';
import {
  BOOT_LINES,
  buildTerminalCommands,
  DATA,
} from '#/components/home/data';
import { Footer } from '#/components/home/footer';
import { LogSection } from '#/components/home/log-section';
import { Nav } from '#/components/home/nav';
import { PhosphorStyles } from '#/components/home/phosphor-styles';
import { SkillsSection } from '#/components/home/skills-section';
import { ContactSection } from '../home/contact-section';
import { MiniTerminal, type TermLine } from '../home/mini-terminal';

export default function AboutPage() {
  const [booted, setBooted] = useState(false);
  const [bootVisibleLines, setBootVisibleLines] = useState(0);
  const navigate = useNavigate();
  const [skip, setSkip] = useState(false);
  const navigateTo = useCallback(
    (path: string) => {
      const [to, hash] = path.split('#');
      navigate({ to, hash });
    },
    [navigate],
  );
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // mini terminal state
  const [termHistory, setTermHistory] = useState<TermLine[]>([
    { type: 'out', text: "type 'help' for a list of commands" },
  ]);
  const [termInput, setTermInput] = useState('');
  const commands = buildTerminalCommands(scrollTo, navigateTo);

  function runCommand(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    const lower = cmd.toLowerCase();
    let outLines: string[];
    if (lower === 'clear') {
      setTermHistory([]);
      return;
    }
    if (commands[lower]) {
      outLines = commands[lower]();
    } else {
      outLines = [`${lower}: command not found. try 'help'`];
    }
    setTermHistory((h) => [
      ...h,
      { type: 'in', text: cmd },
      ...outLines.map((l) => ({ type: 'out' as const, text: l })),
    ]);
  }

  function handleTermSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    runCommand(termInput);
    setTermInput('');
  }

  // boot sequence
  useEffect(() => {
    if (skip) {
      setBootVisibleLines(BOOT_LINES.length);
      const t = setTimeout(() => setBooted(true), 150);
      return () => clearTimeout(t);
    }
    if (bootVisibleLines >= BOOT_LINES.length) {
      const t = setTimeout(() => setBooted(true), 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setBootVisibleLines((n) => n + 1);
    }, BOOT_LINES[bootVisibleLines].delay);
    return () => clearTimeout(t);
  }, [bootVisibleLines, skip]);

  return (
    <div className="phosphor-root">
      <PhosphorStyles />

      <div className="crt-overlay" aria-hidden="true" />
      <div className="crt-vignette" aria-hidden="true" />
      <div className="crt-flicker" aria-hidden="true" />

      {!booted && (
        <BootScreen
          lines={BOOT_LINES}
          visibleCount={bootVisibleLines}
          onSkip={() => setSkip(true)}
        />
      )}

      {booted && (
        <>
          <Nav handle={DATA.handle} host={DATA.host} onNavigate={scrollTo} />

          <main className="container">
            <AboutSection lines={DATA.about} />

            <LogSection entries={DATA.experience} />

            <SkillsSection skills={DATA.skills} />

            <MiniTerminal
              handle={DATA.handle}
              host={DATA.host}
              history={termHistory}
              input={termInput}
              onInputChange={setTermInput}
              onSubmit={handleTermSubmit}
            />

            <ContactSection />
          </main>

          <Footer handle={DATA.handle} host={DATA.host} />
        </>
      )}
    </div>
  );
}
