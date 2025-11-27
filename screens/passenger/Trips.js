// screens/passenger/Trips.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTrips } from "../../context/TripsContext";
import { images } from "../../assets";

export default function Trips({ navigation }) {
  const { trips } = useTrips();

  return (
    <ImageBackground source={images.bgLogin} style={{ flex: 1 }} resizeMode="cover">
      <View style={styles.scrim} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Viajes guardados</Text>

        {trips.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Todavía no hay viajes</Text>
            <Text style={styles.emptyText}>
              Cargá tu primer viaje desde la pestaña{" "}
              <Text style={{ fontWeight: "700" }}>Agregar</Text> 🚗
            </Text>
          </View>
        ) : (
          trips.map((trip) => (
            <TouchableOpacity
              key={trip.id}
              style={styles.tripCard}
              activeOpacity={0.9}
              onPress={() => navigation.navigate("TripDetail", { trip })}
            >
              <Text style={styles.cityFrom}>{trip.from}</Text>

              <View style={styles.destRow}>
                <Ionicons
                  name="arrow-forward-circle-outline"
                  size={18}
                  color="#6366f1"
                />
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

              <View style={styles.footerRow}>
                <View style={styles.driverRow}>
                  <Ionicons name="person-outline" size={16} color="#4b5563" />
                  <Text style={styles.driverName}>
                    {trip.driverName ?? "Conductor"}
                  </Text>
                </View>

                <View style={styles.avatarWrap}>
                  <Image
                    source={{ uri: "https://i.pravatar.cc/100?img=32" }}
                    style={styles.avatar}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}

        <View style={{ height: 32 }} />
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
  tripCard: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 12,
  },
  cityFrom: {
    fontSize: 18,
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
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  rowInfo: {
    flexDirection: "row",
    alignItems: "center",
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
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  driverRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  driverName: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
  },
  avatarWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
});
