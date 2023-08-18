import * as firebaseAuth from "firebase/auth";

import { auth } from "../../client";

const checkEmailLinkIsValid = ({ emailLink }: { emailLink: string }) => {
  console.log("CHECKING LINK IS VALID");

  return firebaseAuth.isSignInWithEmailLink(auth, emailLink);
};

const checkUserIsAdmin = async (user: firebaseAuth.User) => {
  const res = await user.getIdTokenResult();

  return Boolean(res.claims.admin);
};

const query = {
  checkEmailLinkIsValid,
  checkUserIsAdmin,
};

export default query;
