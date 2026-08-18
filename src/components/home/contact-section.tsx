import { DATA } from './data';
import { Section } from './section';

interface ContactLinks {
  email: string | null;
  github: string;
  linkedin: string;
  resume: string | null;
}

const links: ContactLinks = DATA.links;

export function ContactSection() {
  return (
    <Section id="contact" index="02" label="contact.sh">
      <div className="contact-grid">
        {links.email && (
          <div className="contact-row">
            <span className="contact-row__key">email</span>
            <a
              href={`mailto:${links.email}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {links.email}
            </a>
          </div>
        )}
        <div className="contact-row">
          <span className="contact-row__key">github</span>
          <a
            href={`https://${links.github}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {links.github}
          </a>
        </div>
        <div className="contact-row">
          <span className="contact-row__key">linkedin</span>
          <a
            href={`https://${links.linkedin}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {links.linkedin}
          </a>
        </div>
        {links.resume && (
          <div className="contact-row">
            <span className="contact-row__key">resume</span>
            <a href={links.resume} rel="noopener noreferrer" target="_blank">
              download.pdf
            </a>
          </div>
        )}
      </div>
    </Section>
  );
}
