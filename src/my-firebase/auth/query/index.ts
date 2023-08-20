import * as firebaseAuth from "firebase/auth";

import { auth } from "../../client";

import { isDevMode } from "~/static-data";

// · if same email gets validated using func below twice (e.g. in useEffect in dev mode), the email link will be invalidated.
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
