import { DATA } from './data';

interface FooterProps {
  handle: string;
  host: string;
}

export function Footer({ handle, host }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span>
          {handle}@{host} — kişisel notlarım.
        </span>
        <a
          className="footer__github"
          href={`https://${DATA.links.github}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {DATA.links.github}
        </a>
      </div>
    </footer>
  );
}
