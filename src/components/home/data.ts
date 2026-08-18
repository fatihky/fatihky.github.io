/* ============================================================
   PERSONAL SITE TEMPLATE — "PHOSPHOR" THEME
   Edit the DATA block below with your own info — layout and
   behavior should not need to change.
   ============================================================ */

// ---------- DATA (edit this) ----------
export const DATA = {
  name: 'Fatih Kaya',
  handle: 'fatihky',
  host: 'ag.fth',
  role: 'Tam-Donanımlı Yazılım Geliştirici',
  tagline:
    'Yaşam, yazılım geliştirme, yapay zeka vb konular üzerine düşüncelerim.',
  location: 'UTC+3',
  about: [
    "Ten years writing software that stays up at 3am so I don't have to.",
    'Currently focused on distributed consensus, developer tooling, and',
    'making systems boring in the ways that matter.',
    '',
    "Previously: databases at scale, a payments outage I'd rather not",
    'discuss, and a brief, regrettable period writing PHP for money.',
  ],
  links: {
    email: null,
    github: 'github.com/fatihky',
    linkedin: 'linkedin.com/in/fatihky',
    resume: null,
  },
  projects: [
    {
      id: '01',
      name: 'purehtml',
      desc: 'YAML configured HTML parser library built for easy and powerful parser configurations.',
      stack: ['HTML', 'TypeScript'],
      link: 'https://github.com/purescraps/purehtml',
    },
  ],
  experience: [
    {
      hash: 'a3f9c1e',
      date: '2024—present',
      role: 'Staff Engineer',
      org: 'Northwind Systems',
      note: 'Leading the consensus & storage team. Fewer 3am pages, on purpose.',
    },
    {
      hash: '7d2b804',
      date: '2021—2024',
      role: 'Senior Software Engineer',
      org: 'Fenwick Data',
      note: 'Rebuilt the ingestion pipeline. Reduced latency p99 from 4s to 80ms.',
    },
    {
      hash: '1e56f3a',
      date: '2018—2021',
      role: 'Software Engineer',
      org: 'Hollow Point Analytics',
      note: 'First on-call rotation. First outage. First lesson in idempotency.',
    },
    {
      hash: '0000001',
      date: '2016—2018',
      role: 'Junior Developer',
      org: 'Merrick Web Co.',
      note: "Wrote the aforementioned PHP. We don't talk about it.",
    },
  ],
  skills: {
    languages: ['Rust', 'Go', 'TypeScript', 'Python', 'SQL'],
    infra: ['Kubernetes', 'Terraform', 'Postgres', 'Kafka', 'Redis'],
    practices: [
      'Distributed systems',
      'API design',
      'Observability',
      'Incident response',
    ],
  },
};

// ---------- BOOT SEQUENCE LINES ----------
export const BOOT_LINES = [
  { text: 'BIOS v2.14.0 — PHOSPHOR TERMINAL', delay: 60 },
  { text: 'Initializing display subsystem ......... OK', delay: 220 },
  { text: 'Checking memory ......................... 640K OK', delay: 260 },
  {
    text: 'Mounting /home/' + DATA.handle + ' ...................... OK',
    delay: 240,
  },
  {
    text: 'Loading modules: [about] [projects] [posts] [log] [skills]',
    delay: 300,
  },
  { text: 'Establishing connection .................. done', delay: 260 },
  { text: 'Starting session as ' + DATA.handle + '@' + DATA.host, delay: 200 },
  { text: '', delay: 120 },
];

// ---------- TERMINAL COMMAND HANDLER ----------
export function buildTerminalCommands(
  scrollTo: (id: string) => void,
  navigateTo: (path: string) => void,
): Record<string, () => string[]> {
  return {
    help: () => [
      'available commands:',
      '  help        show this list',
      '  projects    open projects page',
      '  posts       jump to posts',
      '  contact     jump to contact',
      '  whoami      who is this, anyway',
      '  clear       clear this terminal',
    ],
    whoami: () => [DATA.handle + '@' + DATA.host + ' — ' + DATA.role],
    // /about (and the log/skills sections it hosts) is temporarily
    // deprecated, will be re-enabled later.
    // about: () => {
    //   navigateTo('/about');
    //   return ['→ opening about page'];
    // },
    projects: () => {
      navigateTo('/projects');
      return ['→ opening projects page'];
    },
    posts: () => {
      scrollTo('posts');
      return ['→ jumping to posts'];
    },
    // log: () => {
    //   navigateTo('/about#log');
    //   return ['→ opening experience log'];
    // },
    // skills: () => {
    //   navigateTo('/about#skills');
    //   return ['→ opening skills'];
    // },
    contact: () => {
      scrollTo('contact');
      return ['→ jumping to contact'];
    },
    sudo: () => ['Nice try. This incident will be reported to nobody.'],
    'make coffee': () => ['☕ brewing... coffee is not a supported peripheral'],
    ls: () => [
      'about.txt  projects/  posts/  experience.log  skills.cfg  contact.sh',
    ],
    exit: () => ['cannot exit a static site. try closing the tab.'],
  };
}
