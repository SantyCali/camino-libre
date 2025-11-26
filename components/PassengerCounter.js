import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

export default function PassengerCounter({ value, onChange }) {
  const dec = () => onChange(Math.max(1, value - 1));
  const inc = () => onChange(Math.min(6, value + 1)); // tope opcional

  return (
    <View style={styles.wrap}>
      <View style={styles.box}>
        <TouchableOpacity style={styles.round} onPress={dec}>
          <Ionicons name="remove" size={18} color={COLORS.text} />
        </TouchableOpacity>

        <View style={styles.center}>
          <View style={styles.titleRow}>
            <Ionicons name="person-outline" size={18} color={COLORS.text} />
            <Text style={styles.label}>Pasajeros</Text>
          </View>
          <Text style={styles.count}>{value}</Text>
        </View>

        <TouchableOpacity style={styles.round} onPress={inc}>
          <Ionicons name="add" size={18} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.shadow} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { },
box: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#fff",
  borderRadius: 16,
  paddingHorizontal: 12,
  paddingVertical: 10,
  borderWidth: 0,

  shadowColor: "#000",
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.25,
  shadowRadius: 14,
  elevation: 12,


  },
  round: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
  },
  center: { alignItems: "center", justifyContent: "center" },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 2 },
  label: { color: COLORS.text, fontSize: 16, fontWeight: "700" },
  count: { color: COLORS.text, fontSize: 18, fontWeight: "800", lineHeight: 22 },
  shadow: {
    position: "absolute",
    left: 8,
    right: 8,
    bottom: -6,
    height: 10,
    borderRadius: 16,
    backgroundColor: "#0000",
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
});
