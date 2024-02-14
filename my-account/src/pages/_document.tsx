import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="root-portal" />
      </body>
    </Html>
  );
}

// 서버사이드에서 랜더링되는 곳으로 기본 html에 했던 것을 모두 여기다가 하면 됨
