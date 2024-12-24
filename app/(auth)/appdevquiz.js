import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Header from "../../components/Header"; // Import the Header component
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// App development-related questions
const appDevQuestions = [
    {
        question: "What is the purpose of a constructor in React?",
        options: [
            "To initialize component state",
            "To define a function",
            "To handle user input",
            "To update the UI",
        ],
        correctAnswer: "To initialize component state",
    },
    {
        question: "Which of the following is true about React Native?",
        options: [
            "It uses Java for mobile apps",
            "It runs on both Android and iOS",
            "It uses only Swift for iOS development",
            "It is used for web development",
        ],
        correctAnswer: "It runs on both Android and iOS",
    },
    {
        question: "Which hook is used to manage state in a functional component?",
        options: [
            "useState",
            "useEffect",
            "useContext",
            "useReducer",
        ],
        correctAnswer: "useState",
    },
    {
        question: "What does JSX stand for in React?",
        options: [
            "JavaScript XML",
            "Java Syntax Extension",
            "JavaScript Extension",
            "Java Simple XML",
        ],
        correctAnswer: "JavaScript XML",
    },
    {
        question: "What is the default state management library in React Native?",
        options: [
            "Redux",
            "MobX",
            "Context API",
            "React Native doesn't have a default state management library",
        ],
        correctAnswer: "React Native doesn't have a default state management library",
    },
    {
        question: "Which of the following is not a lifecycle method in React?",
        options: [
            "componentDidMount",
            "componentWillUnmount",
            "componentDidUpdate",
            "componentWillUpdateAsync",
        ],
        correctAnswer: "componentWillUpdateAsync",
    },
    {
        question: "What is the purpose of the `useEffect` hook in React?",
        options: [
            "To manage state",
            "To run side effects",
            "To handle routing",
            "To bind event handlers",
        ],
        correctAnswer: "To run side effects",
    },
    {
        question: "Which command is used to create a new React app?",
        options: [
            "npx create-react-app my-app",
            "npm start",
            "npm install react",
            "react-init my-app",
        ],
        correctAnswer: "npx create-react-app my-app",
    },
    {
        question: "Which company developed React Native?",
        options: [
            "Google",
            "Facebook",
            "Microsoft",
            "Apple",
        ],
        correctAnswer: "Facebook",
    },
    {
        question: "What does the `FlatList` component in React Native do?",
        options: [
            "Displays a list of data efficiently",
            "Creates a button",
            "Handles animations",
            "Manages navigation",
        ],
        correctAnswer: "Displays a list of data efficiently",
    },
    {
        question: "What is the purpose of the `key` prop in React?",
        options: [
            "To uniquely identify elements in a list",
            "To manage event handlers",
            "To style components",
            "To pass state between components",
        ],
        correctAnswer: "To uniquely identify elements in a list",
    },
    {
        question: "What is the default port for running a React app locally?",
        options: [
            "3000",
            "8080",
            "8000",
            "5000",
        ],
        correctAnswer: "3000",
    },
    {
        question: "Which of the following is used for navigation in React Native?",
        options: [
            "React Navigation",
            "React Router",
            "Redux Navigator",
            "MobX",
        ],
        correctAnswer: "React Navigation",
    },
    {
        question: "What does the `setState` function do in React?",
        options: [
            "Updates the component's state",
            "Renders the component",
            "Binds an event handler",
            "Unmounts the component",
        ],
        correctAnswer: "Updates the component's state",
    },
    {
        question: "What is the primary programming language for React Native?",
        options: [
            "JavaScript",
            "Java",
            "Swift",
            "C#",
        ],
        correctAnswer: "JavaScript",
    },
    {
        question: "Which command is used to start a React Native project?",
        options: [
            "npx react-native run-android",
            "npm start",
            "expo start",
            "react-native-init",
        ],
        correctAnswer: "expo start",
    },
    {
        question: "What is the purpose of the `useContext` hook?",
        options: [
            "To consume context values",
            "To manage state",
            "To handle side effects",
            "To fetch data",
        ],
        correctAnswer: "To consume context values",
    },
    {
        question: "Which tool is commonly used for debugging React Native apps?",
        options: [
            "React Developer Tools",
            "Visual Studio Code",
            "Expo Go",
            "Chrome Developer Tools",
        ],
        correctAnswer: "React Developer Tools",
    },
    {
        question: "What is the purpose of the `StyleSheet` API in React Native?",
        options: [
            "To define and manage component styles",
            "To create custom animations",
            "To handle state",
            "To manage routing",
        ],
        correctAnswer: "To define and manage component styles",
    },
    {
        question: "What is the purpose of the `Virtual DOM` in React?",
        options: [
            "To improve app performance by minimizing real DOM updates",
            "To render components to the browser",
            "To manage routing",
            "To handle animations",
        ],
        correctAnswer: "To improve app performance by minimizing real DOM updates",
    },
    {
        question: "Which library is commonly used for managing global state in React?",
        options: [
            "Redux",
            "React Router",
            "Axios",
            "MobX",
        ],
        correctAnswer: "Redux",
    },
    {
        question: "What is the purpose of `Props` in React?",
        options: [
            "To pass data from parent to child components",
            "To manage state",
            "To define lifecycle methods",
            "To handle errors",
        ],
        correctAnswer: "To pass data from parent to child components",
    },
    {
        question: "Which component is used for user input in React Native?",
        options: [
            "TextInput",
            "InputField",
            "UserInput",
            "EditText",
        ],
        correctAnswer: "TextInput",
    },
];


