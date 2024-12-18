import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Header from "../../components/Header"; // Import the Header component
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage


const marketingQuestions = [
    {
        question: "What is the primary goal of marketing?",
        options: [
            "Increase brand awareness",
            "Drive sales",
            "Engage customers",
            "All of the above",
        ],
        correctAnswer: "All of the above",
    },
    {
        question: "Which is a digital marketing strategy?",
        options: [
            "SEO",
            "Content Marketing",
            "Email Campaigns",
            "All of the above",
        ],
        correctAnswer: "All of the above",
    },
    {
        question: "What does PPC stand for?",
        options: [
            "Pay Per Click",
            "Purchase Per Client",
            "Paid Promotions Campaign",
            "Public Promotion Costs",
        ],
        correctAnswer: "Pay Per Click",
    },
];
const quizname = "Digital Marketing"

export default function MarketingQuiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);

    const currentQuestion = marketingQuestions[currentQuestionIndex];

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNext = () => {
        Toast.show({
            type: 'info',
            text1: 'DONT GO BACK!',
            text2: 'If you go back, you will lose all your progress!',
        });

        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }
        setSelectedAnswer(null);
        if (currentQuestionIndex < marketingQuestions.length - 1) {
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
        setModalVisible(false);
        router.push('/(tabs)'); // Navigate to tabs screen without saving
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
                            {currentQuestionIndex === marketingQuestions.length - 1
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
                        {marketingQuestions.length}.
                    </Text>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleSaveResult}
                        >
                            <Text style={styles.modalButtonText}>Save Result</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleDontSave}
                        >
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
        backgroundColor: "#E8F5E9",
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    questionText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#388E3C",
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
        backgroundColor: "#81C784",
    },
    optionText: {
        fontSize: 18,
        color: "#388E3C",
    },
    nextButton: {
        backgroundColor: "#388E3C",
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
        color: "#388E3C",
        marginBottom: 10,
    },
    modalText: {
        fontSize: 18,
        color: "#4CAF50",
        textAlign: "center",
        marginBottom: 20,
    },
    modalScore: {
        fontWeight: "bold",
        color: "#2E7D32",
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    modalButton: {
        backgroundColor: "#388E3C",
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
