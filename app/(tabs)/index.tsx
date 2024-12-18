import { router } from 'expo-router';
import React, { useState } from 'react';
import Header from '../../components/Header';
import { Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView, Animated } from 'react-native';
import Toast from 'react-native-toast-message';

export default function QuizHomeScreen() {
    const [scale] = useState(new Animated.Value(1)); // Animated value for scaling

    const handleCategoryPress = (quizRoute) => {
        Toast.show({
            type: 'success',
            text1: 'BEST OF LUCK!',
            text2: 'Get ready for your quiz!',
        });
        try {
            router.push(quizRoute);
        } catch (error) {
            console.error('Error navigating to route:', error);
        }
    };

    const categories = [
        {
            name: 'Digital Marketing Quiz',
            image:
                'https://static.vecteezy.com/system/resources/thumbnails/027/853/733/small_2x/people-standing-behind-desk-with-computer-the-screen-displays-various-charts-and-graphs-ai-generated-png.png',
            route: '/(auth)/marketingquiz',
        },
        {
            name: 'Software Engineering Quiz',
            image:
                'https://media.istockphoto.com/id/1046046242/photo/binary-code-background.jpg?s=612x612&w=0&k=20&c=xrVN5UxMp_-j96Diq9xBeAXW-NuDh0Q5PpH1gyr5Xxc=',
            route: '/(auth)/softwarequiz',
        },
        {
            name: 'Web Development Quiz',
            image:
                'https://thumbs.dreamstime.com/b/responsive-web-design-studio-page-displayed-across-laptop-phone-tablet-computer-office-desk-showcasing-cross-device-339247349.jpg',
            route: '/(auth)/webdevquiz',
        },
        {
            name: 'App Development Quiz',
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrKN8Czb174E312H9zZ5TeQSsN27z3P0XcHg&s',
            route: '/(auth)/appdevquiz',
        },
        {
            name: 'UI/UX Design Quiz',
            image:
                'https://blog-frontend.envato.com/cdn-cgi/image/width=4800,quality=75,format=auto/uploads/sites/2/2022/05/graphic-design-tools.png',
            route: '/(auth)/designquiz',
        },
        {
            name: 'Live Quiz',
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH489-5BUasH1f_QxsyzYVNxkZxKEnie5sog&s',
            route: '/LiveQuiz',
        },
    ];

    // Animation for scale effect
    const animateCard = () => {
        Animated.spring(scale, {
            toValue: 1.1,
            friction: 4,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <Header />

            {/* Subheader */}
            <Text style={styles.subHeaderText}>Choose a Quiz Category</Text>

            {/* Scrollable Category List */}
            <ScrollView contentContainerStyle={styles.categoriesContainer} showsVerticalScrollIndicator={false}>
                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.categoryCard}
                        onPress={() => handleCategoryPress(category.route)}
                        onPressIn={animateCard} // On press, animate the scale
                    >
                        <Animated.Image
                            source={{ uri: category.image }}
                            style={[styles.categoryImage, { transform: [{ scale }] }]} // Apply scale animation
                        />
                        <Text style={styles.categoryText}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Toast Container */}
            <Toast />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Clean, professional white background
        padding: 16,
        paddingBottom: 100,
    },
    subHeaderText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50', // Darker color for a more modern look
        marginBottom: 20,
        textAlign: 'center',
        textTransform: 'uppercase', // Adds a professional touch
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryCard: {
        backgroundColor: '#F8F9FA', // Subtle gray for a soft card appearance
        borderRadius: 15,
        width: '48%',
        marginBottom: 16,
        alignItems: 'center',
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 }, // Slightly more prominent shadow
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5, // Elevation for Android devices
    },
    categoryImage: {
        width: '100%',
        height: 120, // Slightly taller for better visibility
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: '#E0E0E0', // Fallback background for images
    },
    categoryText: {
        fontSize: 18, // Larger font for better readability
        fontWeight: '700', // Slightly bolder for emphasis
        paddingVertical: 6, // Vertical padding for better spacing
        color: '#34495E', // Darker text for contrast
        backgroundColor: '#ECF0F1', // Light gray background for distinction
        textAlign: 'center',
        borderRadius: 8, // Rounded corners
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
});
