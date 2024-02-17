import Head from 'next/head';
import SEO from './SEO';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <title>MyAccount</title>
      <meta name="description" content="내 자산을 편하게" />
      <meta name="viewport" content="width=device-width, inital-scale=1" />

      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {children}
    </div>
  );
};

export default Layout;
