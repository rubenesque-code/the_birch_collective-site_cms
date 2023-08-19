import * as firebaseAuth from "firebase/auth";

import { auth } from "../../client";

import { isDevMode } from "~/static-data";

const checkEmailLinkIsValid = ({ emailLink }: { emailLink: string }) => {
  return firebaseAuth.isSignInWithEmailLink(auth, emailLink);
};

const checkUserIsAdmin = async (user: firebaseAuth.User) => {
  if (isDevMode) {
    return true;
  }

  const res = await user.getIdTokenResult();

  return Boolean(res.claims.admin);
};

const query = {
  checkEmailLinkIsValid,
  checkUserIsAdmin,
};

export default query;
