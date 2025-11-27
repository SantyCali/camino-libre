// navigation/BottomTabs.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomePassenger from "../screens/passenger/HomePassenger";
import AddTripScreen from "../screens/driver/AddTripScreen";
import Trips from "../screens/passenger/Trips";
import TripDetail from "../screens/passenger/TripDetail";
import Chats from "../screens/passenger/Chats";
import Profile from "../screens/passenger/Profile";

const Tab = createBottomTabNavigator();
const TripsStack = createNativeStackNavigator();

function TripsNavigator() {
  return (
    <TripsStack.Navigator screenOptions={{ headerShown: false }}>
      <TripsStack.Screen name="Trips" component={Trips} />
      <TripsStack.Screen name="TripDetail" component={TripDetail} />
    </TripsStack.Navigator>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#6C5ED7",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 70,
          paddingTop: 6,
          paddingBottom: 10,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 14,
          shadowColor: "#000",
          shadowOpacity: 0.18,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: -2 },
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
        tabBarIcon: ({ color, focused }) => {
          switch (route.name) {
            case "Inicio":
              return (
                <Ionicons
                  name={focused ? "search" : "search-outline"}
                  size={24}
                  color={color}
                />
              );
            case "Agregar":
              return (
                <Ionicons
                  name={focused ? "add-circle" : "add-circle-outline"}
                  size={26}
                  color={color}
                />
              );
            case "Viajes":
              return (
                <Ionicons
                  name={focused ? "car" : "car-outline"}
                  size={24}
                  color={color}
                />
              );
            case "Chats":
              return (
                <Ionicons
                  name={focused ? "chatbubble" : "chatbubble-outline"}
                  size={24}
                  color={color}
                />
              );
            case "Perfil":
              return (
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={24}
                  color={color}
                />
              );
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomePassenger} />
      <Tab.Screen name="Agregar" component={AddTripScreen} />
      <Tab.Screen name="Viajes" component={TripsNavigator} />
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}
