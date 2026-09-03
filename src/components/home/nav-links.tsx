import { Link } from '@tanstack/react-router';

interface NavItem {
  id: string;
  label: string;
  href?: string;
}

interface NavLinksProps {
  onNavigate: (id: string) => void;
}

const navItems: NavItem[] = [
  { id: 'posts', label: 'posts', href: '/posts' },
  { id: 'jottings', label: 'jottings', href: '/jottings' },
  { id: 'links', label: 'links', href: '/links' },
  { id: 'projects', label: 'projects', href: '/projects' },
  // /about is temporarily deprecated, will be re-enabled later.
  // { id: 'about', label: 'about', href: '/about' },
];

export function NavLinks({ onNavigate }: NavLinksProps) {
  return (
    <div className="nav__links">
      {navItems.map((n) =>
        n.href ? (
          <Link key={n.id} to={n.href}>
            {n.label}
          </Link>
        ) : (
          <a
            key={n.id}
            href={'#' + n.id}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(n.id);
            }}
          >
            {n.label}
          </a>
        ),
      )}
    </div>
  );
}
