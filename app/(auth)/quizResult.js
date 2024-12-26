import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const QuizResult = () => {
  const router = useRouter(); // Call useRouter here
  const [quizResults, setQuizResults] = useState([]);

  const fetchQuizResults = async () => {
    try {
      const storedResults = await AsyncStorage.getItem("quizResults");
      if (storedResults) {
        setQuizResults(JSON.parse(storedResults));
      } else {
        setQuizResults([]);
      }
    } catch (error) {
      console.error("Error fetching quiz results:", error);
    }
  };

  useEffect(() => {
    fetchQuizResults();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.scoresTitle}>Quiz Results</Text>
      {quizResults.length > 0 ? (
        quizResults.map((result, index) => (
          <View key={index} style={styles.quizCard}>
            <Text style={styles.quizTitle}>{result.quizName}</Text>
            <Text style={styles.quizScore}>{result.score}/23</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noResults}>No quiz results available.</Text>
      )}

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}
        onPress={() => router.push("/(tabs)")}
        >
          <Icon name="home" size={24} color="#40cf47" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <View style={styles.centerButtonWrapper}>
          <TouchableOpacity style={styles.centerButton}
           onPress={() => router.push("/(tabs)/LiveQuiz")}
           >
            <Icon name="plus" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.centerButtonText}>Add</Text>
        </View>
        <TouchableOpacity style={styles.tabItem}
          onPress={() => router.push("/(tabs)/Profile")}
        >
          <Icon name="user" size={24} color="#40cf47" />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafc",
    padding: 30,
    width: "100%",
    paddingBottom: 80, // Prevent content overlap with the tab bar
  },
  scoresTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  quizCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    borderColor: "#e0e0e0",
    borderWidth: 1,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  quizScore: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4caf50",
  },
  noResults: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    width: width, // Full width of the screen
    position: "absolute",
    bottom: 0,
    height: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowRadius: 10,
    elevation: 10,
  },
  tabItem: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 12,
    color: "#333",
    marginTop: 5,
  },
  centerButtonWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#40cf47",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    shadowColor: "#40cf47",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  centerButtonText: {
    fontSize: 12,
    color: "#333",
    marginTop: 5,
  },
});

export default QuizResult;
