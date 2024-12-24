import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Header from "../../components/Header"; // Import the Header component
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const softwareQuestions = [
    {
        question: "What is the primary programming language for Android development?",
        options: [
            "Java",
            "C++",
            "Python",
            "JavaScript",
        ],
        correctAnswer: "Java",
    },
    {
        question: "What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language",
        ],
        correctAnswer: "HyperText Markup Language",
    },
    {
        question: "Which version control system is widely used in software development?",
        options: [
            "Git",
            "SVN",
            "Mercurial",
            "CVS",
        ],
        correctAnswer: "Git",
    },
    {
        question: "What does SQL stand for?",
        options: [
            "Structured Query Language",
            "Standard Query Language",
            "Sequential Query Language",
            "Simplified Query Language",
        ],
        correctAnswer: "Structured Query Language",
    },
    {
        question: "What is the purpose of an IDE?",
        options: [
            "To provide a complete environment for software development",
            "To execute machine code",
            "To enhance graphic designs",
            "To create marketing content",
        ],
        correctAnswer: "To provide a complete environment for software development",
    },
    {
        question: "Which of the following is NOT a programming language?",
        options: [
            "Python",
            "Java",
            "HTML",
            "C#",
        ],
        correctAnswer: "HTML",
    },
    {
        question: "What is Agile methodology?",
        options: [
            "A software development approach focusing on iterative progress",
            "A debugging tool",
            "A database management system",
            "A type of programming language",
        ],
        correctAnswer: "A software development approach focusing on iterative progress",
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Cascading Style Sheets",
            "Creative Style Sheets",
            "Computer Style System",
            "Color Style Selector",
        ],
        correctAnswer: "Cascading Style Sheets",
    },
    {
        question: "Which of these is a frontend framework?",
        options: [
            "React",
            "Django",
            "Node.js",
            "Flask",
        ],
        correctAnswer: "React",
    },
    {
        question: "What is an API?",
        options: [
            "Application Programming Interface",
            "Advanced Programming Integration",
            "Automated Process Integration",
            "Application Process Indicator",
        ],
        correctAnswer: "Application Programming Interface",
    },
    {
        question: "What is the purpose of unit testing?",
        options: [
            "To test individual parts of an application",
            "To check the overall system performance",
            "To analyze database integrity",
            "To enhance user experience",
        ],
        correctAnswer: "To test individual parts of an application",
    },
    {
        question: "What does OOP stand for?",
        options: [
            "Object-Oriented Programming",
            "Optimal Operational Process",
            "Open Online Platform",
            "Ordered Output Programming",
        ],
        correctAnswer: "Object-Oriented Programming",
    },
    {
        question: "Which database is a NoSQL database?",
        options: [
            "MongoDB",
            "MySQL",
            "PostgreSQL",
            "OracleDB",
        ],
        correctAnswer: "MongoDB",
    },
    {
        question: "What is the main function of a compiler?",
        options: [
            "To convert code into machine language",
            "To debug code",
            "To execute code",
            "To provide code suggestions",
        ],
        correctAnswer: "To convert code into machine language",
    },
    {
        question: "What is version control used for?",
        options: [
            "Tracking changes in code",
            "Optimizing software speed",
            "Designing user interfaces",
            "Analyzing performance metrics",
        ],
        correctAnswer: "Tracking changes in code",
    },
    {
        question: "Which of these is a backend programming language?",
        options: [
            "Node.js",
            "CSS",
            "React",
            "Bootstrap",
        ],
        correctAnswer: "Node.js",
    },
    {
        question: "What is the main advantage of open-source software?",
        options: [
            "It is freely available for use and modification",
            "It is highly secure",
            "It always includes technical support",
            "It has no bugs",
        ],
        correctAnswer: "It is freely available for use and modification",
    },
    {
        question: "What does JSON stand for?",
        options: [
            "JavaScript Object Notation",
            "JavaScript Online Network",
            "Java System Object Node",
            "JavaScript Organized Node",
        ],
        correctAnswer: "JavaScript Object Notation",
    },
    {
        question: "Which of these is an operating system?",
        options: [
            "Linux",
            "Java",
            "HTML",
            "Bootstrap",
        ],
        correctAnswer: "Linux",
    },
    {
        question: "Which of the following is a cloud computing platform?",
        options: [
            "AWS",
            "Python",
            "MongoDB",
            "Node.js",
        ],
        correctAnswer: "AWS",
    },
    {
        question: "What is the main purpose of Docker?",
        options: [
            "To containerize applications for consistent deployment",
            "To manage database queries",
            "To track application logs",
            "To monitor network traffic",
        ],
        correctAnswer: "To containerize applications for consistent deployment",
    },
    {
        question: "What is the primary use of GitHub?",
        options: [
            "Hosting and collaborating on code repositories",
            "Managing databases",
            "Creating UI designs",
            "Deploying web applications",
        ],
        correctAnswer: "Hosting and collaborating on code repositories",
    },
];


const quizname = "Software Development"

export default function SoftwareQuiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);

    const currentQuestion = softwareQuestions[currentQuestionIndex];

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
        if (currentQuestionIndex < softwareQuestions.length - 1) {
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
                <Text style={styles.questionText}>Q:{currentQuestion.question}</Text>
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
                            {currentQuestionIndex === softwareQuestions.length - 1
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
                        {softwareQuestions.length}.
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
