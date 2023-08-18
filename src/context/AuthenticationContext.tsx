import React from "react";

import fbAuth from "~/my-firebase/auth";

export default function AuthCx() {
  throw new Error(
    "AuthCx exists for naming purposes only and should not be used as a component",
  );
}

type Value = { authListenerIsInit: boolean; isAuthenticated: boolean };

const AuthenticationContext = React.createContext<Value | null>(null);
const { Provider } = AuthenticationContext;

AuthCx.Provider = function AuthenticationProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [authListenerIsInit, setAuthListenerIsInit] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // · workaround for nextjs production warning
  if (typeof document === "undefined") {
    React.useLayoutEffect = React.useEffect;
  }

  React.useLayoutEffect(() => {
    if (authListenerIsInit) {
      return;
    }

    const onAuthenticated = () => setIsAuthenticated(true);
    const onUnauthenticated = () => setIsAuthenticated(false);

    fbAuth.mutate.initAuthStateListener({
      onAuthenticated,
      onInit: () =>
        !authListenerIsInit &&
        setTimeout(() => {
          setAuthListenerIsInit(true);
        }, 300),
      onUnauthenticated,
    });
  }, [authListenerIsInit]);

  const value: Value = { authListenerIsInit, isAuthenticated };

  if (!authListenerIsInit) {
    return (
      <div className={`grid h-screen place-items-center`}>
        <p>Authenticating...</p>
      </div>
    );
  }

  return <Provider value={value}>{children}</Provider>;
};

AuthCx.use = function useAuthenticationContext() {
  const context = React.useContext(AuthenticationContext);

  if (!context) {
    throw new Error("AuthCx.use must be used within its provider");
  }

  return context;
};
