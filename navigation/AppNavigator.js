//AppNavigator.js
import React, { useState, useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import BottomTabs from "./BottomTabs";
import AuthGate from "../components/AuthGate";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState(null);

  const handleReady = useCallback(({ user, remember }) => {
    setInitialRoute(user && remember ? "Home" : "Login");
  }, []);

  if (initialRoute === null) {
    return <AuthGate onReady={handleReady} />;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#0b0f14" } }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Home" component={BottomTabs} />
    </Stack.Navigator>
  );
}