const quizname = "App Development"; // Set the quiz name

export default function AppDevQuiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);

    const currentQuestion = appDevQuestions[currentQuestionIndex];

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNext = () => {
        Toast.show({
            type: 'info',
            text1: 'DON\'T GO BACK!',
            text2: 'If you go back, you will lose all your progress!',
        });

        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }
        setSelectedAnswer(null);
        if (currentQuestionIndex < appDevQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setModalVisible(true); // Show the modal when quiz finishes
        }
    };

    const handleSaveResult = async () => {
        try {
            // Retrieve existing results from AsyncStorage
            const storedResults = await AsyncStorage.getItem("quizResults");
            const existingResults = storedResults ? JSON.parse(storedResults) : [];
    
            // Add the current result to the existing results
            const newResult = {
                quizName: quizname,
                score: score,
            };
            const updatedResults = [...existingResults, newResult];
    
            // Save the updated results array back to AsyncStorage
            await AsyncStorage.setItem("quizResults", JSON.stringify(updatedResults));
    
            Toast.show({
                type: 'success',
                text1: 'Result Saved!',
                text2: `Your score ${score} for ${quizname} quiz has been saved.`,
            });
    
            setModalVisible(false); // Close the modal
            router.push('/(tabs)'); // Navigate to tabs screen
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error saving result!',
                text2: 'Please try again.',
            });
        }
    };
    
    const handleCloseModal = () => {
        setModalVisible(false);
        router.push('/(tabs)'); // Close modal and navigate to tabs screen
    };

    return (
        <View style={styles.container}>
            {/* Fixed Header */}
            {/* <Header /> */}

            {/* Quiz Content */}
            <View style={styles.content}>
                <Text style={styles.questionText}>Q:{currentQuestion.question}</Text>
                <View style={styles.optionsContainer}>
                   {currentQuestion.options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.optionButton, selectedAnswer === option && styles.selectedOption]}
                            onPress={() => handleAnswerSelect(option)}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {selectedAnswer && (
                    <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                        <Text style={styles.nextButtonText}>
                            {currentQuestionIndex === appDevQuestions.length - 1 ? "Finish" : "Next"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Modal for showing the final score */}
            <Modal isVisible={isModalVisible} onBackdropPress={handleCloseModal}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Quiz Complete!</Text>
                    <Text style={styles.modalText}>
                        Your score is <Text style={styles.modalScore}>{score}</Text> out of{" "}
                        {appDevQuestions.length}.
                    </Text>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity style={styles.modalButton} onPress={handleSaveResult}>
                            <Text style={styles.modalButtonText}>Save Result</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
                            <Text style={styles.modalButtonText}>Don't Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8F5E9", // Light green background
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    questionText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#388E3C", // Dark green for the question text
        marginBottom: 20,
    },
    optionsContainer: {
        marginBottom: 20,
    },
    optionButton: {
        padding: 15,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        marginVertical: 8,
        elevation: 2,
    },
    selectedOption: {
        backgroundColor: "#81C784", // Medium green for selected option
    },
    optionText: {
        fontSize: 18,
        color: "#388E3C", // Dark green for option text
    },
    nextButton: {
        backgroundColor: "#388E3C", // Dark green for next button
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    nextButtonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    modalContainer: {
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        elevation: 5,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#388E3C", // Dark green for modal title
        marginBottom: 10,
    },
    modalText: {
        fontSize: 18,
        color: "#4CAF50", // Slightly lighter green for modal text
        textAlign: "center",
        marginBottom: 20,
    },
    modalScore: {
        fontWeight: "bold",
        color: "#2E7D32", // Darker green for score in modal
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    modalButton: {
        backgroundColor: "#388E3C", // Dark green for modal button
        padding: 10,
        borderRadius: 8,
        width: "45%",
        alignItems: "center",
        marginVertical: 5,
    },
    modalButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});
