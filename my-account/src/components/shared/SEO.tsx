import Head from 'next/head';
interface SEOProps {
  title: string;
  description: string;
  image: string;
}

const SEO = ({ title, description, image }: SEOProps) => {
  return (
    <Head>
      <title>LoveTrip</title>
    </Head>
  );
};

export default SEO;
