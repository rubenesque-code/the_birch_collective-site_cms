import type { AppProps } from "next/app";
import { isDesktop } from "react-device-detect";
import { QueryClient, QueryClientProvider } from "react-query";
import { Slide, ToastContainer } from "react-toastify";

import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import AuthoriseRoute from "~/components/AuthoriseRoute";

import AuthCx from "~/context/AuthenticationContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  if (!isDesktop) {
    return (
      <div className="grid h-screen place-items-center">
        <div className="p-lg">
          <h1 className="font-mono text-lg text-gray-500">
            The Birch Collective CMS
          </h1>

          <p className="mt-md font-mono">
            This cms doesn&apos;t work from this type of device.
          </p>
          <p className="mt-xs font-mono">Use a laptop or desktop.</p>
        </div>
      </div>
    );
  }

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
