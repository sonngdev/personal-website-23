import { useTheme } from 'contexts/theme';
import Link from 'next/link';
import Container from '../components/container';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="py-6">
      <Container>
        <nav className="flex space-x-4">
          <Link href="/">About</Link>
          <Link href="/posts">Posts</Link>
        </nav>
        <button onClick={toggleTheme}>{theme}</button>
      </Container>
    </header>
  );
}
