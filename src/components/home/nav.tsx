import { NavLinks } from '#/components/home/nav-links';
import { NavPrompt } from '#/components/home/nav-prompt';

interface NavProps {
  handle: string;
  host: string;
  onNavigate: (id: string) => void;
}

export function Nav({ handle, host, onNavigate }: NavProps) {
  return (
    <nav className="nav">
      <div className="nav__inner">
        <NavPrompt handle={handle} host={host} />
        <NavLinks onNavigate={onNavigate} />
      </div>
    </nav>
  );
}
