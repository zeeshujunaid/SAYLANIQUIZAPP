import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar as RNStatusBar,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

export default function Header() {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  // Fetch user info from AsyncStorage
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await AsyncStorage.getItem("info");
        if (userInfo) {
          const { name } = JSON.parse(userInfo);
          setUserName(name);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      {/* Make the app immersive */}
      <StatusBar style="light" hidden={false} translucent={true} />
      {Platform.OS === "android" && <RNStatusBar translucent backgroundColor="transparent" />}

      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          {/* Left Section */}
          <View style={styles.leftSection}>
            <Text style={styles.nameText}>Hi, {userName}</Text>
            <Text style={styles.subtitleText}>Welcome Back Lets Start Practicing!</Text>
          </View>

          {/* Right Section */}
          <View style={styles.rightSection}>
            <TouchableOpacity onPress={() => router.push("/(tabs)/Profile")}>
              <Image
                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN5XaPknTWTxdBcdC3r0_9blSi_8n3rD_2Xg&s" }} // Replace with profile image URI
                style={styles.profileIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Your additional content goes here */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 140, // Add top padding to ensure enough space for header
  },
  headerContainer: {
    position: "absolute", // Fix the header at the top
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "flex-start", // Align to the top
    justifyContent: "space-between", // Create space between the left and right sections
    paddingHorizontal: 16,
    paddingVertical: 20,
    height: 100, // Fixed height for the header
    backgroundColor: "transparent", // No background color
  },
  leftSection: {
    flex: 1,
    height: "400%",
    paddingLeft: 10,
    // backgroundColor: "#86ef78", // No background color
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
    marginTop: 30,
    height: 30, 
  },
  subtitleText: {
    fontSize: 14,
    color: "green",
    marginTop: 5, // Adjusted margin-top to place it closer to the name
  },
  rightSection: {
    justifyContent: "center",
    paddingLeft: 10,
    alignItems: "center",
    paddingTop: 55, // Added padding top for the profile icon
  },
  profileIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#fff",
  },
});
