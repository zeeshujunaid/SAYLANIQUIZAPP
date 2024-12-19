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
        backgroundColor: '#F1F8E9', // Light greenish background
        padding: 16,
    },
    subHeaderText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2E7D32', // Dark green for emphasis
        marginBottom: 16,
        textAlign: 'center',
        letterSpacing: 0.5, // Subtle spacing for a clean look
        textTransform: 'uppercase', // Professional uppercase
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
        elevation: 6, // Elevation for depth
        alignSelf: 'center',
        borderWidth: 1, 
        borderColor: '#C8E6C9', // Light green border
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0', // Light grey for a subtle separator
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
        lineHeight: 22, // Improved readability
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
        backgroundColor: '#FAFAFA', // Light grey for input
    },
    button: {
        backgroundColor: '#2E7D32', // Deep green for consistency
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
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'uppercase', // Consistent and professional
        letterSpacing: 0.8, // Spacing for button text
    },
});

