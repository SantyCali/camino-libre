// firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyAPsn4g1mle2EsgQezFL65xbHo_-0iyF1w", // 👈 tu key real
  authDomain: "camino-libre-5724b.firebaseapp.com",
  databaseURL: "https://camino-libre-5724b-default-rtdb.firebaseio.com",
  projectId: "camino-libre-5724b",
  storageBucket: "camino-libre-5724b.appspot.com",
  messagingSenderId: "175936697075",
  appId: "1:175936697075:web:086abf2f13abfbf9597d86",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let auth;
if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

const rtdb = getDatabase(app);

export { app, auth, rtdb };
export default app;
