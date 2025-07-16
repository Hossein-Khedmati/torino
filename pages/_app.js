import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "@/Context/AuthContext";
import { LoginModalProvider, useLoginModal } from "@/Context/LoginModalContext";

import { QueryClient, QueryClientProvider, hydrate } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import LoginModal from "@/components/Auth/LoginModal";
import RouteLoader from "@/components/RouteLoader/RouteProgress";

// InnerApp برای استفاده از context و گوش دادن به event
function InnerApp({ Component, pageProps }) {
  const { showLogin, openLoginModal, closeLoginModal } = useLoginModal();

  useEffect(() => {
    const handler = () => {
      openLoginModal();
    };

    window.addEventListener("unauthorized", handler);
    return () => window.removeEventListener("unauthorized", handler);
  }, []);

  return (
    <>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer position="top-right" rtl autoClose={3000} />
      </Layout>
      <LoginModal isOpen={showLogin} onClose={closeLoginModal} />
    </>
  );
}

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <hydrate state={pageProps.dehydratedState}>
        <AuthProvider>
          <LoginModalProvider>
            <RouteLoader />
            <InnerApp Component={Component} pageProps={pageProps} />
          </LoginModalProvider>
        </AuthProvider>
      </hydrate>
    </QueryClientProvider>
  );
}
