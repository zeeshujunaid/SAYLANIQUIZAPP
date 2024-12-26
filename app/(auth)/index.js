import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import Toast from 'react-native-toast-message';
import { Video } from 'expo-av';

const WelcomeScreen = () => {
  const router = useRouter();
  const videoRef = useRef(null);

  const checkUser = async () => { 
    try {
      // Pause video playback before navigating
      if (videoRef.current) {
        await videoRef.current.pauseAsync();
      }

      const user = await AsyncStorage.getItem('info');
      if (user !== null) {
        Toast.show({
          type: 'success',
          text1: 'Welcome Back!',
          text2: 'Hope you like the app',
        });

        // navigate to main page if user found
        router.push('(tabs)'); 
      } else {
        Toast.show({
          type: 'info',
          text1: 'No User Found',
          text2: 'Please sign-up to continue',
        });

        // navigate to signup if user not found
        router.push('/sign-in'); 
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No user found, please try again',
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
  <Image
    source={{
      uri: 'https://mir-s3-cdn-cf.behance.net/projects/404/fe88a5125363293.Y3JvcCwxODc1LDE0NjYsMTA2Miw1OTg.jpg',
    }}
    style={styles.image}
  />
</View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.subtitle}>Saylani Quiz App</Text>
        <TouchableOpacity style={styles.button} onPress={checkUser}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      {/* Status Bar */}
      <StatusBar style="light" translucent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  image: {
    width: '100 %', // Full width of the container
    height: '100%', // Full height of the container
    resizeMode: 'cover',
    borderleftBottomRadius: 90,
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
    overflow: 'hidden', // Ensures the entire image is visible
  },
  topSection: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bottomSection: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    width: "100%",
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
  },
  videoBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default WelcomeScreen;
