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
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/utils/firebaseConfig";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  const handleCreateAccount = async () => {
    // Reset previous errors
    setNameError("");
    setEmailError("");
    setPasswordError("");

    // Simple validation
    if (!name) {
      setNameError("Name is required");
    }

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

    if (
      name &&
      email &&
      password &&
      !nameError &&
      !emailError &&
      !passwordError
    ) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userCredential.user, { displayName: name });
        console.log("Account created successfully");
        Alert.alert("Success", "Account created successfully", [
          { text: "OK", onPress: () => router.push("/(auth)/login") },
        ]);
      } catch (error) {
        console.error(error);
        Alert.alert(
          "Sign Up Failed",
          "An error occurred while creating your account"
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
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, nameError ? styles.inputError : null]}
          placeholder="Name"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setNameError("");
          }}
          autoCapitalize="words"
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
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
        <TouchableOpacity style={styles.btnStyle} onPress={handleCreateAccount}>
          <Text style={styles.btnText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.loginLink}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateAccount;

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
  loginLink: {
    textAlign: "center",
    marginTop: 20,
    color: "#A9A9A9",
    fontFamily: "outfit",
    fontSize: 14,
  },
});
