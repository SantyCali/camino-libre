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
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import COLORS from "../../constants/colors";

const PRIMARY = COLORS?.primary ?? "#6C5ED7";

export default function AddTripScreen() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState(1);

  const [trips, setTrips] = useState([]);

  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState("date");

  // abrir picker
  const openPicker = (mode) => {
    setPickerMode(mode);
    setShowPicker(true);
  };

  // cuando el usuario elige fecha/hora
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
    };

    console.log(newTrip);

    setTrips((prev) => [newTrip, ...prev]);

    // limpiar formulario
    setFrom("");
    setTo("");
    setNotes("");
    setDate("");
    setTime("");
    setSeats(1);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#e8f0ff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Tarjeta grande de cabecera */}
        <View style={styles.cardHeader}>
          <View style={styles.headerIconsRow}>
            <View style={styles.roundIconSmall}>
              <Ionicons name="settings-outline" size={18} color={PRIMARY} />
            </View>
            <View style={styles.roundIconSmall}>
              <Ionicons name="information-circle-outline" size={18} color={PRIMARY} />
            </View>
          </View>

          <Text style={styles.headerTitle}>Conductor</Text>

          <View style={styles.carIconWrap}>
            <MaterialIcons name="directions-car-filled" size={52} color="#0f172a" />
            <Ionicons
              name="navigate-outline"
              size={36}
              color={PRIMARY}
              style={{ marginLeft: 8 }}
            />
          </View>
        </View>

        {/* Campos tipo formulario */}
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

        {/* Fecha con picker */}
        <Field
          icon={<Ionicons name="calendar-outline" size={20} color="#111827" />}
          placeholder="Fecha"
          value={date}
          editable={false}
          onPress={() => openPicker("date")}
        />

        {/* Hora con picker */}
        <Field
          icon={<Ionicons name="time-outline" size={20} color="#111827" />}
          placeholder="Hora de salida"
          value={time}
          editable={false}
          onPress={() => openPicker("time")}
        />

        {/* Pasajeros – botón largo con − / número / + */}
        <View style={styles.passengerBox}>
          <Ionicons
            name="person-outline"
            size={22}
            color="#0f172a"
            style={{ marginRight: 8 }}
          />

          <View style={styles.counterWrap}>
            <TouchableOpacity
              style={styles.counterBtn}
              onPress={() => setSeats((prev) => Math.max(1, prev - 1))}
            >
              <Text style={styles.counterBtnText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.counterNumber}>{seats}</Text>

            <TouchableOpacity
              style={styles.counterBtn}
              onPress={() => setSeats((prev) => prev + 1)}
            >
              <Text style={styles.counterBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botón Agregar */}
        <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
          <Ionicons name="location-outline" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>

        {/* Lista de viajes agregados */}
        {trips.length > 0 && (
          <View style={styles.tripsSection}>
            <Text style={styles.tripsTitle}>Viajes agregados</Text>
            {trips.map((trip) => (
              <View key={trip.id} style={styles.tripCard}>
                <Text style={styles.tripRoute}>
                  {trip.from} <Text style={{ color: "#9ca3af" }}>→</Text> {trip.to}
                </Text>
                <Text style={styles.tripInfo}>
                  {trip.date} · {trip.time} · {trip.seats} lugares
                </Text>
                {trip.notes ? (
                  <Text style={styles.tripNotes}>{trip.notes}</Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Picker de fecha/hora */}
      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode={pickerMode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChangePicker}
        />
      )}
    </KeyboardAvoidingView>
  );
}

/**
 * Componente reutilizable para cada fila del formulario
 */
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
          style={[styles.input, multiline && { height: 70, textAlignVertical: "top" }]}
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
  container: {
    paddingHorizontal: 18,
    paddingTop: 28,
    paddingBottom: 16,
  },

  // CARD CABECERA
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

  // PASAJEROS
  passengerBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 22,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  counterWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#f8f9ff",
    paddingVertical: 10,
    borderRadius: 14,
  },
  counterBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#e8ecff",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  counterBtnText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#4f46e5",
  },
  counterNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    minWidth: 20,
    textAlign: "center",
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

  // LISTA DE VIAJES
  tripsSection: {
    marginTop: 22,
  },
  tripsTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 10,
  },
  tripCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 10,
  },
  tripRoute: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },
  tripInfo: {
    marginTop: 4,
    fontSize: 13,
    color: "#4b5563",
  },
  tripNotes: {
    marginTop: 4,
    fontSize: 12,
    color: "#6b7280",
  },
});
