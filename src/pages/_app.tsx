import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "react-query";
import { Slide, ToastContainer } from "react-toastify";
import "~/styles/globals.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      <ToastContainer
        hideProgressBar
        position="bottom-right"
        transition={Slide}
      />
    </>
  );
}
