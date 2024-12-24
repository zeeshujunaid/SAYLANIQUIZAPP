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
                        {quizData[currentQuestionIndex]?.question}
                    </Text>
                    {quizData[currentQuestionIndex]?.answers && Object.keys(quizData[currentQuestionIndex]?.answers).map((key) => (
                        <TouchableOpacity
                            key={key}
                            style={[styles.option, selectedAnswer === key && styles.selectedOption]}
                            onPress={() => handleAnswerSelect(key)}
                        >
                            <Text style={styles.optionText}>{quizData[currentQuestionIndex].answers[key]}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleNextQuestion}
                        disabled={!selectedAnswer}
                    >
                        <Text style={styles.buttonText}>
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
                            <Text style={styles.buttonText}>Close</Text>
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
        backgroundColor: '#F1F8E9',
        padding: 16,
    },
    subHeaderText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2E7D32',
        marginBottom: 16,
        textAlign: 'center',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    categoriesContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    quizCard: {
        width: '95%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 20,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#C8E6C9',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    quizTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E7D32',
    },
    cardContent: {
        paddingVertical: 12,
    },
    details: {
        fontSize: 15,
        color: '#555555',
        lineHeight: 22,
    },
    input: {
        height: 44,
        borderColor: '#A5D6A7',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        marginTop: 8,
        marginBottom: 12,
        color: '#333333',
        backgroundColor: '#FAFAFA',
    },
    button: {
        backgroundColor: '#2E7D32',
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
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
    },
    quizQuestion: {
        fontSize: 24,
        fontWeight: '700',
        color: '#388E3C',
        marginBottom: 20,
        textAlign: 'center',
    },
    option: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    selectedOption: {
        backgroundColor: '#A5D6A7',
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
        backgroundColor: 'rgba(0,0,0,0.4)',
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
        borderRadius: 12,
        alignItems: 'center',
        width: '80%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#388E3C',
        marginBottom: 10,
    },
    modalScore: {
        fontSize: 20,
        color: '#388E3C',
        marginBottom: 20,
    },
});
