// screens/passenger/Profile.js
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Platform,
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "../../constants/colors";
import { images } from "../../assets";
import { auth, storage } from "../../firebaseConfig";
import { fetchMyProfileRTDB, updateProfileRTDB } from "../../services/auth_rtdb";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [avatarUri, setAvatarUri] = useState(null);
  const [pendingAvatar, setPendingAvatar] = useState(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (current) => {
      setUser(current);
      if (!current) {
        setProfile(null);
        setLoadingProfile(false);
        return;
      }

      setLoadingProfile(true);
      const data = await fetchMyProfileRTDB(current.uid);
      setProfile(data);
      setDisplayName(data?.displayName || current.email?.split("@")[0] || "");
      setAvatarUri(data?.avatarUrl || null);
      setLoadingProfile(false);
    });

    return () => unsub();
  }, []);

  const activeSince = useMemo(() => {
    if (!profile?.createdAt && !user?.metadata?.creationTime) return "";

    const sourceDate = profile?.createdAt
      ? new Date(profile.createdAt)
      : new Date(user.metadata.creationTime);
    return sourceDate.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [profile?.createdAt, user?.metadata?.creationTime]);

  const actions = [
    { icon: "bookmarks-outline", label: "Viajes guardados" },
    {
      icon: "pencil-outline",
      label: editing ? "Editando perfil" : "Editar perfil",
      onPress: () => setEditing(true),
    },
    { icon: "settings-outline", label: "Configuración" },
  ];

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length) {
      const uri = result.assets[0].uri;
      setPendingAvatar(uri);
      setAvatarUri(uri);
      setRemoveAvatar(false);
      setEditing(true);
    }
  };

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length) {
      const uri = result.assets[0].uri;
      setPendingAvatar(uri);
      setAvatarUri(uri);
      setRemoveAvatar(false);
      setEditing(true);
    }
  };

  const clearPhoto = () => {
    setAvatarUri(null);
    setPendingAvatar(null);
    setRemoveAvatar(true);
    setEditing(true);
  };

  const handleAvatarActions = () => {
    const buttons = [
      { text: "Tomar foto", onPress: takePhoto },
      { text: "Elegir de la galería", onPress: pickImage },
    ];

    if (avatarUri) {
      buttons.unshift({ text: "Quitar foto", style: "destructive", onPress: clearPhoto });
    }

    buttons.push({ text: "Cancelar", style: "cancel" });

    Alert.alert("Foto de perfil", "Elegí cómo actualizar tu foto", buttons);
  };

  const uploadAvatar = async (uri, uid) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const avatarRef = storageRef(storage, `avatars/${uid}.jpg`);
    await uploadBytes(avatarRef, blob);
    return getDownloadURL(avatarRef);
  };

  const handleSave = async () => {
    if (!user?.uid) return;
    setSaving(true);
    try {
      let uploaded = profile?.avatarUrl || null;
      if (pendingAvatar) {
        uploaded = await uploadAvatar(pendingAvatar, user.uid);
      } else if (removeAvatar) {
        uploaded = null;
      }

      await updateProfileRTDB(user.uid, {
        displayName: displayName.trim() || user.email?.split("@")[0] || "",
        avatarUrl: uploaded,
      });

      setProfile((prev) => ({
        ...prev,
        displayName: displayName.trim() || user.email?.split("@")[0] || "",
        avatarUrl: uploaded,
      }));
      setPendingAvatar(null);
      setRemoveAvatar(false);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setDisplayName(profile?.displayName || user?.email?.split("@")[0] || "");
    setAvatarUri(profile?.avatarUrl || null);
    setPendingAvatar(null);
    setRemoveAvatar(false);
    setEditing(false);
  };

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Querés salir de tu cuenta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth);
          } catch (e) {
            console.log("signOut:", e);
          }
        },
      },
    ]);
  };

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
          {loadingProfile && (
            <View style={{ position: "absolute", top: 16, right: 16 }}>
              <ActivityIndicator color={COLORS.primary} />
            </View>
          )}
          <TouchableOpacity
            style={styles.avatarWrap}
            activeOpacity={0.8}
            onPress={handleAvatarActions}
            onPress={pickImage}
          >
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatarImg} />
            ) : (
              <Ionicons name="person" size={48} color="#3f1c6b" />
            )}
            <View style={styles.avatarBadge}>
              <Ionicons name="camera" size={14} color={COLORS.primary} />
            </View>
          </TouchableOpacity>

          {editing ? (
            <View style={{ width: "100%", alignItems: "center", gap: 10 }}>
              <TextInput
                value={displayName}
                onChangeText={setDisplayName}
                placeholder="Tu nombre"
                placeholderTextColor="#9aa0ad"
                style={styles.input}
              />
              <Text style={styles.helper}>Actualizá tu nombre y foto</Text>
            </View>
          ) : (
            <Text style={styles.name} numberOfLines={1}>
              {displayName || "Mi perfil"}
            </Text>
          )}

          <Text style={styles.email}>{user?.email || ""}</Text>
          {!!activeSince && (
            <Text style={styles.meta}>Pasajero activo desde {activeSince}</Text>
          )}

          {editing && (
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#f3f4f6" }]}
                onPress={handleCancel}
                disabled={saving}
              >
                <Text style={[styles.btnText, { color: COLORS.sub }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, { flex: 1 }]}
                onPress={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.btnText}>Guardar</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.list}>
          {actions.map((item) => (
            <TouchableOpacity
              key={item.icon}
              style={styles.row}
              activeOpacity={0.8}
              onPress={item.onPress}
            >
              <View style={styles.rowLeft}>
                <Ionicons name={item.icon} size={20} color={COLORS.primary} />
                <Text style={styles.rowLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#b5b9c4" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logout}
          activeOpacity={0.9}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#e53935" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

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
  avatarImg: {
    width: "100%",
    height: "100%",
    borderRadius: 48,
  },
  avatarBadge: {
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
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
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.text,
    backgroundColor: "#f8f9fb",
  },
  helper: {
    fontSize: 12,
    color: COLORS.sub,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
  },
  btn: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    minWidth: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
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
  logout: {
    marginTop: -4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 14,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#e53935",
  },
});
