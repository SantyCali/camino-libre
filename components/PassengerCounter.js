// components/PassengerCounter.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PassengerCounter({ value, onChange }) {
  const handleChange = (delta) => {
    let next = value + delta;
    if (next < 1) next = 1;
    if (next > 8) next = 8; // límite razonable
    onChange(next);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.chip}>
        <View style={styles.left}>
          <Ionicons name="people-outline" size={18} color="#0f172a" />
          <Text style={styles.label}>Pasajeros</Text>
        </View>

        <View style={styles.right}>
          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => handleChange(-1)}
          >
            <Text style={styles.circleText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.count}>{value}</Text>

          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => handleChange(1)}
          >
            <Text style={styles.circleText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  circleBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#eef2ff",
    alignItems: "center",
    justifyContent: "center",
  },
  circleText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },
  count: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    minWidth: 16,
    textAlign: "center",
  },
});
