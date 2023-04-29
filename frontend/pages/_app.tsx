import '@/styles/globals.css'
import Head from "next/head";
import type { AppProps } from 'next/app';
import { Provider, createStore } from 'jotai';

//react-query
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

//compontents
import Layout from '@/components/Layout/Layout';

//react query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {

  const myStore = createStore();

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="description" content="E-commerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Provider store={myStore}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  )
}
