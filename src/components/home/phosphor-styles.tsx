export function PhosphorStyles() {
  return (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&display=swap');

        .phosphor-root {
          font-family: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;
          background: var(--color-bg);
          color: var(--color-fg);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          line-height: 1.6;
        }

        .phosphor-root * { box-sizing: border-box; }

        /* CRT overlay */
        .crt-overlay {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 50;
          background:
            repeating-linear-gradient(
              to bottom,
              rgba(0,0,0,var(--overlay-scanline)) 0px,
              rgba(0,0,0,var(--overlay-scanline)) 1px,
              transparent 1px,
              transparent 3px
            );
          mix-blend-mode: multiply;
          opacity: 0.55;
        }
        .crt-vignette {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 51;
          background: radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,var(--overlay-vignette)) 100%);
        }
        .crt-flicker {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 49;
          background: color-mix(in srgb, var(--color-fg) var(--overlay-flicker), transparent);
          animation: flicker 6s infinite;
        }
        @keyframes flicker {
          0%, 96%, 100% { opacity: 1; }
          97% { opacity: 0.85; }
          98% { opacity: 1; }
          99% { opacity: 0.9; }
        }

        @media (prefers-reduced-motion: reduce) {
          .crt-flicker { animation: none; }
        }

        /* BOOT SCREEN */
        .boot-screen {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: var(--color-bg);
          color: var(--color-fg);
          padding: 6vh 6vw;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .boot-line { opacity: 0; animation: bootIn 0.15s forwards; white-space: pre; }
        @keyframes bootIn { to { opacity: 1; } }
        .boot-skip {
          margin-top: auto;
          align-self: flex-start;
          background: transparent;
          border: 1px solid var(--color-fg-dim);
          border-radius: 6px;
          color: var(--color-fg-dim);
          font-family: inherit;
          font-size: 12px;
          padding: 6px 12px;
          cursor: pointer;
          letter-spacing: 0.05em;
        }
        .boot-skip:hover { color: var(--color-fg); border-color: var(--color-fg); }

        /* NAV */
        .nav {
          position: sticky;
          top: 0;
          z-index: 40;
          background: color-mix(in srgb, var(--color-bg) 92%, transparent);
          border-bottom: 1px solid var(--color-border);
          backdrop-filter: blur(2px);
        }
        .nav__inner {
          max-width: 880px;
          margin: 0 auto;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          font-size: 13px;
          flex-wrap: wrap;
        }
        .nav__prompt { color: var(--color-fg-bright); white-space: nowrap; }
        .nav__links { display: flex; gap: 16px; flex-wrap: wrap; }
        .nav__links a {
          color: var(--color-fg-dim);
          text-decoration: none;
          position: relative;
        }
        .nav__links a:hover, .nav__links a:focus-visible {
          color: var(--color-fg-bright);
          outline: none;
        }
        .nav__links a::before { content: "./"; color: var(--color-fg-faint); }

        /* LAYOUT */
        .container { max-width: 880px; margin: 0 auto; }

        /* HERO */
        .hero {
          padding: 5vh 0;
          border-bottom: 1px solid var(--color-border);
        }
        .hero__prompt {
          color: var(--color-fg-dim);
          font-size: 14px;
          margin-bottom: 10px;
        }
        .hero__name {
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 700;
          color: var(--color-fg-bright);
          letter-spacing: 0.02em;
          margin: 0 0 6px;
        }
        .hero__role {
          font-size: 15px;
          color: var(--color-fg);
          margin-bottom: 22px;
          display: flex;
        }
        .hero__tagline {
          font-size: 15px;
          color: var(--color-fg-dim);
          min-height: 24px;
        }
        .cursor {
          display: inline-block;
          width: 9px;
          height: 16px;
          background: var(--color-fg);
          margin-left: 2px;
          vertical-align: middle;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink { 0%, 50% { opacity: 1; } 50.01%, 100% { opacity: 0; } }

        /* SECTIONS */
        .section {
          padding: 8vh 0;
          border-bottom: 1px solid var(--color-border);
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .section--visible { opacity: 1; transform: translateY(0); }
        .section:last-of-type { border-bottom: none; }
        .section__head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 22px;
        }
        .section__index { color: var(--color-fg-faint); font-size: 13px; }
        .section__label {
          color: var(--color-fg-bright);
          font-size: 13px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .section__rule {
          flex: 1;
          height: 1px;
          background: repeating-linear-gradient(
            to right, var(--color-fg-faint) 0, var(--color-fg-faint) 4px, transparent 4px, transparent 8px
          );
        }

        /* ABOUT */
        .about-block {
          background: var(--color-bg-raised);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          padding: 20px 22px;
          font-size: 14px;
          color: var(--color-fg);
          white-space: pre-wrap;
        }
        .about-block__filename {
          color: var(--color-fg-dim);
          font-size: 12px;
          margin-bottom: 12px;
          display: block;
        }

        /* PROJECTS */
        .project-list { display: flex; flex-direction: column; gap: 1px; }
        .project {
          background: var(--color-bg-raised);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          padding: 16px 18px;
          margin-bottom: 12px;
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .project:hover, .project:focus-within {
          border-color: var(--color-fg);
          background: var(--color-bg-hover);
        }
        .project__top {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }
        .project__id { color: var(--color-fg-faint); font-size: 13px; }
        .project__name { color: var(--color-fg-bright); font-size: 15px; font-weight: 700; }
        .project__link {
          margin-left: auto;
          color: var(--color-fg-dim);
          font-size: 13px;
          text-decoration: none;
        }
        .project__link:hover, .project__link:focus-visible { color: var(--color-amber); outline: none; }
        .project__desc { font-size: 13.5px; color: var(--color-fg); opacity: 0.9; margin-bottom: 10px; }
        .project__stack { display: flex; gap: 8px; flex-wrap: wrap; }
        .tag {
          font-size: 11px;
          color: var(--color-fg-dim);
          border: 1px solid var(--color-fg-faint);
          border-radius: 4px;
          padding: 2px 8px;
          letter-spacing: 0.04em;
        }

        /* POSTS */
        .post-list { display: flex; flex-direction: column; gap: 1px; }
        .post {
          background: var(--color-bg-raised);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          padding: 16px 18px;
          margin-bottom: 12px;
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .post:hover, .post:focus-within {
          border-color: var(--color-fg);
          background: var(--color-bg-hover);
        }
        .post__top {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 6px;
        }
        .post__date { color: var(--color-fg-faint); font-size: 12.5px; }
        .post__link {
          margin-left: auto;
          color: var(--color-fg-dim);
          font-size: 13px;
          text-decoration: none;
        }
        .post__link:hover, .post__link:focus-visible { color: var(--color-amber); outline: none; }
        .post__title {
          display: block;
          color: var(--color-fg-bright);
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 6px;
          text-decoration: none;
        }
        .post__title:hover, .post__title:focus-visible { color: var(--color-amber); outline: none; }
        .post__excerpt { font-size: 13.5px; color: var(--color-fg); opacity: 0.9; }
        .post__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
        }
        .tag {
          display: inline-block;
          color: var(--color-fg-dim);
          font-size: 11.5px;
          border: 1px solid var(--color-border);
          border-radius: 4px;
          padding: 1px 7px;
          letter-spacing: 0.03em;
          text-decoration: none;
        }
        a.tag:hover, a.tag:focus-visible {
          color: var(--color-fg-bright);
          border-color: var(--color-fg-dim);
          outline: none;
        }
        .post-filter {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 14px;
        }
        .post-filter__label { color: var(--color-fg-bright); font-size: 13px; }
        .post-filter__clear {
          color: var(--color-fg-faint);
          font-size: 12px;
          text-decoration: none;
        }
        .post-filter__clear:hover, .post-filter__clear:focus-visible {
          color: var(--color-amber);
          outline: none;
        }

        /* LOG (experience) */
        .log-entry {
          display: grid;
          grid-template-columns: 90px 1px 1fr;
          gap: 16px;
          padding: 14px 0;
        }
        .log-entry__hash { color: var(--color-fg-faint); font-size: 12.5px; }
        .log-entry__bar { background: var(--color-border); }
        .log-entry__date { color: var(--color-fg-dim); font-size: 12px; margin-bottom: 3px; }
        .log-entry__role { color: var(--color-fg-bright); font-size: 14.5px; font-weight: 700; }
        .log-entry__org { color: var(--color-fg); font-size: 13px; margin-bottom: 6px; }
        .log-entry__note { color: var(--color-fg-dim); font-size: 13px; }

        /* SKILLS */
        .skills-cfg {
          background: var(--color-bg-raised);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          padding: 20px 22px;
          font-size: 13.5px;
        }
        .skills-cfg__row { margin-bottom: 10px; }
        .skills-cfg__key { color: var(--color-amber); }
        .skills-cfg__val { color: var(--color-fg); }
        .skills-cfg__val .comma { color: var(--color-fg-faint); }

        /* CONTACT */
        .contact-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 14px;
        }
        .contact-row { display: flex; gap: 10px; }
        .contact-row__key { color: var(--color-fg-dim); width: 90px; flex-shrink: 0; }
        .contact-row a { color: var(--color-fg-bright); text-decoration: none; }
        .contact-row a:hover, .contact-row a:focus-visible { color: var(--color-amber); outline: none; text-decoration: underline; }

        /* MINI TERMINAL */
        .mini-term {
          background: var(--color-bg-sunken);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          overflow: hidden;
          font-size: 13px;
          max-width: 640px;
        }
        .mini-term__bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border-bottom: 1px solid var(--color-border);
          color: var(--color-fg-faint);
        }
        .dot { width: 9px; height: 9px; border-radius: 50%; background: var(--color-fg-faint); }
        .mini-term__title { margin-left: 8px; font-size: 11px; }
        .mini-term__body {
          padding: 14px 14px 6px;
          max-height: 220px;
          overflow-y: auto;
        }
        .mini-term__line { margin-bottom: 4px; white-space: pre-wrap; word-break: break-word; }
        .mini-term__line--in::before { content: "$ "; color: var(--color-fg-dim); }
        .mini-term__line--out { color: var(--color-fg-dim); }
        .mini-term form {
          display: flex;
          align-items: center;
          padding: 8px 14px 14px;
          gap: 8px;
        }
        .mini-term form span { color: var(--color-fg-dim); }
        .mini-term input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--color-fg);
          font-family: inherit;
          font-size: 13px;
          caret-color: var(--color-fg);
        }

        /* FOOTER */
        .footer {
          padding: 30px 0 60px;
          font-size: 12px;
          color: var(--color-fg-faint);
          text-align: center;
        }
        .footer__inner {
          max-width: 880px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          text-align: left;
        }
        .footer__github {
          color: var(--color-fg-dim);
          text-decoration: none;
        }
        .footer__github:hover, .footer__github:focus-visible {
          color: var(--color-amber);
          outline: none;
          text-decoration: underline;
        }

        /* FOCUS VISIBILITY */
        a:focus-visible, button:focus-visible, input:focus-visible {
          outline: 1px dashed var(--color-fg-bright);
          outline-offset: 2px;
        }

        /* RESPONSIVE */
        @media (max-width: 640px) {
          .nav__inner { font-size: 12px; gap: 12px; }
          .log-entry { grid-template-columns: 70px 1px 1fr; gap: 10px; }
          .hero { padding: 12vh 0 8vh; }
        }
      `}</style>
  );
}
