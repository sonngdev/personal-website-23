import { GitHub, Linkedin, Twitter, Mail } from 'react-feather';
import Container from 'components/container';

export default function Footer() {
  return (
    <footer className="py-6">
      <Container>
        <div className="flex flex-col items-center gap-y-4 lg:flex-row lg:justify-between">
          <div className="flex gap-x-4 lg:order-2">
            <a href="https://github.com/thanhsonng" target="_blank" rel="noreferrer">
              <GitHub size={16} />
            </a>
            <a href="https://www.linkedin.com/in/thanhsonng/" target="_blank" rel="noreferrer">
              <Linkedin size={16} />
            </a>
            <a href="https://twitter.com/thanhsonng211" target="_blank" rel="noreferrer">
              <Twitter size={16} />
            </a>
            <a href="mailto:son@sonng.dev" target="_blank" rel="noreferrer">
              <Mail size={16} />
            </a>
          </div>

          <small className="lg:order-1">{`${new Date().getFullYear()} © Son Nguyen`}</small>
        </div>
      </Container>
    </footer>
  );
}
