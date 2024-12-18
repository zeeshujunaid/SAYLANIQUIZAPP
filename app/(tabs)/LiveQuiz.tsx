import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export default function QuizHomeScreen() {
    const [codes, setCodes] = useState({
        marketing: '',
        software: '',
        web: '',
        app: '',
        design: '',
    });
    const [expanded, setExpanded] = useState({});

    const toggleExpand = (category) => {
        setExpanded((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const handleCategoryPress = (categoryKey, code) => {
        if (!code.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter the live quiz code.',
            });
            return;
        }

        Toast.show({
            type: 'success',
            text1: 'BEST OF LUCK!',
            text2: 'Get ready for your quiz!',
        });

        // Clear the input field for the corresponding category
        setCodes((prev) => ({
            ...prev,
            [categoryKey]: '',
        }));
    };

    const categories = [
        { name: 'Digital Marketing', key: 'marketing' },
        { name: 'Software Engineering', key: 'software' },
        { name: 'Web Development', key: 'web' },
        { name: 'App Development', key: 'app' },
        { name: 'UI/UX Design', key: 'design' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.subHeaderText}>Enter Live Quiz Code</Text>
            <ScrollView contentContainerStyle={styles.categoriesContainer} showsVerticalScrollIndicator={false}>
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
            <Toast />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F5E9',
        padding: 16,
    },
    subHeaderText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#388E3C',
        marginBottom: 20,
        textAlign: 'center',
    },
    categoriesContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    quizCard: {
        width: '96%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        alignSelf: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    quizTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#388E3C',
    },
    cardContent: {
        paddingVertical: 10,
    },
    details: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: '#333',
    },
    button: {
        backgroundColor: '#388E3C',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
