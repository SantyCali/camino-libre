import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { TripsProvider } from "./context/TripsContext";

export default function App() {
  return (
    <TripsProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </TripsProvider>
  );
}
