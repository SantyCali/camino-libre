// navigation/BottomTabs.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomePassenger from "../screens/passenger/HomePassenger";
import Trips from "../screens/passenger/Trips";
import Chats from "../screens/passenger/Chats";
import Profile from "../screens/passenger/Profile";
import AddTripScreen from "../screens/driver/AddTripScreen";

const Tab = createBottomTabNavigator();

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
      {/* 👉 El tab del + ahora abre la pantalla con el diseño de conductor */}
      <Tab.Screen name="Agregar" component={AddTripScreen} />
      <Tab.Screen name="Viajes" component={Trips} />
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}
