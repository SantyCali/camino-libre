//AuthGate.js
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function AuthGate({ onReady }) {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    let unsub;
    (async () => {
      try {
        const remember = await AsyncStorage.getItem("remember"); // "1" | "0" | null
        if (remember === "0") {
          try { await signOut(auth); } catch (e) { console.log("signOut:", e); }
        }
        unsub = onAuthStateChanged(auth, (user) => {
          onReady({ user, remember: remember !== "0" });
          setBooting(false);
        });
      } catch (e) {
        console.log("AuthGate error:", e);
        onReady({ user: null, remember: false });
        setBooting(false);
      }
    })();
    return () => { if (unsub) unsub(); };
  }, [onReady]);

  if (booting) {
    return (
      <View style={{ flex: 1, backgroundColor: "#0b0f14", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#6C5ED7" />
      </View>
    );
  }
  return null;
}
