import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebaseConfig";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async () => {
    // Reset previous errors
    setEmailError("");
    setPasswordError("");

    // Simple validation
    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
    }

    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    }

    if (email && password && !emailError && !passwordError) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Login successful");
        router.replace("/home"); // Navigate to the main page after successful login
      } catch (error) {
        console.error(error);
        Alert.alert(
          "Login Failed",
          "Invalid email or password. Please try again."
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageTitle}
          source={require("../../assets/images/sl-logo-circle.png")}
        />
      </View>
      <Text style={styles.title}>Log In</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError("");
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput
          style={[styles.input, passwordError ? styles.inputError : null]}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError("");
          }}
          secureTextEntry
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnStyle} onPress={handleLogin}>
          <Text style={styles.btnText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
          <Text style={styles.createAccountLink}>
            Don't have an account? Create one
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogIn;

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
  inputContainer: {
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 15,
    marginBottom: 5,
    fontSize: 16,
    fontFamily: "outfit",
  },
  inputError: {
    borderColor: "#ff4d4d",
  },
  errorText: {
    color: "red",
    fontFamily: "outfit",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 15,
  },
  btnContainer: {
    width: "60%",
    marginTop: 20,
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
  createAccountLink: {
    textAlign: "center",
    marginTop: 20,
    color: "#A9A9A9",
    fontFamily: "outfit",
    fontSize: 14,
  },
});
