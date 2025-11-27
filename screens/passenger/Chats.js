// screens/passenger/Chats.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTrips } from "../../context/TripsContext";
import { images } from "../../assets";

export default function Chats({ navigation }) {
  const { trips } = useTrips();

  // armamos "conversaciones" a partir de los viajes cargados
  const conversations =
    trips.length === 0
      ? []
      : trips.map((t) => ({
          id: t.id,
          name: t.driverName ?? "Conductor",
          lastMessage: t.notes || "Tocá para coordinar detalles del viaje",
          city: t.to,
          dateLabel: t.date,
          trip: t,
        }));

  return (
    <ImageBackground source={images.bgLogin} style={{ flex: 1 }} resizeMode="cover">
      <View style={styles.scrim} />

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Mensajes</Text>

        {conversations.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Todavía no tenés chats</Text>
            <Text style={styles.emptyText}>
              Creá un viaje o sumate a uno y empezá a chatear con el conductor.
            </Text>
          </View>
        ) : (
          conversations.map((conv) => (
            <TouchableOpacity
              key={conv.id}
              style={styles.chatCard}
              activeOpacity={0.9}
              onPress={() => navigation.navigate("ChatScreen", { trip: conv.trip })}
            >
              <View style={styles.rowTop}>
                <View style={styles.avatarWrap}>
                  <Image
                    source={{ uri: "https://i.pravatar.cc/100?img=24" }}
                    style={styles.avatar}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{conv.name}</Text>
                  <Text style={styles.message} numberOfLines={1}>
                    {conv.lastMessage}
                  </Text>
                </View>
                <Text style={styles.date}>{conv.dateLabel}</Text>
              </View>

              <View style={styles.rowBottom}>
                <View style={styles.cityRow}>
                  <Ionicons name="location-outline" size={14} color="#6b7280" />
                  <Text style={styles.cityText}>{conv.city}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.78)",
  },
  scroll: {
    padding: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#020617",
    marginBottom: 16,
  },
  emptyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 13,
    color: "#6b7280",
  },
  chatCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  rowTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 10,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  message: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  date: {
    fontSize: 11,
    color: "#9ca3af",
    marginLeft: 8,
  },
  rowBottom: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cityText: {
    fontSize: 12,
    color: "#6b7280",
  },
});
