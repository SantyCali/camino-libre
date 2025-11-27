// screens/passenger/ChatScreen.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { images } from "../../assets";
import { ImageBackground } from "react-native";

export default function ChatScreen({ route }) {
  const { trip } = route.params || {};
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      fromMe: false,
      text: "Hola! Gracias por sumarte al viaje 🙂",
    },
    {
      id: "2",
      fromMe: true,
      text: "Hola! Quería coordinar el punto de encuentro.",
    },
  ]);

  const scrollRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const msg = {
      id: Date.now().toString(),
      fromMe: true,
      text: input.trim(),
    };
    setMessages((prev) => [...prev, msg]);
    setInput("");
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 50);
  };

  return (
    <ImageBackground source={images.bgLogin} style={{ flex: 1 }} resizeMode="cover">
      <View style={styles.scrim} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        {/* Header chiquito con info del viaje */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>
              {trip?.driverName ?? "Conductor"}
            </Text>
            {trip ? (
              <Text style={styles.headerSub}>
                {trip.from} → {trip.to}
              </Text>
            ) : null}
          </View>
          <Ionicons name="shield-checkmark-outline" size={20} color="#e5e7eb" />
        </View>

        {/* Mensajes */}
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((m) => (
            <View
              key={m.id}
              style={[
                styles.bubble,
                m.fromMe ? styles.bubbleMe : styles.bubbleOther,
              ]}
            >
              <Text
                style={[
                  styles.bubbleText,
                  m.fromMe ? styles.bubbleTextMe : styles.bubbleTextOther,
                ]}
              >
                {m.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Input abajo */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.textInput}
            placeholder="Escribí un mensaje..."
            placeholderTextColor="#9ca3af"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15,23,42,0.52)",
  },
  header: {
    paddingTop: 18,
    paddingBottom: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  headerSub: {
    color: "#e5e7eb",
    fontSize: 13,
    marginTop: 2,
  },
  messagesContainer: {
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 12,
  },
  bubble: {
    maxWidth: "78%",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 4,
  },
  bubbleMe: {
    backgroundColor: "#6C5ED7",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: "#e5e7eb",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontSize: 14,
  },
  bubbleTextMe: {
    color: "#fff",
  },
  bubbleTextOther: {
    color: "#111827",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "rgba(15,23,42,0.85)",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#111827",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    color: "#fff",
    fontSize: 14,
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6C5ED7",
    alignItems: "center",
    justifyContent: "center",
  },
});
