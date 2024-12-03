import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { auth } from "@/utils/firebaseConfig";
import { signOut } from "firebase/auth";

const Home = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || "User");
      setUserEmail(user.email || "");
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      console.error("Error signing out: ", error);
      Alert.alert(
        "Logout Failed",
        "An error occurred while logging out. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageTitle}
          source={require("../assets/images/sl-logo-circle.png")}
        />
      </View>
      <Text style={styles.title}>Welcome, {userName}!</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Name: {userName}</Text>
        <Text style={styles.infoText}>Email: {userEmail}</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnStyle} onPress={handleLogout}>
          <Text style={styles.btnText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    paddingTop: "20%",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 30,
  },
  imageTitle: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 28,
    fontFamily: "outfit-medium",
    marginBottom: 30,
  },
  infoContainer: {
    width: "80%",
    marginBottom: 30,
  },
  infoText: {
    fontSize: 18,
    fontFamily: "outfit",
    marginBottom: 10,
  },
  btnContainer: {
    width: "60%",
  },
  btnStyle: {
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  btnText: {
    textAlign: "center",
    fontFamily: "outfit-medium",
    fontSize: 16,
    paddingVertical: 12,
    color: "#000",
  },
});
