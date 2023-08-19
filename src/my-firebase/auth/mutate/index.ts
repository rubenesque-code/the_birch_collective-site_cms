import * as firebaseAuth from "firebase/auth";

import { auth } from "../../client";
import query from "../query";

import { domain, routes } from "~/static-data";
import type { AuthPersistence, User } from "~/types/auth";

// · if same email gets validated using func below twice (e.g. in useEffect in dev mode), the email link will be invalidated.
const sendSignInLinkToEmail = (input: { email: string }) => {
  const actionCodeSettings = {
    url: `${domain}/${routes.sign_in_validation}`,
    handleCodeInApp: true,
  };

  void firebaseAuth.sendSignInLinkToEmail(
    auth,
    input.email,
    actionCodeSettings,
  );
};

const setAuthPersistence = async (input: {
  authPersistence: AuthPersistence;
}) => {
  const authPersistence =
    input.authPersistence === "local"
      ? firebaseAuth.browserLocalPersistence
      : firebaseAuth.browserSessionPersistence;

  await firebaseAuth.setPersistence(auth, authPersistence);
};

const signInWithEmailLink = async ({
  email,
  emailLink,
}: {
  email: string;
  emailLink: string;
}) => {
  try {
    await firebaseAuth.signInWithEmailLink(auth, email, emailLink);

    return true;
  } catch (err) {
    return false;
  }
};

const signOut = async () => await firebaseAuth.signOut(auth);

// todo: is this being used properly? need to use this to check user is admin? can do externally?
const initAuthStateListener = ({
  onAuthenticated,
  onInit,
  onUnauthenticated,
}: {
  onAuthenticated: (arg0: { user: User }) => void;
  onInit: () => void;
  onUnauthenticated: () => void;
}) =>
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  firebaseAuth.onAuthStateChanged(auth, async (user) => {
    if (!user) {
      onUnauthenticated();

      await signOut();
    } else {
      const isAdmin = await query.checkUserIsAdmin(user);

      console.log("user:", user.email);

      if (isAdmin) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        onAuthenticated({ user: { email: user.email! } });
      } else {
        onUnauthenticated();

        await signOut();
      }
    }

    onInit();
  });

const mutate = {
  sendSignInLinkToEmail,
  setAuthPersistence,
  signInWithEmailLink,
  signOut,
  initAuthStateListener,
};

export default mutate;
