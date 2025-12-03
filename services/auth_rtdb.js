// services/auth_rtdb.js
import { auth, rtdb } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set, get, update } from "firebase/database";

export const signUpWithProfileRTDB = async ({ email, password, extra = {} }) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;

  await set(ref(rtdb, `users/${uid}`), {
    uid,
    email,
    displayName: extra.displayName || email.split("@")[0],
    createdAt: Date.now(),
    role: "passenger"
  });

  return cred.user;
};

export const signInEmailRTDB = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const fetchMyProfileRTDB = async (uid) => {
  const snap = await get(ref(rtdb, `users/${uid}`));
  return snap.exists() ? snap.val() : null;
};

export const updateProfileRTDB = async (uid, payload) => {
  if (!uid) return null;
  await update(ref(rtdb, `users/${uid}`), payload);
  return payload;
};
