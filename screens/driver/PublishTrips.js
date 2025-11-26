// screens/passenger/PublishTrips.js
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function PublishTrips() {
  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <Text style={styles.title}>Mis viajes publicados</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Merlo → Buenos Aires</Text>
        <Text style={styles.cardSub}>Salida: 12/11 08:00 — 3 asientos</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Palermo → Merlo</Text>
        <Text style={styles.cardSub}>Salida: 14/11 19:30 — 2 asientos</Text>
      </View>

      {/* después acá renderizamos los viajes reales desde la API */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 16, backgroundColor: "#0b0f14", flexGrow: 1 },
  title: {
    color: "#eaf2ff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#111823",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1f2a38",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 12,
  },
  cardTitle: { color: "#eaf2ff", fontWeight: "800", marginBottom: 4 },
  cardSub: { color: "#a7b0c0" },
});
