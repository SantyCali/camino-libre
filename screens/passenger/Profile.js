// screens/passenger/Profile.js
import React from "react";
import {
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../constants/colors";
import { images } from "../../assets";

export default function Profile() {
  const actions = [
    { icon: "bookmarks-outline", label: "Viajes guardados" },
    { icon: "pencil-outline", label: "Editar perfil" },
    { icon: "settings-outline", label: "Configuración" },
  ];

  return (
    <ImageBackground
      source={images.bgLogin}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.scrim} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Ionicons name="person-circle-outline" size={26} color="#fff" />
          <Text style={styles.headerTitle}>Mi perfil</Text>
        </View>

        <View style={styles.headerCard}>
          <View style={styles.avatarWrap}>
            <Ionicons name="person" size={48} color="#3f1c6b" />
          </View>
          <Text style={styles.name}>Martín G.</Text>
          <Text style={styles.email}>martin@example.com</Text>
          <Text style={styles.meta}>Pasajero activo desde 2024</Text>
        </View>

        <View style={styles.list}>
          {actions.map((item) => (
            <TouchableOpacity key={item.icon} style={styles.row} activeOpacity={0.8}>
              <View style={styles.rowLeft}>
                <Ionicons name={item.icon} size={20} color={COLORS.primary} />
                <Text style={styles.rowLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#b5b9c4" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.cta} activeOpacity={0.9}>
          <View style={styles.ctaIconWrap}>
            <Ionicons name="car-sport-outline" size={18} color={COLORS.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.ctaTitle}>¿Sos conductor o conductora?</Text>
            <Text style={styles.ctaSubtitle}>
              Postulate para manejar con Camino Libre
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={{ height: 26 }} />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.68)",
  },
  container: {
    paddingHorizontal: 18,
    paddingTop:
      Platform.OS === "android"
        ? (StatusBar.currentHeight ?? 0) + 18
        : 64,
    gap: 18,
    paddingBottom: 42,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 12,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  headerCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 26,
    paddingHorizontal: 18,
    gap: 6,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 12,
  },
  avatarWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#f1edff",
    borderWidth: 2,
    borderColor: "#e3dafc",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.text,
  },
  email: {
    color: COLORS.sub,
    fontSize: 14,
  },
  meta: {
    color: COLORS.sub,
    fontSize: 13,
    marginTop: 2,
  },
  list: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e6e9f0",
    backgroundColor: "#fff",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowLabel: {
    fontSize: 15,
    color: COLORS.text,
    fontWeight: "600",
  },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 10,
  },
  ctaIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#f1edff",
    borderWidth: 1,
    borderColor: "#e3dafc",
    alignItems: "center",
    justifyContent: "center",
  },
  ctaTitle: {
    fontSize: 15,
    color: COLORS.text,
    fontWeight: "800",
  },
  ctaSubtitle: {
    fontSize: 13,
    color: COLORS.sub,
    marginTop: 2,
  },
});
