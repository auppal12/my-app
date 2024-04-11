import 'bootswatch/dist/zephyr/bootstrap.min.css';
import "@/styles/globals.css";
import { SWRConfig } from 'swr';
import Layout from '@/components/Layout';
import '@/styles/globals.css';
import RouteGuard from '@/components/RouteGuard';
import { getToken } from '@/lib/authenticate';

export default function App({ Component, pageProps }) {

  // const fetcher = async (url) => {
  //   const res = await fetch(url);

  //   if (!res.ok) {
  //     const error = new Error('An error occurred while fetching the data.');
  //     error.info = await res.json();
  //     error.status = res.status;
  //     throw error;
  //   }
  //   return res.json();
  // };

  const fetcher = (url) => fetch(url, { headers: { Authorization: `JWT ${getToken()}` } }).then((res) => res.json());

  return (
    <>
      <RouteGuard>

        <SWRConfig value={{ fetcher }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </RouteGuard>

    </>
  );
}
