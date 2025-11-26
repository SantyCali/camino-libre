// screens/passenger/HomePassenger.js
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import FormField from "../../components/FormField";
import PassengerCounter from "../../components/PassengerCounter";
import { images } from "../../assets";

export default function HomePassenger() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  const greetingName = useMemo(() => "Santiago", []);

  const handlePickDate = () => {
    setDate("2025-11-10"); // luego integramos DateTimePicker
  };

  const handleSearch = () => {
    // navigation.navigate("Trips", { from, to, date, passengers })
  };

  return (
    <ImageBackground source={images.bgLogin} style={{ flex: 1 }} resizeMode="cover">
      {/* SCRIM para bajar el ruido del fondo */}
      <View style={styles.scrim} />

      <View style={styles.screen}>
        {/* Tarjeta de saludo */}
        <View style={styles.hello}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100?img=15" }}
            style={styles.avatar}
          />
          <Text style={styles.helloText}>Hola {greetingName}!</Text>
        </View>

        {/* Campos */}
        <View style={styles.stack}>
          <FormField
            placeholder="De dónde salís?"
            value={from}
            onChangeText={setFrom}
            icon="search-outline"
          />
          <FormField
            placeholder="Hasta dónde vas?"
            value={to}
            onChangeText={setTo}
            icon="search-outline"
          />
          <FormField
            placeholder="Fecha"
            value={date}
            icon="calendar-outline"
            onPress={handlePickDate}
            editable={false}
          />

          {/* Pasajeros (el número va dentro del cuadro) */}
          <PassengerCounter value={passengers} onChange={setPassengers} />
        </View>

        {/* Botón Buscar */}
        <TouchableOpacity style={styles.cta} onPress={handleSearch}>
          <Text style={styles.ctaText}>Buscar</Text>
          <Ionicons name="chevron-forward" size={18} color="#fff" />
        </TouchableOpacity>

        <View style={{ height: Platform.OS === "ios" ? 18 : 24 }} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFillObject,
    // más transparente para que se vea el fondo, pero legible
    backgroundColor: "rgba(255,255,255,0.62)",
  },
  screen: {
    flex: 1,
    paddingHorizontal: 18,
    // Empuja todo hacia abajo con respecto a la barra de estado/notch
    paddingTop:
      Platform.OS === "android"
        ? (StatusBar.currentHeight ?? 0) + 16
        : 56,
  },
  hello: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 14,
    gap: 12,
    marginBottom: 14,

    // sombrita linda
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: "#ffffff66",
  },
  helloText: { color: "#fff", fontWeight: "800", fontSize: 18 },

  stack: {
    gap: 12,
    marginBottom: 18,
  },

  cta: {
    marginTop: 6,
    height: 54,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 12,
  },
  ctaText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
