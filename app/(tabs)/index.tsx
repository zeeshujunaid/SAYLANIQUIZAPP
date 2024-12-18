import React from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import Header from "@/components/Header";
import { useRouter } from "expo-router"; // Import useRouter

export default function QuizHomeScreen() {
  const router = useRouter(); // Initialize router

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Main content */}
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Practice Quizzes</Text>

          {/* Row 1 */}
          <View style={styles.cardRow}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('./(auth)/marketingquiz')} // Use router.push here
            >
              <Image
                source={{ uri: "https://www.pngitem.com/pimgs/m/551-5512749_digital-marketing-png-icon-png-download-digital-marketing.png" }}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>Digital Marketing Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('./(auth)/softwarequiz')} // Navigate using router.push
            >
              <Image
                source={{ uri: "https://mir-s3-cdn-cf.behance.net/projects/404/fc5eb5190607873.Y3JvcCwxMDgwLDg0NCwwLDExNw.jpg" }}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>Software Engeneering Quiz</Text>
            </TouchableOpacity>
          </View>

          {/* Row 2 */}
          <View style={styles.cardRow}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('./(auth)/webdevquiz')} // Navigate using router.push
            >
              <Image
                source={{ uri: "https://img.lovepik.com/free-template/bg/20200805/bg/cc809b07a0bf2_400300.png_list.jpg!/fw/431" }}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>Web Development Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('./(auth)/appdevquiz')} // Navigate using router.push
            >
              <Image
                source={{ uri: "https://img.freepik.com/free-vector/user-interface-development-isometric-concept-with-young-woman-creating-custom-design-mobile-application-vector-illustration_1284-72341.jpg" }}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>App Development Quiz</Text>
            </TouchableOpacity>
          </View>

          {/* Row 3 */}
          <View style={styles.cardRow}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('./(auth)/designquiz')} // Navigate using router.push
            >
              <Image
                source={{ uri: "https://5.imimg.com/data5/PC/FS/PG/SELLER-6917958/ux-ui-design-services-500x500.png" }}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>UI-UX Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('/LiveQuiz')} // Navigate using router.push
            >
              <Image
                source={{ uri: "https://cdn6.aptoide.com/imgs/9/4/5/9453024a5f55e2debb92330907272221_icon.png" }}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>Enter Live Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9", // Soft pastel background
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 70, // Add extra space at the bottom to avoid last item hiding under tab bar
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 16,
    marginBottom: 25,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "48%", // Take up half the width in the row
    padding: 20,
    borderRadius: 12,
    elevation: 5, // For Android shadow effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, // Space between the cards
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  cardText: {
    marginTop: 10, // Gap between the image and text
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
});
