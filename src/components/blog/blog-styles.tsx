export function BlogStyles() {
  return (
    <style>{`
        /* MDX post body — phosphor flavored */
        .post-body {
          font-size: 14.5px;
          line-height: 1.75;
          max-width: 74ch;
        }
        .post-body > *:first-child { margin-top: 0; }
        .post-body h2 {
          color: var(--color-fg-bright);
          font-size: 16px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin: 2.2em 0 0.8em;
          padding-bottom: 6px;
          border-bottom: 1px dashed var(--color-fg-faint);
        }
        .post-body h3 {
          color: var(--color-fg-bright);
          font-size: 14.5px;
          margin: 1.8em 0 0.6em;
        }
        .post-body p { margin: 0 0 1.1em; }
        .post-body ul, .post-body ol { margin: 0 0 1.1em; padding-left: 1.4em; }
        .post-body li { margin-bottom: 0.4em; }
        .post-body li::marker { color: var(--color-fg-dim); }
        .post-body a {
          color: var(--color-fg-bright);
          text-decoration: underline;
          text-decoration-color: var(--color-fg-faint);
          text-underline-offset: 3px;
        }
        .post-body a:hover, .post-body a:focus-visible {
          color: var(--color-amber);
          outline: none;
        }
        .post-body code {
          font-family: inherit;
          font-size: 0.92em;
          color: var(--color-amber);
          background: var(--color-bg-raised);
          border: 1px solid var(--color-border);
          border-radius: 4px;
          padding: 1px 5px;
        }
        .post-body pre {
          background: var(--color-bg-sunken);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          padding: 16px 18px;
          overflow-x: auto;
          margin: 0 0 1.3em;
          font-size: 13px;
          line-height: 1.6;
        }
        .post-body pre code {
          background: transparent;
          border: none;
          padding: 0;
        }
        /* shiki dual-theme tokens: light themes use light vars, dark use dark */
        .post-body pre code span { color: var(--shiki-light); }
        html[data-theme='phosphor'] .post-body pre code span,
        html[data-theme='imperial'] .post-body pre code span,
        html[data-theme='turquoise'] .post-body pre code span {
          color: var(--shiki-dark);
        }
        .post-body blockquote {
          margin: 0 0 1.1em;
          padding: 4px 0 4px 16px;
          border-left: 2px solid var(--color-fg-dim);
          color: var(--color-fg-dim);
        }
        .post-body hr {
          border: none;
          border-top: 1px dashed var(--color-fg-faint);
          margin: 2em 0;
        }
        .post-body strong { color: var(--color-fg-bright); }

        /* POST PAGE HEADER */
        .post-header {
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 18px;
          margin-bottom: 30px;
        }
        .post-header__top {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 8px;
          font-size: 12.5px;
        }
        .post-header__date { color: var(--color-fg-faint); }
        .post-header__path { color: var(--color-fg-dim); }
        .post-header__title {
          color: var(--color-fg-bright);
          font-size: 22px;
          font-weight: 700;
          line-height: 1.35;
          margin: 0 0 10px;
        }
        .post-header__desc { color: var(--color-fg-dim); font-size: 13.5px; }
        .post-header__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 12px;
        }
        .post-back {
          display: inline-block;
          margin-top: 40px;
          color: var(--color-fg-dim);
          font-size: 13px;
          text-decoration: none;
        }
        .post-back:hover, .post-back:focus-visible { color: var(--color-amber); outline: none; }
        .post-missing {
          background: var(--color-bg-raised);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          padding: 20px 22px;
          font-size: 14px;
        }
    `}</style>
  );
}
