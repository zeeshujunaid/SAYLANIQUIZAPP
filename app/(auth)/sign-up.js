import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, doc, setDoc } from "firebase/firestore"; 

export default function Signup({ navigation }) {

    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [center, setCenter] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = () => {
        if (email != "" && password != "") {
            setLoading(true);
            createUserWithEmailAndPassword(auth, email, password,center)
                .then(async(userCredential) => {
                    const user = userCredential.user;
                    console.log("🚀 ~ .then ~ user:", user)
                    setLoading(false);
                    alert("User Created Successfully");
                    await AsyncStorage.setItem("info", JSON.stringify(user.uid))
                    await setDoc(doc(collection(db, "users"), user.uid), {
                        email: email,
                        uid: user.uid,
                        center:center
                    });
                    router.push('/(tabs)/');
                    setName("");
                    setEmail("");
                    setCenter("");
                    setPassword("");
                })
                .catch((error) => {
                    setLoading(false);
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage , errorCode)
                });

        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://your-image-url.com' }} // Add a suitable background image for the Saylani Quiz App
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Saylani Quiz App</Text>
                <Text style={styles.subtitle}>Sign up to start quizzing!</Text>

                {/* Name Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="#4CAF50" // Updated to a more quiz-friendly green color
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
                    placeholder="center"
                    placeholderTextColor="#4CAF50"
                    value={center}
                    onChangeText={setCenter}
                />
                
                {/* Password Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#4CAF50"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

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
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    container: {
        width: '90%',
        padding: 20,
        gap: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight opacity for background
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#4CAF50', // Green shadow to match quiz theme
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4CAF50', // Green color to match quiz theme
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
    signupButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#4CAF50', // Green button color for the quiz theme
        borderRadius: 10,
        justifyContent: 'center',
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
