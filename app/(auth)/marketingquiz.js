import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Header from "../../components/Header"; // Import the Header component
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';


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
            text2: 'if you go back you will lose all your progees!',
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

    const handleCloseModal = () => {
        setModalVisible(false);
        // Reset the quiz or navigate to another screen
        router.push('/(tabs)')
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
    modalButton: {
        backgroundColor: "#388E3C",
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
