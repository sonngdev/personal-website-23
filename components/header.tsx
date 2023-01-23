import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon } from 'react-feather';
import Container from 'components/container';
import { useTheme } from 'contexts/theme';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="py-6 sticky top-0 bg-light/30 dark:bg-dark/30 backdrop-blur-md transition-colors">
      <Container>
        <nav className="flex justify-between items-center">
          <Link
            href="/"
            className="no-underline font-title font-semibold"
          >
            Son Nguyen
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
              className="w-10 h-10 flex justify-center items-center rounded transition-colors hover:bg-dark/10 dark:hover:bg-light/10"
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
