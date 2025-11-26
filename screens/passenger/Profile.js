// screens/passenger/Profile.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi perfil</Text>
      <Text style={styles.sub}>Acá va la data del usuario.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0f14", padding: 16 },
  title: { color: "#eaf2ff", fontSize: 22, fontWeight: "800" },
  sub: { color: "#a7b0c0", marginTop: 8 },
});
