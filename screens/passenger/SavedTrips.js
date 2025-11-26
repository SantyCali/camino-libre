// screens/passenger/SavedTrips.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { images } from "../../assets";

export default function SavedTrips({ navigation }) {
  // de demo
  const savedTrips = [
    // { id: "1", from: "Merlo", to: "Palermo", date: "2025-11-10", time: "14:00" },
  ];

  return (
    <ImageBackground source={images.bgLogin} style={{ flex: 1 }} resizeMode="cover">
      <View style={styles.scrim} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Cajita de “publicar tus viajes” */}
        <TouchableOpacity style={styles.callout} onPress={() => navigation.navigate("Viajes")}>
          <View style={styles.calloutIconWrap}>
            <Ionicons name="briefcase-outline" size={22} color="#6C5ED7" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.calloutTitle}>¿Querés publicar un viaje?</Text>
            <Text style={styles.calloutSub}>Tocá acá y cargá tu ruta, horario y asientos.</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#6C5ED7" />
        </TouchableOpacity>

        {/* Header de sección */}
        <View style={styles.header}>
          <Ionicons name="bookmark-outline" size={22} color="#fff" />
          <Text style={styles.title}>Viajes guardados</Text>
        </View>

        {/* Lista de guardados */}
        {savedTrips.length === 0 ? (
          <Text style={styles.empty}>Todavía no guardaste ninguno.</Text>
        ) : (
          savedTrips.map((t) => (
            <View key={t.id} style={styles.card}>
              <Text style={styles.route}>
                {t.from} <Text style={{ color: "#a7b0c0" }}>→</Text> {t.to}
              </Text>
              <Text style={styles.meta}>{t.date} · {t.time}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.70)", // más translúcido como pediste
  },
  scroll: {
    padding: 20,
    paddingBottom: 110,
  },

  // Cajita CTA de publicar
  callout: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 14,
    gap: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    // sombra marcada estilo figma que te gusta
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 14,
  },
  calloutIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#f1efff",
    alignItems: "center",
    justifyContent: "center",
  },
  calloutTitle: { color: "#0b0f14", fontSize: 15, fontWeight: "800" },
  calloutSub: { color: "#475569", marginTop: 2, fontSize: 12 },

  // Header sección
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6C5ED7",
    padding: 14,
    borderRadius: 16,
    gap: 10,
    // sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 14,
    marginBottom: 16,
  },
  title: { color: "#fff", fontSize: 18, fontWeight: "800" },

  // Cards
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 12,
  },
  route: { color: "#0b0f14", fontWeight: "700", fontSize: 16 },
  meta: { color: "#64748b", marginTop: 4, fontSize: 13 },

  empty: { color: "#333", fontSize: 15, textAlign: "center", marginTop: 8 },
});
