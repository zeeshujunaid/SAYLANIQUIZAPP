import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, doc, setDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importing icon library

export default function Signup({ navigation }) {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [center, setCenter] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = () => {
        if (email !== "" && password !== "") {
            setLoading(true);
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    console.log("🚀 ~ .then ~ user:", user);
                    setLoading(false);
                    alert("User Created Successfully");
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
                    const errorMessage = error.message;
                    alert(errorMessage);
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

                {/* Error Message */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {/* Sign Up Button */}
                <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                    {loading ? <ActivityIndicator size={50} color="#fff" /> : <Text style={styles.signupText}>Sign Up</Text>}
                </TouchableOpacity>

                {/* Login Link */}
                <TouchableOpacity onPress={() => router.push('/sign-in')}>
                    <Text style={styles.loginText}>Already have an account? Log In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4caf50',
    },
    container: {
        width: '90%',
        padding: 20,
        gap: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#4CAF50',
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#757575',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginVertical: 10,
        borderColor: '#4CAF50',
        borderWidth: 1,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        borderColor: '#4CAF50',
        borderWidth: 1,
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
    },
    signupButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    signupText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#FF0000',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
    loginText: {
        paddingTop: 20,
        color: '#4CAF50',
        fontSize: 16,
        textAlign: 'center',
    },
});
