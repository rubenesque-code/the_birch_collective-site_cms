import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { Icon } from "~/components/icons";
import { Spinner } from "~/components/Spinner";

import { useToast } from "~/hooks";
import fbAuth from "~/my-firebase/auth";
import { localStorage, routes } from "~/static-data";
import type { AuthPersistence } from "~/types/auth";

const SignInValidationPage = () => {
  const router = useRouter();

  const toast = useToast();

  const signInQuery = useQuery("sign-in", handleSignInValidation, {
    onError() {
      setTimeout(() => {
        toast.error("Something went wrong with the sign-in");
      }, 300);

      setTimeout(() => {
        void router.push(routes.sign_in);
      }, 600);
    },
    onSuccess() {
      setTimeout(() => {
        toast.success("Signed in");
      }, 300);

      setTimeout(() => {
        void router.push(routes.landing);
      }, 600);
    },
  });

  return (
    <div className="grid h-screen place-items-center">
      <div className="flex flex-col items-center gap-sm">
        {!signInQuery.isError && !signInQuery.isSuccess ? (
          <Spinner />
        ) : signInQuery.isError ? (
          <span className="text-my-error-content">
            <Icon.Error />
          </span>
        ) : (
          <span className="text-my-success-content">
            <Icon.Success />
          </span>
        )}
        <p className="mt-sm text-gray-600">
          {!signInQuery.isError && !signInQuery.isSuccess
            ? "Checking authentication..."
            : signInQuery.isError
            ? "Sign in error"
            : "Sign in success"}
        </p>
        <p
          className={`mt-sm text-gray-400 transition-opacity ease-in-out ${
            signInQuery.isError || signInQuery.isSuccess
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          Redirecting...
        </p>
      </div>
    </div>
  );
};

export default SignInValidationPage;

const handleSignInValidation = async () => {
  const route = window.location.href;

  const isValidRoute = fbAuth.query.checkEmailLinkIsValid({
    emailLink: route,
  });

  if (!isValidRoute) {
    throw new Error("invalid email link");
  }

  let email = window.localStorage.getItem(localStorage.keys.email_signin);

  if (!email) {
    email = window.prompt("Please provide your email for confirmation");
  }

  if (!email) {
    throw new Error("no email provided");
  }

  const signInPersistenceFromLocalStorage = window.localStorage.getItem(
    localStorage.keys.auth_persistence,
  ) as AuthPersistence | null;

  const authPersistence: AuthPersistence =
    signInPersistenceFromLocalStorage || "session";

  await fbAuth.mutate.setAuthPersistence({ authPersistence });

  await fbAuth.mutate.signInWithEmailLink({
    email,
    emailLink: route,
  });

  window.localStorage.removeItem(localStorage.keys.auth_persistence);
  window.localStorage.removeItem(localStorage.keys.email_signin);
};
