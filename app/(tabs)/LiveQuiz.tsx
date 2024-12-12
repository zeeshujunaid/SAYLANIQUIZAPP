import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function LiveQuiz() {
    const [quizCode, setQuizCode] = useState("");
    const router = useRouter();

    const handleSubmit = () => {
        if (quizCode.trim() === "") {
            Alert.alert("Error", "Please enter a quiz code to proceed.");
        } else {
            // Validate or process the quiz code here
            // For now, we'll assume it's valid and navigate to the quiz screen
            router.push(`../LiveQuiz`); // Replace with your quiz page route
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Join a Live Quiz</Text>
            <Text style={styles.subheading}>Enter your quiz code to start the quiz!</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Enter Quiz Code"
                placeholderTextColor="#808080"
                onChangeText={setQuizCode}
                value={quizCode}
            />
            
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Start Quiz</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#E8F5E9", // Light background color
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#33CC33", // Green color for theme
        marginBottom: 10,
    },
    subheading: {
        fontSize: 16,
        color: "#555555",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        width: "100%",
        padding: 15,
        marginBottom: 20,
        borderColor: "#33CC33", // Green border
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 16,
        color: "#333333", // Dark text
        backgroundColor: "#FFF", // White input background
    },
    button: {
        width: "100%",
        paddingVertical: 15,
        backgroundColor: "#33CC33", // Green button
        borderRadius: 25,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 18,
        color: "#FFF",
        fontWeight: "bold",
    },
});
