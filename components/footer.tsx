import { GitHub, Linkedin, Twitter, Mail } from 'react-feather';
import Container from 'components/container';

export default function Footer() {
  return (
    <footer className="py-4">
      <Container>
        <div className="flex flex-col items-center gap-y-4 lg:flex-row lg:justify-between">
          <div className="flex gap-x-4 lg:order-2">
            <a target="_blank" rel="noreferrer" href="https://github.com/thanhsonng" aria-label="thanhsonng on GitHub">
              <GitHub size={16} />
            </a>
            <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/thanhsonng/" aria-label="thanhsonng on Twitter">
              <Linkedin size={16} />
            </a>
            <a target="_blank" rel="noreferrer" href="https://twitter.com/thanhsonng211" aria-label="thanhsonng211 on LinkedIn">
              <Twitter size={16} />
            </a>
            <a target="_blank" rel="noreferrer" href="mailto:son@sonng.dev" aria-label="Email me at son@sonng.dev">
              <Mail size={16} />
            </a>
          </div>

          <small className="lg:order-1">{`${new Date().getFullYear()} © Son Nguyen`}</small>
        </div>
      </Container>
    </footer>
  );
}
