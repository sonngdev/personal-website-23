import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="robots" content="follow, index" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </Head>
      <body className="bg-rosePineDawn-surface text-rosePine-base dark:bg-rosePine-base dark:text-rosePine-text transition-colors antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
