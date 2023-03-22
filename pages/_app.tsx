import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'antd/dist/reset.css';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ConfigProvider } from 'antd';
import NextNProgress from 'nextjs-progressbar';

import useAuth from '../hook/useAuth';
import { CommonDataProvider } from '../context/commonData';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const { authorized } = useAuth();
  return (
    <>
      <NextNProgress color={'#198ffe'} height={3} />
      <QueryClientProvider client={queryClient}>
        <CommonDataProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#198ffe',
                // colorFillSecondary: themeColors.backgroundColor,
              },
            }}
          >
            {authorized && <Component {...pageProps} />}
          </ConfigProvider>
        </CommonDataProvider>
      </QueryClientProvider>
    </>
  );
}
