import React, { useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet,StatusBar as RNStatusBar, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { StatusBar } from "expo-status-bar";
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
      source={{ uri: 'https://www.esicm.org/wp-content/uploads/2024/05/quiztime.png' }}
      style={styles.background}
      resizeMode="contain"
    >
      <StatusBar style="light" hidden={true} translucent={true} />
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.subtitle}>Saylani Quiz App</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={checkUser}       
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent overlay
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#FFD700', // Golden text for a premium feel
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.9,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default WelcomeScreen;