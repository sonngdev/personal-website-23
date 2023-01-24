import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'react-feather';
import Container from 'components/container';
import { useTheme } from 'contexts/theme';

export default function Header() {
  const { displayTheme, switchTheme } = useTheme();
  const router = useRouter();

  return (
    <header className="py-3 sticky top-0 bg-light dark:bg-dark transition-colors z-50">
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
              className={`no-underline ${router.pathname.startsWith('/projects') ? 'opacity-100' : 'opacity-50 hover:opacity-100 transition-opacity'}`}
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className={`no-underline ${router.pathname.startsWith('/blog') ? 'opacity-100' : 'opacity-50 hover:opacity-100 transition-opacity'}`}
            >
              Blog
            </Link>
            <button
              className="w-10 h-10 flex justify-center items-center rounded transition-colors hover:bg-dark/10 dark:hover:bg-light/10"
              onClick={switchTheme}
              aria-label="Switch theme"
            >
              <AnimatePresence mode="wait">
                {displayTheme === 'light' && (
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
                {displayTheme === 'dark' && (
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
                {displayTheme === 'system' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    key="dark-theme"
                    className="flex justify-center items-center"
                  >
                    <Monitor size={16} />
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
