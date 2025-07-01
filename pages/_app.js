import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/Context/AuthContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { hydrate } from "@tanstack/react-query";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <hydrate state={pageProps.dehydratedState}>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer position="top-right" rtl autoClose={3000} />
          </Layout>
        </AuthProvider>
      </hydrate>
    </QueryClientProvider>
  );
}
