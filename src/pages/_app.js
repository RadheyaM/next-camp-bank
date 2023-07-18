import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchInterval: 1000 * 3,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
