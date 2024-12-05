import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { auth } from "../../utils/firebase"; // Adjust according to your file structure
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    function handleSignIn() {
        if (email !== "" && password !== "") {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    setLoading(false);
                    router.push("/(tabs)"); // Redirect to app dashboard
                    alert("Login Successful!");
                    await AsyncStorage.setItem("info", JSON.stringify(user.uid));
                    setEmail("");
                    setPassword("");
                })
                .catch((error) => {
                    setLoading(false);
                    alert("Error logging in. Please check your credentials.");
                });
        } else {
            alert("Please fill in all the fields");
        }
    }

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.heading}>Welcome Back!</Text>
                <Text style={styles.subheading}>Sign in to continue your quiz journey</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#808080"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    value={email}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#808080"
                    secureTextEntry
                    onChangeText={setPassword}
                    value={password}
                />

                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    {loading ? <ActivityIndicator size={50} color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
                </TouchableOpacity>

                <Text style={styles.footerText}>
                    New to the Quiz App?{" "}
                    <Text style={styles.linkText} onPress={() => router.push('/sign-up')}>
                        Create an account
                    </Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Light grey background color
    },
    container: {
        width: '85%',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.85)', // Slightly transparent for a soft feel
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    heading: {
        fontSize: 30,
        color: '#33CC33', // Green color to match your theme
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subheading: {
        fontSize: 18,
        color: '#555555',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 15,
        marginBottom: 15,
        borderColor: '#33CC33', // Green border to match the button
        borderWidth: 1,
        borderRadius: 8,
        color: '#333333',
        backgroundColor: '#FFF',
        fontSize: 16,
    },
    button: {
        width: '100%',
        paddingVertical: 15,
        backgroundColor: '#33CC33', // Green for the button to match the theme
        borderRadius: 25,
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    footerText: {
        fontSize: 14,
        color: '#33CC33', // Green footer text
        textAlign: 'center',
    },
    linkText: {
        color: '#33CC33', // Green color for the link
        fontWeight: 'bold',
    },
});
