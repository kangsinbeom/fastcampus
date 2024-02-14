import Head from 'next/head';
import SEO from './SEO';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SEO title="Myaccount" description="내 자산관리를 보다 쉽게" image="" />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {children}
    </div>
  );
};

export default Layout;
