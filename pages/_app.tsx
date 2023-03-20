import 'styles/globals.css';
import 'styles/rose-pine/prism-rose-pine-main.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from 'components/header';
import Footer from 'components/footer';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from 'contexts/theme';


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

        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="manifest" href="/favicon/site.webmanifest" />

        <title>Son Nguyen • Dev</title>
      </Head>

      <ThemeProvider>
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="py-14 flex-1">
            <Component {...pageProps} />
          </main>

          <Footer />
        </div>
      </ThemeProvider>
    </Auth0Provider>
  );
}
