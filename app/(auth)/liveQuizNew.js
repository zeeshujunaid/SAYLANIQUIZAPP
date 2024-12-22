import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LiveQuiz() {
    const router = useRouter();
    const { categoryKey } = router.query; // Get the categoryKey from the params
    const [quizData, setQuizData] = useState(null);

    useEffect(() => {
        const fetchQuizData = async () => {
            if (categoryKey) {
                try {
                    const storedData = await AsyncStorage.getItem(`quiz_${categoryKey}`);
                    if (storedData) {
                        setQuizData(JSON.parse(storedData));
                    } else {
                        console.log('No data found for this category');
                    }
                } catch (error) {
                    console.error('Error fetching quiz data:', error);
                }
            }
        };

        fetchQuizData();
    }, [categoryKey]);

    if (!quizData) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading quiz...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Quiz for {categoryKey}</Text>
            {quizData.questions && quizData.questions.length > 0 ? (
                quizData.questions.map((question, index) => (
                    <View key={index} style={styles.questionCard}>
                        <Text style={styles.questionText}>
                            {index + 1}. {question.text}
                        </Text>
                        {question.options.map((option, optionIndex) => (
                            <Text key={optionIndex} style={styles.optionText}>
                                {String.fromCharCode(65 + optionIndex)}. {option}
                            </Text>
                        ))}
                    </View>
                ))
            ) : (
                <Text style={styles.noQuestionsText}>No questions available for this quiz.</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#F1F8E9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 16,
        textAlign: 'center',
    },
    questionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#C8E6C9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333333',
    },
    optionText: {
        fontSize: 16,
        color: '#555555',
        marginVertical: 4,
    },
    noQuestionsText: {
        fontSize: 16,
        color: '#999999',
        textAlign: 'center',
        marginTop: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F8E9',
    },
    loadingText: {
        fontSize: 18,
        color: '#555555',
    },
});
