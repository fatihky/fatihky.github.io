interface NavPromptProps {
  handle: string;
  host: string;
}

export function NavPrompt({ handle, host }: NavPromptProps) {
  return (
    <a className="nav__prompt" href="/">
      {handle}@{host}:~$
    </a>
  );
}
