import { httpsCallable } from "firebase/functions";

import { wait } from "~/helpers/async";
import { isDevMode } from "~/helpers/environment";
import { functions } from "~/my-firebase/client";

const addAdmin = async (email: string) => {
  const addAdminFirebaseFunc = httpsCallable(functions, "addAdminRole");
  const res = await addAdminFirebaseFunc(email);
  console.log("res:", res);
  return res;
};

type CheckIsAdminRes = {
  data: {
    isAdmin: boolean;
  };
};

const checkIsAdmin = async (email: string) => {
  if (isDevMode) {
    await wait(600);

    const dummyAdmins = ["admin@email.com"];

    const isAdmin = dummyAdmins.includes(email);

    return { isAdmin };
  } else {
    const checkIsAdminByEmail = httpsCallable(
      functions,
      "computeIsAdminByEmail",
    );
    const isAdminRes = (await checkIsAdminByEmail(email)) as CheckIsAdminRes;
    const isAdmin = isAdminRes.data.isAdmin;
    return { isAdmin };
  }
};

export const auth = { addAdmin, checkIsAdmin };
