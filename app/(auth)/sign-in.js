import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase"; // Adjust according to your file structure
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import Toast from 'react-native-toast-message'; // Import Toast

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [loading, setLoading] = useState(false);

    function handleSignIn() {
        if (email !== "" && password !== "") {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    setLoading(false);
                    router.push("/(tabs)"); // Redirect to app dashboard
                    
                    // Show success toast
                    Toast.show({
                        type: 'success',
                        text1: 'Login Successful!',
                        text2: 'Welcome back to the Quiz App.',
                    });

                    await AsyncStorage.setItem("info", JSON.stringify(user.uid));
                    setEmail("");
                    setPassword("");
                })
                .catch((error) => {
                    setLoading(false);
                    // Show error toast
                    Toast.show({
                        type: 'error',
                        text1: 'Error logging in',
                        text2: 'Please check your credentials.',
                    });
                });
        } else {
            // Show error toast if fields are empty
            Toast.show({
                type: 'error',
                text1: 'Invalid Input',
                text2: 'Please fill in all the fields.',
            });
        }
    }

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.heading}>Welcome Back!</Text>
                <Text style={styles.subheading}>Sign in to continue your quiz journey</Text>

                {/* Email Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#808080"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    value={email}
                />

                {/* Password Input with Eye Icon */}
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputWithIcon}
                        placeholder="Password"
                        placeholderTextColor="#808080"
                        secureTextEntry={!showPassword} // Toggle visibility
                        onChangeText={setPassword}
                        value={password}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <FontAwesome
                            name={showPassword ? "eye-slash" : "eye"} // Show correct icon
                            size={24}
                            color="#808080"
                        />
                    </TouchableOpacity>
                </View>

                {/* Sign-In Button */}
                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    {loading ? <ActivityIndicator size={50} color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
                </TouchableOpacity>

                {/* Footer Text */}
                <Text style={styles.footerText}>
                    New to the Quiz App?{" "}
                    <Text style={styles.linkText} onPress={() => router.push("/sign-up")}>
                        Create an account
                    </Text>
                </Text>
            </View>

            {/* Toast Component */}
            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E8F5E9", // Light green background
    },
    container: {
        width: "85%",
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 15,
        borderWidth: 2, // Add border width
        borderColor: "#33CC33", // Slight green border to match your theme
        alignItems: "center",
        elevation: 0, // Ensure no shadow is present
        backgroundColor: "transparent", // Keep the background transparent
    },
    
    heading: {
        fontSize: 30,
        color: "#33CC33", // Green color to match your theme
        fontWeight: "bold",
        marginBottom: 10,
    },
    subheading: {
        fontSize: 18,
        color: "#555555",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        width: "100%",
        padding: 15,
        marginBottom: 15,
        borderColor: "#33CC33", // Green border to match the button
        borderWidth: 1,
        borderRadius: 8,
        color: "#333333",
        backgroundColor: "#FFF",
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderColor: "#33CC33",
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "#FFF",
        marginBottom: 15,
        paddingRight: 10,
    },
    inputWithIcon: {
        flex: 1,
        padding: 15,
        color: "#333333",
        fontSize: 16,
    },
    button: {
        width: "100%",
        paddingVertical: 15,
        backgroundColor: "#33CC33", // Green for the button to match the theme
        borderRadius: 25,
        alignItems: "center",
        marginVertical: 20,
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
    footerText: {
        fontSize: 14,
        color: "#33CC33", // Green footer text
        textAlign: "center",
    },
    linkText: {
        color: "#33CC33", // Green color for the link
        fontWeight: "bold",
    },
});
