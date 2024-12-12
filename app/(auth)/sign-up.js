import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, doc, setDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importing icon library
import Toast from 'react-native-toast-message'; // Import Toast

export default function Signup({ navigation }) {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [center, setCenter] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
    const [loading, setLoading] = useState(false);

    const handleSignup = () => {
        if (email !== "" && password !== "") {
            setLoading(true);
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    console.log("🚀 ~ .then ~ user:", user);
                    setLoading(false);

                    // Show success toast
                    Toast.show({
                        type: 'success',
                        text1: 'Account Created',
                        text2: 'Welcome to Saylani Quiz App!',
                    });

                    await AsyncStorage.setItem("info", JSON.stringify(user.uid));
                    await setDoc(doc(collection(db, "users"), user.uid), {
                        email: email,
                        uid: user.uid,
                        center: center,
                    });

                    router.push('/(tabs)/');
                    setName("");
                    setEmail("");
                    setCenter("");
                    setPassword("");
                })
                .catch((error) => {
                    setLoading(false);

                    // Show error toast
                    Toast.show({
                        type: 'error',
                        text1: 'Signup Failed',
                        text2: error.message,
                    });
                });
        } else {
            // Show error toast if fields are empty
            Toast.show({
                type: 'error',
                text1: 'Invalid Input',
                text2: 'Please fill out all fields.',
            });
        }
    };

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Saylani Quiz App</Text>
                <Text style={styles.subtitle}>Sign up to start quizzing!</Text>

                {/* Name Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="#4CAF50"
                    value={name}
                    onChangeText={setName}
                />

                {/* Email Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#4CAF50"
                    value={email}
                    onChangeText={setEmail}
                />

                {/* City Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Center"
                    placeholderTextColor="#4CAF50"
                    value={center}
                    onChangeText={setCenter}
                />

                {/* Password Input */}
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        placeholderTextColor="#4CAF50"
                        secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)} // Toggle showPassword state
                    >
                        <Icon
                            name={showPassword ? "eye-off" : "eye"} // Change icon based on state
                            size={24}
                            color="#4CAF50"
                        />
                    </TouchableOpacity>
                </View>

                {/* Sign Up Button */}
                <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                    {loading ? <ActivityIndicator size={50} color="#fff" /> : <Text style={styles.signupText}>Sign Up</Text>}
                </TouchableOpacity>

                {/* Login Link */}
                <TouchableOpacity onPress={() => router.push('/sign-in')}>
                    <Text style={styles.loginText}>Already have an account? Log In</Text>
                </TouchableOpacity>
            </View>

            {/* Toast Component */}
            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    // ... (Styles remain the same)
});
