interface HeroProps {
  name: string;
  role: string;
  location: string;
  taglineOut: string;
}

export function Hero({ name, role, location, taglineOut }: HeroProps) {
  return (
    <header className="container hero">
      <div className="hero__prompt">$ whoami</div>
      <div className="flex justify-between">
        <h1 className="hero__name">{name}</h1>
        <div className="hero__role">
          <span>{role}</span>
          <span>-</span>
          <span>{location}</span>
        </div>
      </div>
      <div className="hero__tagline">
        {taglineOut}
        <span className="cursor" aria-hidden="true" />
      </div>
    </header>
  );
}
