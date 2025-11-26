import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FormField({
  value,
  onChangeText,
  placeholder = "",
  icon = "search-outline",
  editable = true,
  onPress,          // si lo pasás, el campo actúa como botón (fecha, etc.)
}) {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <View style={styles.shadowWrap}>
      <Wrapper
        activeOpacity={0.8}
        onPress={onPress}
        style={[styles.field, !editable && styles.disabled]}
      >
        <Ionicons name={icon} size={18} color="#475569" style={{ marginRight: 10 }} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          editable={editable && !onPress}
        />
      </Wrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrap: {
    borderRadius: 14,
    // sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    height: 52,
    borderRadius: 14,
  },
  input: {
    flex: 1,
    color: "#0f172a",
    fontSize: 16,
  },
  disabled: {
    opacity: 0.9,
  },
});
