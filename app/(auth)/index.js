import React, { useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

const WelcomeScreen = () => {
  const router = useRouter();

  const checkUser = async () => {
    try {
      const user = await AsyncStorage.getItem('info');
      if (user !== null) {
        Toast.show({
          type: 'success',
          text1: 'Welcome Back!',
          text2: 'Hope you like the app',
        });
        router.push('(tabs)'); // Replace '(tabs)' with your dashboard route
      } else {
        Toast.show({
          type: 'info',
          text1: 'No User Found',
          text2: 'Plz sign-up to continue',
        });
        router.push('/sign-in'); // Replace '/sign-in' with your login route
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No user found plz ry again',
      });
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://mir-s3-cdn-cf.behance.net/projects/404/fe88a5125363293.Y3JvcCwxODc1LDE0NjYsMTA2Miw1OTg.jpg' }}
      style={styles.background}
      resizeMode="contain"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.subtitle}>Saylani Quiz App</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={checkUser}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <Toast />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff', // White text for contrast
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    color: '#ddd', // Light grey for a subtle subtitle
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
