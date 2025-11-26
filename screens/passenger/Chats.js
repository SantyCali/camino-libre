//passenger/Chats.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Chats() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>
      <Text style={styles.sub}>No hay conversaciones por ahora.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0f14", padding: 16 },
  title: { color: "#eaf2ff", fontSize: 22, fontWeight: "800" },
  sub: { color: "#a7b0c0", marginTop: 8 },
});
