import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
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

      // Parse and set quiz results
      if (storedResults) {
        const parsedResults = JSON.parse(storedResults);
        setQuizResults(parsedResults); // Set all saved quiz results
      } else {
        setQuizResults([]); // No results found
      }

      // Parse and set profile info
      if (storedInfo) {
        const parsedInfo = JSON.parse(storedInfo);
        setProfileInfo(parsedInfo); // Should include name, email, and center
      } else {
        setProfileInfo({ name: "Unknown", email: "N/A", center: "Not Available" });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error fetching data",
        text2: "Please try again.",
      });
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Logout Function
  const handleLogout = async () => {
    try {
      // Firebase logout
      await signOut(auth);

      // Clear AsyncStorage
      await AsyncStorage.clear();

      // Show success toast
      Toast.show({
        type: "success",
        text1: "Logged Out",
        text2: "You have been successfully logged out.",
      });

      // Navigate to login screen
      router.push("/sign-in");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Logout Failed",
        text2: "Please try again.",
      });
      console.error("Logout Error:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" style={styles.loader} />
      ) : (
        <ScrollView style={styles.scoresContainer} showsVerticalScrollIndicator={false}>
          {/* Profile Info */}
          {profileInfo && (
            <View style={styles.profileCard}>
              <Image
                source={{ uri: "https://via.placeholder.com/150" }}
                style={styles.profileImage}
              />
              <Text style={styles.name}>{profileInfo.name}</Text>
              <Text style={styles.email}>{profileInfo.email}</Text>
              <Text style={styles.center}>Center: {profileInfo.center}</Text>
            </View>
          )}

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          {/* Quiz Results */}
          <Text style={styles.scoresTitle}>Quiz Results</Text>
          {quizResults.length > 0 ? (
            quizResults.map((result, index) => (
              <View key={index} style={styles.quizCard}>
                <Text style={styles.quizTitle}>{result.quizName}</Text>
                <Text style={styles.quizScore}>{result.score}/30</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noResults}>No quiz results available.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
    alignSelf: "center",
  },
  scoresContainer: {
    flex: 1,
    padding: 16,
  },
  scoresTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#111827",
  },
  profileCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center", // Center content
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#6b7280",
  },
  center: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 4,
  },
  quizCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  quizScore: {
    fontSize: 16,
    color: "#3b82f6",
  },
  loader: {
    marginTop: 20,
  },
  noResults: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
