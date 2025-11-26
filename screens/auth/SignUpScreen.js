// screens/auth/SignUpScreen.js
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
  Alert, // ⬅️ agregado
} from "react-native";
import { images } from "../../assets";
import { signUpWithProfileRTDB } from "../../services/auth_rtdb"; // ⬅️ agregado

const COLORS = {
  primary: "#6C5ED7",
  text: "#0f172a",
  sub: "#475569",
  card: "rgba(255,255,255,0.88)",
  border: "rgba(15,23,42,0.08)",
};

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [loading, setLoading] = useState(false); // ⬅️ opcional

  const handleSignUp = async () => {
    // validaciones básicas
    if (!email.trim() || !pass.trim() || !pass2.trim()) {
      return Alert.alert("Completá todos los campos");
    }
    if (pass !== pass2) {
      return Alert.alert("Las contraseñas no coinciden");
    }
    if (pass.length < 6) {
      return Alert.alert("La contraseña debe tener al menos 6 caracteres");
    }

    try {
      setLoading(true);
      await signUpWithProfileRTDB({
        email,
        password: pass,
        // podés sumar más campos si luego los agregás al form
        extra: { displayName: email.split("@")[0] },
      });
      setLoading(false);
      // Lleva a Home (asegurate de tener la ruta "Home" en tu navigator)
      navigation.replace("Home");
    } catch (e) {
      setLoading(false);
      Alert.alert("Error al crear la cuenta", e.message);
    }
  };

  return (
    <ImageBackground source={images.bgLogin} style={styles.bg} resizeMode="cover">
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        {/* capa oscura */}
        <View style={styles.overlay} />

        <View style={styles.screen}>
          <View style={styles.card}>
            {/* LOGO */}
            <View style={styles.logoWrap}>
              <Image source={images.logo} style={styles.logo} resizeMode="contain" />
            </View>

            {/* FORMULARIO */}
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

              <Text style={[styles.label, { marginTop: 14 }]}>Repetir contraseña</Text>
              <TextInput
                value={pass2}
                onChangeText={setPass2}
                placeholder="••••••••"
                placeholderTextColor="#94a3b8"
                style={styles.input}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.btn} onPress={handleSignUp} disabled={loading}>
              <Text style={styles.btnText}>{loading ? "Creando..." : "Crear cuenta"}</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              ¿Ya tenés cuenta?{" "}
              <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
                Iniciar sesión
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

  // igual que el login, centrado y con aire
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    minHeight: "66%", // más alta como el login
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
    width: 180, // más grande
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: -80, // lo sube un poco
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
