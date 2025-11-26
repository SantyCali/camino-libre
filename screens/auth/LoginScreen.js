// screens/auth/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Switch,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { images } from "../../assets";
import { signInEmailRTDB, fetchMyProfileRTDB } from "../../services/auth_rtdb";
import { auth } from "../../firebaseConfig";

const COLORS = {
  primary: "#6C5ED7",
  text: "#0f172a",
  sub: "#475569",
  card: "rgba(255,255,255,0.88)",
  border: "rgba(15,23,42,0.08)",
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true); // ✅ Mantener sesión

  const handleLogin = async () => {
    if (!email.trim() || !pass.trim()) {
      return Alert.alert("Error", "Completá los campos");
    }

    try {
      setLoading(true);

      // 1️⃣ Login con Firebase
      await signInEmailRTDB(email, pass);

      // 2️⃣ Traemos el perfil
      const uid = auth.currentUser?.uid;
      const perfil = uid ? await fetchMyProfileRTDB(uid) : null;

      // 3️⃣ Guardamos la preferencia
      await AsyncStorage.setItem("remember", remember ? "1" : "0");

      setLoading(false);
      Alert.alert("Bienvenido", perfil?.displayName || "Usuario");

      // 4️⃣ Navegamos al Home
      navigation.replace("Home");
    } catch (e) {
      setLoading(false);
      Alert.alert("Error", e.message);
    }
  };

  return (
    <ImageBackground source={images.bgLogin} style={styles.bg} resizeMode="cover">
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* capa oscura */}
        <View style={styles.overlay} />

        <View style={styles.screen}>
          <View style={styles.card}>
            {/* logo */}
            <View style={styles.logoWrap}>
              <Image
                source={images.logo}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* campos */}
            <View style={styles.form}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="email@ejemplo.com"
                placeholderTextColor="#94a3b8"
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <Text style={[styles.label, { marginTop: 14 }]}>Contraseña</Text>
              <TextInput
                value={pass}
                onChangeText={setPass}
                placeholder="••••••••"
                placeholderTextColor="#94a3b8"
                style={styles.input}
                secureTextEntry
              />
            </View>

            {/* switch de recordar */}
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}>
              <Switch value={remember} onValueChange={setRemember} />
              <Text style={{ marginLeft: 8, color: COLORS.sub }}>Mantener sesión iniciada</Text>
            </View>

            {/* botón login */}
            <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={loading}>
              <Text style={styles.btnText}>
                {loading ? "Ingresando..." : "Iniciar sesión"}
              </Text>
            </TouchableOpacity>

            {/* footer */}
            <Text style={styles.footerText}>
              ¿No tenés cuenta?{" "}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate("SignUp")}
              >
                Crear una
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10,16,28,0.34)",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    minHeight: "62%",
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  logoWrap: {
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 14,
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: -80,
    marginBottom: 18,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  logo: { width: "100%", height: "100%" },
  form: { width: "100%", marginTop: 4, flexGrow: 1 },
  label: { color: COLORS.sub, fontSize: 13, marginBottom: 6 },
  input: {
    height: 46,
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    color: COLORS.text,
    marginBottom: 8,
  },
  btn: {
    marginTop: 20,
    height: 54,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  footerText: { marginTop: 14, color: COLORS.sub, textAlign: "center" },
  link: { color: COLORS.primary, fontWeight: "700" },
});
