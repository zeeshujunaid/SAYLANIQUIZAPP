import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const Loading = () => {
  const { setUser } = useAuth();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const user = await AsyncStorage.getItem('info');
    if (user !== null) {
      console.log('User found, redirecting to Drawer...');
      setUser(JSON.parse(user));
      router.push('(tabs)');
    } else {
      console.log('No user found, redirecting to Auth...');
      router.push('/');
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <ActivityIndicator size={50} color="#1E90FF" /> {/* Blue loading spinner */}
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'linear-gradient(135deg, #1E90FF, #FF4500)', // Blue to Orange gradient background
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background for readability
    padding: 20,
    borderRadius: 15,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#1E90FF', // Blue text color
    fontWeight: 'bold',
  },
});

export default Loading;
