import React from "react";
import { useRouter } from "next/router";

import AuthCx from "~/context/AuthenticationContext";
import { useToast } from "~/hooks";
import { routes } from "~/static-data";

// * if sign-in page, want to redirect if already signed in
// * will need to wait until authListener is init before can determine authentication

// * an issue may be that we are re-routing before authListener has necessarily updated

const AuthoriseRoute = ({ children }: { children: React.ReactElement }) => {
  if (typeof document === "undefined") {
    // · workaround for nextjs production warning
    React.useLayoutEffect = React.useEffect;
  }

  const { isAuthenticated } = AuthCx.use();

  const router = useRouter();

  const route = router.pathname;

  const isSignInPage =
    route === routes.sign_in || route === routes.sign_in_validation;

  const toast = useToast();

  React.useLayoutEffect(() => {
    if (isSignInPage && isAuthenticated) {
      void router.push("/");

      return;
    }
    if (!isSignInPage && !isAuthenticated) {
      toast.error("Not signed in.");

      void router.push(`/${routes.sign_in}`);

      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignInPage, isAuthenticated]);

  if (isSignInPage && isAuthenticated) {
    return (
      <div className={`grid h-screen place-items-center`}>
        <p>Signed in, redirecting...</p>
      </div>
    );
  }

  if (!isSignInPage && !isAuthenticated) {
    return (
      <div className={`grid h-screen place-items-center`}>
        <p>Not signed in, redirecting...</p>
      </div>
    );
  }

  return children;
};

export default AuthoriseRoute;
