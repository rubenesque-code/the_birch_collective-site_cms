import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Slide, ToastContainer } from "react-toastify";

import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import AuthoriseRoute from "~/components/AuthoriseRoute";

import AuthCx from "~/context/AuthenticationContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthCx.Provider>
          <AuthoriseRoute>
            <Component {...pageProps} />
          </AuthoriseRoute>
        </AuthCx.Provider>
      </QueryClientProvider>
      <ToastContainer
        hideProgressBar
        position="bottom-right"
        transition={Slide}
      />
    </>
  );
}
