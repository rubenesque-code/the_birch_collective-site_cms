import React from "react";

import { Spinner } from "~/components/Spinner";

import fbAuth from "~/my-firebase/auth";
import type { User } from "~/types/auth";

export default function AuthCx() {
  throw new Error(
    "AuthCx exists for naming purposes only and should not be used as a component",
  );
}

type Value = {
  authListenerIsInit: boolean;
  isAuthenticated: boolean;
  user: User | null;
};

const AuthenticationContext = React.createContext<Value | null>(null);
const { Provider } = AuthenticationContext;

AuthCx.Provider = function AuthenticationProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [authListenerIsInit, setAuthListenerIsInit] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  console.log("user:", user);

  // · workaround for nextjs production warning
  if (typeof document === "undefined") {
    React.useLayoutEffect = React.useEffect;
  }

  React.useLayoutEffect(() => {
    if (authListenerIsInit) {
      return;
    }

    // · I'm not sure why, but onAuthenticated, onInit and onUnauthenticated need to be declared as their own functions for their internal functions to be invoked by initAuthStateListener.

    const onAuthenticated = (input: { user: User }) => {
      setIsAuthenticated(true);

      setUser(input.user);
    };

    const onInit = () =>
      !authListenerIsInit &&
      setTimeout(() => {
        setAuthListenerIsInit(true);
      }, 300);

    const onUnauthenticated = () => setIsAuthenticated(false);

    fbAuth.mutate.initAuthStateListener({
      onAuthenticated,
      onInit,
      onUnauthenticated,
    });
  }, [authListenerIsInit]);

  if (!authListenerIsInit) {
    return (
      <div className="fixed inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-md">
          <Spinner />
          <p className="">Authenticating...</p>
        </div>
      </div>
    );
  }

  const value: Value = { authListenerIsInit, isAuthenticated, user };

  return <Provider value={value}>{children}</Provider>;
};

AuthCx.use = function useAuthenticationContext() {
  const context = React.useContext(AuthenticationContext);

  if (!context) {
    throw new Error("AuthCx.use must be used within its provider");
  }

  return context;
};
