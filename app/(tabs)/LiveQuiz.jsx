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
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';

const firestore = getFirestore();

export default function QuizHomeScreen() {
    const [codes, setCodes] = useState({
        marketing: '',
        software: '',
        web: '',
        app: '',
        design: '',
    });
    const [expanded, setExpanded] = useState({});
    const [loading, setLoading] = useState(false);

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
            console.log(`Fetching from collection: ${collectionName}, with code: ${code}`);
    
            const categoryRef = doc(collection(firestore, collectionName), code);
            const categorySnapshot = await getDoc(categoryRef);
    
            if (categorySnapshot.exists()) {
                const categoryData = categorySnapshot.data();
    
                Toast.show({
                    type: 'success',
                    text1: 'Code Matched!',
                    text2: 'Loading your quiz...',
                });
    
                await AsyncStorage.setItem(`quiz_${categoryKey}`, JSON.stringify(categoryData));
    
                // Navigate to the second page with categoryKey as a parameter
                router.push({
                    pathname: '/(tabs)/LiveQuizNew',
                    params: { categoryKey },
                });
    
                setCodes((prev) => ({
                    ...prev,
                    [categoryKey]: '',
                }));
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Invalid Code',
                    text2: `No quiz found in ${collectionName} for the code ${code}.`,
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
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#2E7D32" />
                </View>
            )}
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
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
