import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Header from "../../components/Header"; // Import the Header component
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const uiuxQuestions = [
    {
        question: "What does UX stand for?",
        options: [
            "User Experience",
            "User Expertise",
            "User Extension",
            "User Exploration",
        ],
        correctAnswer: "User Experience",
    },
    {
        question: "Which principle is NOT a part of UI design?",
        options: [
            "Consistency",
            "Clarity",
            "Color",
            "Complexity",
        ],
        correctAnswer: "Complexity",
    },
    {
        question: "What is the purpose of wireframing?",
        options: [
            "To create detailed visual designs",
            "To outline the structure of a page",
            "To measure user satisfaction",
            "To select a color scheme",
        ],
        correctAnswer: "To outline the structure of a page",
    },
    {
        question: "What does UI stand for?",
        options: [
            "User Interface",
            "Universal Interaction",
            "User Interaction",
            "Unified Interface",
        ],
        correctAnswer: "User Interface",
    },
    {
        question: "What is the primary focus of UX design?",
        options: [
            "Aesthetics",
            "User satisfaction",
            "Color schemes",
            "Coding standards",
        ],
        correctAnswer: "User satisfaction",
    },
    {
        question: "What is a persona in UX design?",
        options: [
            "A fictional representation of a user",
            "A software tool for design",
            "A type of color scheme",
            "An analytics report",
        ],
        correctAnswer: "A fictional representation of a user",
    },
    {
        question: "What is the purpose of a usability test?",
        options: [
            "To test the functionality of code",
            "To assess how easily users can navigate a design",
            "To select the best color scheme",
            "To ensure responsiveness on mobile devices",
        ],
        correctAnswer: "To assess how easily users can navigate a design",
    },
    {
        question: "What is a design system?",
        options: [
            "A set of guidelines for consistent design",
            "A coding framework for developers",
            "A file format for sharing designs",
            "An algorithm for user testing",
        ],
        correctAnswer: "A set of guidelines for consistent design",
    },
    {
        question: "Which tool is commonly used for prototyping in UI/UX design?",
        options: [
            "Sketch",
            "Excel",
            "Visual Studio Code",
            "Git",
        ],
        correctAnswer: "Sketch",
    },
    {
        question: "Which of these is an example of a low-fidelity prototype?",
        options: [
            "A paper sketch",
            "A fully functional app",
            "A colorized webpage",
            "An animated logo",
        ],
        correctAnswer: "A paper sketch",
    },
    {
        question: "What is the purpose of a heatmap in UX research?",
        options: [
            "To track user interactions",
            "To select color schemes",
            "To analyze network performance",
            "To evaluate code quality",
        ],
        correctAnswer: "To track user interactions",
    },
    {
        question: "What is the main goal of accessibility in design?",
        options: [
            "To make the product usable for everyone",
            "To improve speed",
            "To reduce development cost",
            "To increase visual appeal",
        ],
        correctAnswer: "To make the product usable for everyone",
    },
    {
        question: "What does a sitemap represent in UX design?",
        options: [
            "The structure of a website",
            "The visual design of pages",
            "The user demographics",
            "The navigation patterns",
        ],
        correctAnswer: "The structure of a website",
    },
    {
        question: "Which term refers to the spacing between characters in typography?",
        options: [
            "Kerning",
            "Leading",
            "Tracking",
            "Baseline",
        ],
        correctAnswer: "Kerning",
    },
    {
        question: "What is the Z-pattern in design?",
        options: [
            "A visual path for users in layouts",
            "A type of navigation style",
            "A method for selecting colors",
            "An algorithm for user testing",
        ],
        correctAnswer: "A visual path for users in layouts",
    },
    {
        question: "Which color model is commonly used in digital design?",
        options: [
            "RGB",
            "CMYK",
            "PMS",
            "HSB",
        ],
        correctAnswer: "RGB",
    },
    {
        question: "What is the main purpose of a call-to-action (CTA)?",
        options: [
            "To encourage users to take a specific action",
            "To decorate the webpage",
            "To test user behavior",
            "To align text elements",
        ],
        correctAnswer: "To encourage users to take a specific action",
    },
    {
        question: "What is the primary use of Figma in UI/UX design?",
        options: [
            "Prototyping and collaboration",
            "Code testing",
            "SEO optimization",
            "Database management",
        ],
        correctAnswer: "Prototyping and collaboration",
    },
    {
        question: "Which principle is part of Gestalt design theory?",
        options: [
            "Proximity",
            "Functionality",
            "Speed",
            "Hierarchy",
        ],
        correctAnswer: "Proximity",
    },
    {
        question: "Which UX method involves observing users in their environment?",
        options: [
            "Contextual inquiry",
            "A/B testing",
            "Usability testing",
            "Card sorting",
        ],
        correctAnswer: "Contextual inquiry",
    },
    {
        question: "What does a responsive design adapt to?",
        options: [
            "Different screen sizes and devices",
            "Network speeds",
            "User input methods",
            "Programming languages",
        ],
        correctAnswer: "Different screen sizes and devices",
    },
    {
        question: "Which of the following is a UX research method?",
        options: [
            "User interviews",
            "Typography selection",
            "Color theory",
            "Algorithm design",
        ],
        correctAnswer: "User interviews",
    },
    {
        question: "What is the purpose of user onboarding?",
        options: [
            "To help new users understand the product",
            "To debug the app",
            "To track user data",
            "To test server performance",
        ],
        correctAnswer: "To help new users understand the product",
    },
];


const quizname = "UI/UX Design"; // Set the quiz name

export default function UIUXQuiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);

    const currentQuestion = uiuxQuestions[currentQuestionIndex];

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNext = () => {
        // Show the toast notification to warn the user not to go back
        Toast.show({
            type: 'info',
            text1: 'DON\'T GO BACK!',
            text2: 'If you go back, you will lose all your progress!',
        });

        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }
        setSelectedAnswer(null);
        if (currentQuestionIndex < uiuxQuestions.length - 1) {
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

    const handleDontSave = () => {
        setModalVisible(false); // Close the modal without saving the result
    };
    
    const handleCloseModal = () => {
        setModalVisible(false); // Close the modal
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
                            {currentQuestionIndex === uiuxQuestions.length - 1 ? "Finish" : "Next"}
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
                        {uiuxQuestions.length}.
                    </Text>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity style={styles.modalButton} onPress={handleSaveResult}>
                            <Text style={styles.modalButtonText}>Save Result</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={handleDontSave}>
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
