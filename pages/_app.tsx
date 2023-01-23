import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../components/header';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from 'contexts/theme';

import 'prism-themes/rose-pine/prism-rose-pine-moon.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Clone and deploy your own Next.js portfolio in minutes."
        />
        <title>My awesome blog</title>
        {/**
         * Using dangerouslySetInnerHTML so that quotes inside JS code
         * are not escaped.
         * @see https://github.com/vercel/next.js/issues/2006
         */}
        <script dangerouslySetInnerHTML={{ __html: `
          let currentTheme = localStorage.getItem('theme');
          if (currentTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else if (currentTheme === 'light') {
            document.documentElement.classList.remove('dark');
          } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
          } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
          }
        `}} />
      </Head>

      <ThemeProvider>
        <Header />

        <main className="py-14">
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </Auth0Provider>
  );
}
