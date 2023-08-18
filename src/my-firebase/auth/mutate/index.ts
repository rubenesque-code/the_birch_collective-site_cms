import * as firebaseAuth from "firebase/auth";

import { auth } from "../../client";
import query from "../query";

import { isDevMode } from "~/helpers/environment";
import { domain, routes } from "~/static-data";
import type { AuthPersistence } from "~/types/auth";

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
    const signInRes = await firebaseAuth.signInWithEmailLink(
      auth,
      email,
      emailLink,
    );
    console.log("signInRes:", signInRes);

    return true;
  } catch (err) {
    console.log("err:", err);
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
  onAuthenticated: () => void;
  onInit: () => void;
  onUnauthenticated: () => void;
}) =>
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  firebaseAuth.onAuthStateChanged(auth, async (user) => {
    if (!user) {
      onUnauthenticated();

      await signOut();
    } else {
      const isAdmin = isDevMode ? true : await query.checkUserIsAdmin(user);

      if (isAdmin) {
        onAuthenticated();
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
