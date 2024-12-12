import { router } from 'expo-router';
import React from 'react';
import Header from '../../components/Header';
import { Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';

export default function QuizHomeScreen() {
    const handleCategoryPress = (quizRoute) => {
        console.log("Navigating to:", quizRoute); // Debug log
        
        // Show the first toast
        Toast.show({
            type: 'success',
            text1: 'BEST OF LUCK!',
            text2: 'Get ready for your quiz!',
        });
        // Navigate to the quiz route
        try {
            router.push(quizRoute);
        } catch (error) {
            console.error("Error navigating to route:", error);
        }
    };
    
    

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <Header />

            {/* Subheader */}
            <Text style={styles.subHeaderText}>Select Quiz Category</Text>

            {/* Scrollable Category List */}
            <ScrollView contentContainerStyle={styles.categoriesContainer} showsVerticalScrollIndicator={false}>
                {/* Digital Marketing */}
                <TouchableOpacity
                    style={styles.categoryCard}
                    onPress={() => handleCategoryPress('/(auth)/marketingquiz')}
                >
                    <Image
                        source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/027/853/733/small_2x/people-standing-behind-desk-with-computer-the-screen-displays-various-charts-and-graphs-ai-generated-png.png' }}
                        style={styles.categoryImage}
                    />
                    <Text style={styles.categoryText}>Digital Marketing Quiz</Text>
                </TouchableOpacity>

                {/* Software Engineering */}
                <TouchableOpacity
                    style={styles.categoryCard}
                    onPress={() => handleCategoryPress('/(auth)/softwarequiz')}
                >
                    <Image
                        source={{ uri: 'https://media.istockphoto.com/id/1046046242/photo/binary-code-background.jpg?s=612x612&w=0&k=20&c=xrVN5UxMp_-j96Diq9xBeAXW-NuDh0Q5PpH1gyr5Xxc=' }}
                        style={styles.categoryImage}
                    />
                    <Text style={styles.categoryText}>Software Engineering Quiz</Text>
                </TouchableOpacity>

                {/* Web Development */}
                <TouchableOpacity
                    style={styles.categoryCard}
                    onPress={() => handleCategoryPress('/(auth)/webdevquiz')}
                >
                    <Image
                        source={{ uri: 'https://thumbs.dreamstime.com/b/responsive-web-design-studio-page-displayed-across-laptop-phone-tablet-computer-office-desk-showcasing-cross-device-339247349.jpg' }}
                        style={styles.categoryImage}
                    />
                    <Text style={styles.categoryText}>Web Development Quiz</Text>
                </TouchableOpacity>

                {/* App Development */}
                <TouchableOpacity
                    style={styles.categoryCard}
                    onPress={() => handleCategoryPress('/(auth)/appdevquiz')}
                >
                    <Image
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrKN8Czb174E312H9zZ5TeQSsN27z3P0XcHg&s' }}
                        style={styles.categoryImage}
                    />
                    <Text style={styles.categoryText}>App Development Quiz</Text>
                </TouchableOpacity>

                {/* UI/UX Design */}
                <TouchableOpacity
                    style={styles.categoryCard}
                    onPress={() => handleCategoryPress('/(auth)/designquiz')}
                >
                    <Image
                        source={{ uri: 'https://blog-frontend.envato.com/cdn-cgi/image/width=4800,quality=75,format=auto/uploads/sites/2/2022/05/graphic-design-tools.png' }}
                        style={styles.categoryImage}
                    />
                    <Text style={styles.categoryText}>UI/UX Design Quiz</Text>
                </TouchableOpacity>

                {/* Live Quiz */}
                <TouchableOpacity
                    style={styles.categoryCard}
                    onPress={() => handleCategoryPress('/LiveQuiz')}
                >
                    <Image
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH489-5BUasH1f_QxsyzYVNxkZxKEnie5sog&s' }}
                        style={styles.categoryImage}
                    />
                    <Text style={styles.categoryText}>Enter Live Quiz</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Toast Container */}
            <Toast />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F5E9',
        padding: 16,
        paddingBottom: 100, // Ensure enough space for the tabs
    },
    headerContainer: {
        backgroundColor: '#81C784',
        paddingVertical: 20,
        borderRadius: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    subHeaderText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#388E3C',
        marginBottom: 20,
        textAlign: 'center',
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },
    categoryCard: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        width: '45%',
        marginBottom: 16,
        alignItems: 'center',
        paddingVertical: 15,
        marginHorizontal: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    categoryImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginBottom: 12,
    },
    categoryText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#388E3C',
        textAlign: 'center',
    },
});
