// screens/passenger/TripDetail.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { images } from "../../assets";

export default function TripDetail({ route, navigation }) {
  const { trip } = route.params;

  return (
    <ImageBackground source={images.bgLogin} style={{ flex: 1 }} resizeMode="cover">
      <View style={styles.scrim} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Detalle del viaje</Text>

        <View style={styles.card}>
          <Text style={styles.cityFrom}>{trip.from}</Text>

          <View style={styles.destRow}>
            <Ionicons name="arrow-forward-circle-outline" size={18} color="#6366f1" />
            <Text style={styles.cityTo}>{trip.to}</Text>
          </View>

          <View style={styles.rowInfo}>
            <View style={styles.rowInfoItem}>
              <Ionicons name="calendar-outline" size={16} color="#4b5563" />
              <Text style={styles.rowInfoText}>{trip.date}</Text>
            </View>

            <View style={styles.rowInfoItem}>
              <Ionicons name="time-outline" size={16} color="#4b5563" />
              <Text style={styles.rowInfoText}>{trip.time}</Text>
            </View>

            <View style={styles.rowInfoItem}>
              <MaterialIcons name="event-seat" size={16} color="#4b5563" />
              <Text style={styles.rowInfoText}>{trip.seats} lugares</Text>
            </View>
          </View>

          {trip.notes ? (
            <View style={styles.notesBox}>
              <Text style={styles.notesTitle}>Indicaciones</Text>
              <Text style={styles.notesText}>{trip.notes}</Text>
            </View>
          ) : null}

          <View style={styles.driverRow}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <View style={styles.avatarWrap}>
                <Image
                  source={{ uri: "https://i.pravatar.cc/100?img=32" }}
                  style={styles.avatar}
                />
              </View>
              <View>
                <Text style={styles.driverName}>{trip.driverName ?? "Conductor"}</Text>
                <Text style={styles.driverSub}>Calificado, buena onda 😎</Text>
              </View>
            </View>

            <Text style={styles.price}>${trip.price?.toLocaleString("es-AR")}</Text>
          </View>
        </View>

        {/* Botón para ir al chat (por ahora solo navega a la tab Chats) */}
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => navigation.navigate("Chats")}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={20} color="#fff" />
          <Text style={styles.chatText}>Chatear con el viajante</Text>
        </TouchableOpacity>

        <View style={{ height: 24 }} />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.78)",
  },
  container: {
    padding: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#020617",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 12,
  },
  cityFrom: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 6,
  },
  destRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 6,
  },
  cityTo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  rowInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  rowInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rowInfoText: {
    fontSize: 13,
    color: "#4b5563",
  },
  notesBox: {
    marginTop: 4,
    marginBottom: 12,
    backgroundColor: "#f3f4ff",
    borderRadius: 16,
    padding: 10,
  },
  notesTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
  },
  notesText: {
    fontSize: 12,
    color: "#4b5563",
  },
  driverRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  avatarWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  driverName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  driverSub: {
    fontSize: 12,
    color: "#6b7280",
  },
  price: {
    fontSize: 18,
    fontWeight: "800",
    color: "#16a34a",
  },
  chatButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 52,
    borderRadius: 20,
    backgroundColor: "#6C5ED7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 14,
  },
  chatText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
});
