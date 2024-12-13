import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, doc, setDoc } from "firebase/firestore";
import Toast from "react-native-toast-message"; // Import Toast
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Import icon library

export default function Signup({ navigation }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [center, setCenter] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    if (email !== "" && password !== "") {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          setLoading(false);

          Toast.show({
            type: "success",
            text1: "Account Created",
            text2: "Welcome to Saylani Quiz App!",
          });

          await AsyncStorage.setItem(
            "info",
            JSON.stringify({
              email: email,
              name: name,
              uid: user.uid,
              center: center,
            })
          );

          await setDoc(doc(collection(db, "users"), user.uid), {
            email: email,
            name: name,
            uid: user.uid,
            center: center,
          });

          router.push("/(tabs)/");
          setName("");
          setEmail("");
          setCenter("");
          setPassword("");
        })
        .catch((error) => {
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Signup Failed",
            text2: error.message,
          });
        });
    } else {
      Toast.show({
        type: "error",
        text1: "Invalid Input",
        text2: "Please fill out all fields.",
      });
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Saylani Quiz App</Text>
        <Text style={styles.subtitle}>Sign up to start quizzing!</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#4CAF50"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#4CAF50"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Center"
          placeholderTextColor="#4CAF50"
          value={center}
          onChangeText={setCenter}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#4CAF50"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#4CAF50"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.signupText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/sign-in")}>
          <Text style={styles.loginText}>Already have an account? Log In</Text>
        </TouchableOpacity>

        <Toast />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#e8f5e9", // Light green background
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "#4CAF50",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    width: "90%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#4CAF50",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    color: "#000",
  },
  signupButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 12,
  },
  signupText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 12,
    fontSize: 14,
    color: "#4CAF50",
    textDecorationLine: "underline",
  },
});
