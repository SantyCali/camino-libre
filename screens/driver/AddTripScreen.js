// screens/driver/AddTripScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import COLORS from "../../constants/colors";
import PassengerCounter from "../../components/PassengerCounter";
import { useTrips } from "../../context/TripsContext";
import { images } from "../../assets";

const PRIMARY = COLORS?.primary ?? "#6C5ED7";

export default function AddTripScreen() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState(1);

  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState("date");

  const { addTrip } = useTrips();

  const openPicker = (mode) => {
    setPickerMode(mode);
    setShowPicker(true);
  };

  const onChangePicker = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setShowPicker(false);
      return;
    }
    const d = selectedDate || new Date();
    if (pickerMode === "date") {
      const formatted = d.toLocaleDateString("es-AR");
      setDate(formatted);
    } else {
      const h = String(d.getHours()).padStart(2, "0");
      const m = String(d.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}`);
    }
    setShowPicker(false);
  };

  const handleSubmit = () => {
    if (!from || !to || !date || !time || !seats) {
      console.log("Faltan datos del viaje");
      return;
    }

    const newTrip = {
      id: Date.now().toString(),
      from,
      to,
      notes,
      date,
      time,
      seats,
      driverName: "Sofía N.", // por ahora fijo
      price: 12000,
    };

    console.log(newTrip);
    addTrip(newTrip);

    // limpiar formulario
    setFrom("");
    setTo("");
    setNotes("");
    setDate("");
    setTime("");
    setSeats(1);
  };

  return (
    <ImageBackground source={images.bgLogin} style={{ flex: 1 }} resizeMode="cover">
      {/* SCRIM igual que en HomePassenger */}
      <View style={styles.scrim} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.screen}
          keyboardShouldPersistTaps="handled"
        >
          {/* Tarjeta cabecera */}
          <View style={styles.cardHeader}>
            <View style={styles.headerIconsRow}>
              <View style={styles.roundIconSmall}>
                <Ionicons name="settings-outline" size={18} color={PRIMARY} />
              </View>
              <View style={styles.roundIconSmall}>
                <Ionicons
                  name="information-circle-outline"
                  size={18}
                  color={PRIMARY}
                />
              </View>
            </View>

            <Text style={styles.headerTitle}>Conductor</Text>

            <View style={styles.carIconWrap}>
              <MaterialIcons
                name="directions-car-filled"
                size={52}
                color="#0f172a"
              />
              <Ionicons
                name="navigate-outline"
                size={36}
                color={PRIMARY}
                style={{ marginLeft: 8 }}
              />
            </View>
          </View>

          {/* Campos */}
          <Field
            icon={<Ionicons name="search-outline" size={20} color="#111827" />}
            placeholder="De dónde salís?"
            value={from}
            onChangeText={setFrom}
          />

          <Field
            icon={<Ionicons name="search-outline" size={20} color="#111827" />}
            placeholder="Hasta dónde vas?"
            value={to}
            onChangeText={setTo}
          />

          <Field
            icon={<Ionicons name="add-outline" size={22} color="#111827" />}
            placeholder="Agregar indicaciones"
            value={notes}
            onChangeText={setNotes}
            multiline
          />

          <Field
            icon={<Ionicons name="calendar-outline" size={20} color="#111827" />}
            placeholder="Fecha"
            value={date}
            editable={false}
            onPress={() => openPicker("date")}
          />

          <Field
            icon={<Ionicons name="time-outline" size={20} color="#111827" />}
            placeholder="Hora de salida"
            value={time}
            editable={false}
            onPress={() => openPicker("time")}
          />

          {/* Pasajeros pill */}
          <View style={styles.fieldWrapper}>
            <View style={styles.fieldInner}>
              <View style={styles.fieldIcon}>
                <Ionicons name="person-outline" size={20} color="#111827" />
              </View>
              <PassengerCounter value={seats} onChange={setSeats} />
            </View>
          </View>

          {/* Botón Agregar */}
          <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
            <Ionicons name="location-outline" size={20} color="#fff" />
            <Text style={styles.addButtonText}>Agregar</Text>
          </TouchableOpacity>

          <View style={{ height: 32 }} />
        </ScrollView>

        {showPicker && (
          <DateTimePicker
            value={new Date()}
            mode={pickerMode}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChangePicker}
          />
        )}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

function Field({
  icon,
  placeholder,
  value,
  onChangeText = () => {},
  multiline = false,
  keyboardType = "default",
  editable = true,
  onPress,
}) {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <View style={styles.fieldWrapper}>
      <Wrapper
        style={styles.fieldInner}
        activeOpacity={onPress ? 0.8 : 1}
        onPress={onPress}
      >
        <View style={styles.fieldIcon}>{icon}</View>
        <TextInput
          style={[
            styles.input,
            multiline && { height: 70, textAlignVertical: "top" },
          ]}
          placeholder={placeholder}
          placeholderTextColor="#6b7280"
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          keyboardType={keyboardType}
          editable={editable === false ? false : !onPress}
        />
      </Wrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.62)",
  },
  screen: {
    paddingHorizontal: 18,
    paddingTop:
      Platform.OS === "android"
        ? 24 + 16 // margen similar a HomePassenger
        : 56,
    paddingBottom: 16,
  },
  // CABECERA
  cardHeader: {
    backgroundColor: "#fff",
    borderRadius: 26,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 18,
    elevation: 12,
  },
  headerIconsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  roundIconSmall: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f3f4ff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 10,
  },
  carIconWrap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  // CAMPOS
  fieldWrapper: {
    marginBottom: 12,
  },
  fieldInner: {
    flexDirection: "row",
    alignItems: "center",
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
  fieldIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
    fontWeight: "600",
  },
  // BOTÓN
  addButton: {
    marginTop: 8,
    backgroundColor: PRIMARY,
    height: 54,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 14,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
  },
});
