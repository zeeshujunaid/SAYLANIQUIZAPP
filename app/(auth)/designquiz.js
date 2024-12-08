import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Header from "../../components/Header"; // Import the Header component
import { router } from 'expo-router';

// UI/UX-related questions
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
];

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

    const handleCloseModal = () => {
        setModalVisible(false);
        // Reset the quiz or navigate to another screen
        router.push('/(tabs)');
    };

    return (
        <View style={styles.container}>
            {/* Fixed Header */}
            <Header />

            {/* Quiz Content */}
            <View style={styles.content}>
                <Text style={styles.questionText}>{currentQuestion.question}</Text>
                <View style={styles.optionsContainer}>
                    {currentQuestion.options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.optionButton,
                                selectedAnswer === option && styles.selectedOption,
                            ]}
                            onPress={() => handleAnswerSelect(option)}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {selectedAnswer && (
                    <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                        <Text style={styles.nextButtonText}>
                            {currentQuestionIndex === uiuxQuestions.length - 1
                                ? "Finish"
                                : "Next"}
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
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={handleCloseModal}
                    >
                        <Text style={styles.modalButtonText}>Close</Text>
                    </TouchableOpacity>
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
    modalButton: {
        backgroundColor: "#388E3C", // Dark green for modal button
        padding: 10,
        borderRadius: 8,
        width: "60%",
        alignItems: "center",
    },
    modalButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});
