import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const webDevQuestions = [
    {
        question: "What does CSS stand for?",
        options: [
            "Cascading Style Sheets",
            "Creative Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets",
        ],
        correctAnswer: "Cascading Style Sheets",
    },
    {
        question: "Which HTML tag is used to define an unordered list?",
        options: [
            "<ul>",
            "<ol>",
            "<li>",
            "<list>",
        ],
        correctAnswer: "<ul>",
    },
    {
        question: "What is the purpose of the <head> tag in HTML?",
        options: [
            "To contain metadata about the document",
            "To define the main content",
            "To create a header for the page",
            "To define the navigation bar",
        ],
        correctAnswer: "To contain metadata about the document",
    },
    {
        question: "What does the 'alt' attribute in the <img> tag specify?",
        options: [
            "Alternative text for an image",
            "The alignment of the image",
            "The size of the image",
            "The source URL of the image",
        ],
        correctAnswer: "Alternative text for an image",
    },
    {
        question: "Which property is used to change the background color in CSS?",
        options: [
            "background-color",
            "color",
            "bgcolor",
            "background-image",
        ],
        correctAnswer: "background-color",
    },
    {
        question: "What does DOM stand for?",
        options: [
            "Document Object Model",
            "Data Object Model",
            "Document Order Management",
            "Display Object Model",
        ],
        correctAnswer: "Document Object Model",
    },
    {
        question: "Which JavaScript method is used to select an element by its ID?",
        options: [
            "getElementById",
            "querySelector",
            "getElementByClass",
            "getElementByTagName",
        ],
        correctAnswer: "getElementById",
    },
    {
        question: "What does HTTP stand for?",
        options: [
            "Hypertext Transfer Protocol",
            "Hyperlink Text Protocol",
            "Hypertext Transmission Protocol",
            "Hypertext Transfer Page",
        ],
        correctAnswer: "Hypertext Transfer Protocol",
    },
    {
        question: "Which CSS property controls the text size?",
        options: [
            "font-size",
            "text-size",
            "font-style",
            "text-style",
        ],
        correctAnswer: "font-size",
    },
    {
        question: "What is the default position value in CSS?",
        options: [
            "static",
            "relative",
            "absolute",
            "fixed",
        ],
        correctAnswer: "static",
    },
    {
        question: "Which tag is used to create a hyperlink in HTML?",
        options: [
            "<a>",
            "<link>",
            "<href>",
            "<hyperlink>",
        ],
        correctAnswer: "<a>",
    },
    {
        question: "Which CSS framework is known for its grid system?",
        options: [
            "Bootstrap",
            "Foundation",
            "Materialize",
            "Tailwind",
        ],
        correctAnswer: "Bootstrap",
    },
    {
        question: "What is the correct way to include JavaScript in an HTML file?",
        options: [
            "<script>",
            "<javascript>",
            "<js>",
            "<code>",
        ],
        correctAnswer: "<script>",
    },
    {
        question: "What is the purpose of media queries in CSS?",
        options: [
            "To make a website responsive",
            "To add animations",
            "To optimize loading speed",
            "To define a color scheme",
        ],
        correctAnswer: "To make a website responsive",
    },
    {
        question: "Which attribute is used to define inline CSS styles?",
        options: [
            "style",
            "css",
            "inline",
            "styles",
        ],
        correctAnswer: "style",
    },
    {
        question: "What is the primary purpose of the <footer> tag in HTML?",
        options: [
            "To define the footer section of a document",
            "To create a header",
            "To link external CSS files",
            "To embed images",
        ],
        correctAnswer: "To define the footer section of a document",
    },
    {
        question: "What does the <canvas> tag in HTML do?",
        options: [
            "Creates a space for dynamic graphics",
            "Defines a navigation bar",
            "Displays multimedia content",
            "Creates a form",
        ],
        correctAnswer: "Creates a space for dynamic graphics",
    },
    {
        question: "Which JavaScript function is used to parse a JSON string?",
        options: [
            "JSON.parse()",
            "JSON.stringify()",
            "JSON.convert()",
            "JSON.decode()",
        ],
        correctAnswer: "JSON.parse()",
    },
    {
        question: "What does the z-index property in CSS control?",
        options: [
            "Stacking order of elements",
            "Zoom level",
            "Z-axis rotation",
            "Width of an element",
        ],
        correctAnswer: "Stacking order of elements",
    },
    {
        question: "Which HTML tag is used to embed a video?",
        options: [
            "<video>",
            "<embed>",
            "<media>",
            "<movie>",
        ],
        correctAnswer: "<video>",
    },
    {
        question: "Which protocol is secure for transmitting data over the web?",
        options: [
            "HTTPS",
            "HTTP",
            "FTP",
            "SMTP",
        ],
        correctAnswer: "HTTPS",
    },
    {
        question: "Which CSS property is used to create space inside an element?",
        options: [
            "padding",
            "margin",
            "border",
            "spacing",
        ],
        correctAnswer: "padding",
    },
    {
        question: "What is the purpose of the <meta> tag in HTML?",
        options: [
            "To specify metadata about the document",
            "To define a table",
            "To create a heading",
            "To display multimedia content",
        ],
        correctAnswer: "To specify metadata about the document",
    },
];

const quizName = "Web Development";

export default function WebDevQuiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);

    const currentQuestion = webDevQuestions[currentQuestionIndex];

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNext = async () => {
        Toast.show({
            type: 'info',
            text1: 'DONT GO BACK!',
            text2: 'If you go back, you will lose all your progress!',
        });

        // Update score if answer is correct
        if (selectedAnswer === currentQuestion.correctAnswer) {
            const newScore = score + 1;
            setScore(newScore);

            try {
                // Save the updated score in AsyncStorage
                await AsyncStorage.setItem('quizScore', newScore.toString());
            } catch (error) {
                console.error('Failed to save the score to AsyncStorage', error);
            }
        }

        setSelectedAnswer(null);
        if (currentQuestionIndex < webDevQuestions.length - 1) {
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
                quizName: quizName, // Use the correct variable name
                score: score,
            };
            const updatedResults = [...existingResults, newResult];
    
            // Save the updated results array back to AsyncStorage
            await AsyncStorage.setItem("quizResults", JSON.stringify(updatedResults));
    
            Toast.show({
                type: 'success',
                text1: 'Result Saved!',
                text2: `Your score ${score} for ${quizName} quiz has been saved.`,
            });
    
            setModalVisible(false); // Close the modal
            router.push('/(tabs)'); // Navigate to tabs screen
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error saving result!',
                text2: 'Please try again.',
            });
            console.log(error, "error");
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
                            {currentQuestionIndex === webDevQuestions.length - 1
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
                        {webDevQuestions.length}.
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
        backgroundColor: "#81C784",
        color:"white"
        // Medium green for selected option
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
