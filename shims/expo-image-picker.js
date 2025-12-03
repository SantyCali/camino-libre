import { Alert } from "react-native";

const installMessage =
  "expo-image-picker no está instalado. Ejecuta `npx expo install expo-image-picker` para habilitar la selección de fotos.";

const warnUnavailable = () => {
  console.warn(installMessage);
  Alert.alert("Image Picker no disponible", installMessage);
};

export const MediaTypeOptions = { Images: "Images" };

export async function requestMediaLibraryPermissionsAsync() {
  warnUnavailable();
  return { status: "denied", granted: false };
}

export async function launchImageLibraryAsync() {
  warnUnavailable();
  return { canceled: true };
}
