import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import globalStyles from '@styles/globalStyles';
import Layout from '@shared/Layout';
import { SessionProvider } from 'next-auth/react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import Navbar from '@/components/shared/Navbar';
import { AlertContextProvider } from '@/contexts/AlertContext';

const client = new QueryClient({});
console.log('_app');
export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <SessionProvider session={session}>
        <QueryClientProvider client={client}>
          <Hydrate state={dehydratedState}>
            <AlertContextProvider>
              <Navbar />
              <Component {...pageProps} />
            </AlertContextProvider>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  );
}

// 모든 페이지들이 공통적으로 적용되는 레이아웃
