import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon } from 'react-feather';
import Container from 'components/container';
import { useTheme } from 'contexts/theme';
import logo from 'public/logo/logo.png';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="py-6">
      <Container>
        <nav className="flex justify-between">
          <Link
            href="/"
            className="no-underline"
          >
            <div className="flex space-x-3 items-center">
              <Image src={logo} alt="Logo" width={36} />
              <span className="font-title font-semibold">Son Nguyen</span>
            </div>
          </Link>

          <div className="flex space-x-4 items-center">
            <Link
              href="/projects"
              className="no-underline opacity-50 hover:opacity-100"
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className="no-underline opacity-50 hover:opacity-100"
            >
              Blog
            </Link>
            <button
              className="w-10 h-10 flex justify-center items-center rounded transition-colors hover:bg-rosePineDawn-highlightLow dark:hover:bg-rosePine-highlightHigh"
              onClick={toggleTheme}
            >
              <AnimatePresence mode="wait">
                {theme === 'light' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    key="light-theme"
                    className="flex justify-center items-center"
                  >
                    <Sun size={16} />
                  </motion.div>
                )}
                {theme === 'dark' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    key="dark-theme"
                    className="flex justify-center items-center"
                  >
                    <Moon size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </Container>
    </header>
  );
}
