import React, { useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    ActivityIndicator,
    Modal,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';

const firestore = getFirestore();

export default function QuizHomeScreen() {
    const [codes, setCodes] = useState({
        digital: '',
        software: '',
        web: '',
        app: '',
        uiux: '',
        flutter: '',
    });
    const categories = [
        { name: 'Digital Marketing', key: 'digital' },
        { name: 'Software Engineering', key: 'software' },
        { name: 'Web Development', key: 'web' },
        { name: 'App Development', key: 'app' },
        { name: 'UI/UX Design', key: 'uiux' },
        { name: 'flutter development', key: 'flutter' },
        
    ];
    const [expanded, setExpanded] = useState({});
    const [loading, setLoading] = useState(false);
    const [quizData, setQuizData] = useState([]);  // Ensure quizData is an empty array initially
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizInProgress, setQuizInProgress] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);

    const toggleExpand = (category) => {
        setExpanded((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const handleCategoryPress = async (categoryKey, code) => {
        if (!code.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter the live quiz code.',
            });
            return;
        }

        setLoading(true);

        try {
            const collectionName = `${categoryKey}developmentQuizzes`;
            const categoryRef = doc(collection(firestore, collectionName), code);
            const categorySnapshot = await getDoc(categoryRef);

            if (categorySnapshot.exists()) {
                const categoryData = categorySnapshot.data();
                setQuizData(categoryData.questions || []);  // Ensure questions is an array
                setQuizInProgress(true);
                setCodes((prev) => ({
                    ...prev,
                    [categoryKey]: '',
                }));
                // Delay Toast so UI updates before showing the message
                setTimeout(() => {
                    Toast.show({
                        type: 'success',
                        text1: 'Code Matched!',
                        text2: 'Loading your quiz...',
                    });
                }, 100);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Invalid Code',
                    text2: `No quiz found for the code ${code}.`,
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'An error occurred. Please try again later.',
            });
            console.error('Error fetching quiz data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSelect = (answerKey) => {
        setSelectedAnswer(answerKey); // Store the answer key (like 'a', 'b', 'c', or 'd')
    };

    const handleNextQuestion = () => {
        if (quizData[currentQuestionIndex]?.correctAnswer === selectedAnswer) {
            setScore((prevScore) => prevScore + 1);
        }

        if (currentQuestionIndex + 1 < quizData.length) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setSelectedAnswer(null);
        } else {
            setShowScoreModal(true);
        }
    };

    const resetQuiz = () => {
        setQuizInProgress(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowScoreModal(false);
    };


    return (
        <SafeAreaView style={styles.container}>
            {!quizInProgress ? (
                <>
                    <Text style={styles.subHeaderText}>Enter Live Quiz Code</Text>
                    <ScrollView
                        contentContainerStyle={styles.categoriesContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        {categories.map((category) => (
                            <View key={category.key} style={styles.quizCard}>
                                <TouchableOpacity
                                    style={styles.cardHeader}
                                    onPress={() => toggleExpand(category.key)}
                                >
                                    <Text style={styles.quizTitle}>{category.name}</Text>
                                    <FontAwesome
                                        name={expanded[category.key] ? 'chevron-up' : 'chevron-down'}
                                        size={20}
                                        color="#388E3C"
                                    />
                                </TouchableOpacity>
                                {expanded[category.key] && (
                                    <View style={styles.cardContent}>
                                        <Text style={styles.details}>30 quizzes</Text>
                                        <Text style={styles.details}>Solve timing: 30 minutes</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter Live Quiz Code"
                                            placeholderTextColor="#999"
                                            value={codes[category.key]}
                                            onChangeText={(text) =>
                                                setCodes((prev) => ({ ...prev, [category.key]: text }))
                                            }
                                        />
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={() =>
                                                handleCategoryPress(category.key, codes[category.key])
                                            }
                                        >
                                            <Text style={styles.buttonText}>Start Quiz</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        ))}
                    </ScrollView>
                </>
            ) : (
                <View style={styles.quizContainer}>
                    <Text style={styles.quizQuestion}>
                        Q:{quizData[currentQuestionIndex]?.question}
                    </Text>
                    {quizData[currentQuestionIndex]?.answers && Object.keys(quizData[currentQuestionIndex]?.answers).map((key) => (
                        <TouchableOpacity
                            key={key}
                            style={[styles.option, selectedAnswer === key && styles.selectedOption]}
                            onPress={() => handleAnswerSelect(key)}
                        >
                            <Text style={styles.optionText}>Ans:{quizData[currentQuestionIndex].answers[key]}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleNextQuestion}
                        disabled={!selectedAnswer}
                    >
                        <Text style={styles.buttonTest}>
                            {currentQuestionIndex + 1 === quizData.length ? 'Finish' : 'Next'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#2E7D32" />
                </View>
            )}

            <Modal
                visible={showScoreModal}
                transparent
                animationType="slide"
                onRequestClose={resetQuiz}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Quiz Completed!</Text>
                        <Text style={styles.modalScore}>Your Score: {score}/{quizData.length}</Text>
                        <TouchableOpacity style={styles.button} onPress={resetQuiz}>
                            <Text style={styles.buttonClose}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Toast />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F5E9', // Soft green background
        padding: 16,
    },
    subHeaderText: {
        fontSize: 26,
        fontWeight: '700',
        color: '#1B5E20', // Darker green
        marginBottom: 16,
        textAlign: 'center',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    categoriesContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    quizCard: {
        width: '95%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 20,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#C5E1A5', // Softer green border
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    quizTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1B5E20',
    },
    cardContent: {
        paddingVertical: 12,
    },
    details: {
        fontSize: 16,
        color: '#666666',
        lineHeight: 24,
        marginBottom: 6,
    },
    input: {
        height: 50,
        borderColor: '#81C784', // Slightly darker green
        borderWidth: 1.5,
        borderRadius: 12,
        paddingHorizontal: 14,
        marginTop: 10,
        marginBottom: 16,
        color: '#333333',
        backgroundColor: '#F9FBE7', // Light green background
        fontSize: 16,
    },
    button: {
        backgroundColor: '#1B5E20',
        width: '100%',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonTest:{
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        width:"20%"
    },
    buttonClose:{
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    quizContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap:20,
    },
    quizQuestion: {
        fontSize: 34,
        fontWeight: '700',
        color: '#2E7D32',
        marginBottom: 20,
        width: '100%',
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 32,
    },
    option: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 20,
        marginBottom: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#AED581', // Subtle green border
    },
    selectedOption: {
        backgroundColor: '#C8E6C9', // Highlight selected option
        borderColor: '#2E7D32', // Dark green border for selected
    },
    optionText: {
        fontSize: 18,
        color: '#388E3C',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        padding: 24,
        borderRadius: 16,
        alignItems: 'center',
        width: '85%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    modalTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: '#388E3C',
        marginBottom: 12,
    },
    modalScore: {
        fontSize: 20,
        fontWeight: '500',
        color: '#666666',
        marginBottom: 20,
        textAlign: 'center',
    },
});
