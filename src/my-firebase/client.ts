import { getApp, getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import {
  connectFirestoreEmulator,
  getFirestore,
} from "firebase/firestore/lite";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
};

const app = !getApps().length ? initializeApp(config) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

if (process.env.NODE_ENV === "development" && app) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099/");
  connectStorageEmulator(storage, "127.0.0.1", 9199);

  // · below is a workaround to prevent multiple attempts to connect during development. This is a bug on firebase's side.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!firestore._settingsFrozen) {
    connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
  }
}

export { auth, firestore, storage };
