import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QuizResult = () => {
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
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafc",
    padding: 30,
  },
  scoresTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop:30,
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
});

export default QuizResult;
