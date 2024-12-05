import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = () => {

  useEffect(() => {
    setTimeout(() => {
      router.push('/sign-in'); // Auto-redirect after 1 second
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        style={styles.logo}
        source={{ uri: 'https://www.saylaniwelfare.com/wp-content/uploads/2020/09/saylani-logo.png' }} // Update logo if needed
      />
      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.subtitle}>Saylani Quiz App</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/(drawer)/(tabs)/')} // Navigate to drawer/tabs screen
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F9', // Light greyish background for a clean look
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150, // Adjust logo size for balance
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 36, // Larger text for a welcoming title
    fontWeight: 'bold',
    color: '#4CAF50', // Green color for Saylani theme
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22, // Slightly larger subtitle for emphasis
    color: '#8BC34A', // Lighter green color for contrast
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4CAF50', // Matching button color to the theme
    paddingVertical: 15,
    paddingHorizontal: 50, // Larger padding for better button tap
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
