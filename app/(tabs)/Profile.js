import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import { auth } from "../../utils/firebase";

export default function Profile() {
  const [quizResults, setQuizResults] = useState([]);
  const [profileInfo, setProfileInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to fetch quiz results and profile info from AsyncStorage
  const fetchData = async () => {
    setLoading(true);
    try {
      const storedResults = await AsyncStorage.getItem("quizResults");
      const storedInfo = await AsyncStorage.getItem("info");

      if (storedResults) {
        setQuizResults(JSON.parse(storedResults));
      } else {
        setQuizResults([]);
      }

      if (storedInfo) {
        const parsedInfo = JSON.parse(storedInfo);
        setProfileInfo({
          name: parsedInfo.name || "Name Not Available",
          email: parsedInfo.email || "Email Not Available",
          center: parsedInfo.center || "Not Available",
        });
      } else {
        setProfileInfo({
          name: "Not Available",
          email: "Not Available",
          center: "Not Available",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error fetching data",
        text2: "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.clear();
      Toast.show({
        type: "success",
        text1: "Logged Out",
        text2: "You have been successfully logged out.",
      });
      router.push("/sign-in");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Logout Failed",
        text2: "Please try again.",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" style={styles.loader} />
      ) : (
        <>
          <ScrollView
            style={styles.scoresContainer}
            showsVerticalScrollIndicator={false}
          >
            {profileInfo && (
              <View style={styles.profileCard}>
                <Image
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/155985389?s=400&u=143d628a397176208d57037c896734943265e663&v=4",
                  }}
                  style={styles.profileImage}
                />
                <TextInput style={styles.input} value={profileInfo.name} editable={false} />
                <TextInput style={styles.input} value={profileInfo.email} editable={false} />
                <TextInput style={styles.input} value={profileInfo.center} editable={false} />
              </View>
            )}

           

            <TouchableOpacity
              style={styles.navigateButton}
              onPress={() => router.push("/(auth)/quizResult")}
            >
              <Text style={styles.navigateText}>View All Quiz Results</Text>
            </TouchableOpacity>
          </ScrollView>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    padding: 20,
    paddingTop: 40, // Added top padding
    paddingBottom: 40, // Added bottom padding
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    alignSelf: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  scoresContainer: {
    flex: 1,
    padding: 16,
    paddingBottom: 80, // Space for tab bar
  },
  scrollContentContainer: {
    paddingBottom: 100,
  },
  profileCard: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  loader: {
    marginTop: 20,
  },
  navigateButton: {
    backgroundColor: "#47a84b", // Changed to green
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  navigateText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#47a84b",
    padding: 15, // Corrected padding
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 70,
  },
  
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
