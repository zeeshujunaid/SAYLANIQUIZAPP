import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import { auth, db } from "../../utils/firebase";

export default function Profile() {
  const [profileInfo, setProfileInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      let name = "Name Not Available";
      let email = "Email Not Available";
      let center = "Not Available";
  
      const storedProfile = await AsyncStorage.getItem("info");
      if (storedProfile) {
        const { name: asyncName, email: asyncEmail, center: asyncCenter } =
          JSON.parse(storedProfile);
        name = asyncName || name;
        email = asyncEmail || email;
        center = asyncCenter || center;
      }
  
      if (name === "Name Not Available") {
        const user = auth.currentUser;
        if (user) {
          const userDoc = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userDoc);
  
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            name = userData.name || "Name Not Available";
            email = userData.email || "Email Not Available";
            center = userData.center || "Not Available";
            await AsyncStorage.setItem("info", JSON.stringify({ name, email, center }));
          }
        }
      }
  
      setProfileInfo({ name, email, center });
    } catch (error) {
      Toast.show({ type: "error", text1: "Error fetching data", text2: "Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.clear();
      Toast.show({ type: "success", text1: "Logged Out", text2: "You have been successfully logged out." });
      router.push("/sign-in");
    } catch (error) {
      Toast.show({ type: "error", text1: "Logout Failed", text2: "Please try again." });
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
          <ScrollView style={styles.scoresContainer} showsVerticalScrollIndicator={false}>
            {/* Top Section */}
            <View style={styles.topSection}>
              {profileInfo && (
                <View style={styles.profileCard}>
                  <View style={styles.header}>
                    <Image
                      source={{
                        uri: "https://avatars.githubusercontent.com/u/155985389?s=400&u=143d628a397176208d57037c896734943265e663&v=4",
                      }}
                      style={styles.profileImage}
                    />
                    <Text style={styles.profileName}>{profileInfo.name}</Text>
                  </View>

                  <View style={styles.profileDetails}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Email:</Text>
                      <Text style={styles.detailValue}>{profileInfo.email}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Center:</Text>
                      <Text style={styles.detailValue}>{profileInfo.center}</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
              <TouchableOpacity
                style={styles.navigateButton}
                onPress={() => router.push("/(auth)/quizResult")}
              >
                <Text style={styles.navigateText}>View All Quiz Results</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginTop: 12,
    textAlign: "center",
  },
  scoresContainer: {
    flex: 1,
    paddingBottom: 80,
  },
  profileCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    shadowColor: "#000",
    borderColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  header: {
    alignItems: "center",
  },
  profileDetails: {
    marginTop: 20,
    width: "100%",
  },
  detailRow: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  detailValue: {
    fontSize: 16,
    color: "#333",
  },
  loader: {
    marginTop: 20,
  },
  navigateButton: {
    backgroundColor: "#47a84b",
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
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  topSection: {
    flex: 1,
    marginBottom: 40,
  },
  bottomSection: {
    flex: 1,
    alignItems: "center",
  },
});
