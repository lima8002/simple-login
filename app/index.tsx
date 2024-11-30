import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageTitle}
          source={require("../assets/images/sl-logo-circle.png")}
        />
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.bodyTitle}>Simple Login App</Text>
        <Text style={styles.bodySubtitle}>
          This is a simple login application built with React Native and
          Firebase Authentication. It provides basic user authentication
          functionality including sign up, login, logout and email verification
          features.
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnStyle}>
          <Text style={styles.btnText}>Let's get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "30%",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: 320,
    height: 320,
    borderRadius: 90,
    overflow: "hidden",
  },
  imageTitle: {
    resizeMode: "cover",
    width: "98%",
    height: "100%",
  },
  bodyContainer: {
    paddingHorizontal: 25,
  },
  bodyTitle: {
    fontSize: 28,
    fontFamily: "outfit-medium",
    textAlign: "center",
    paddingTop: 20,
  },
  bodySubtitle: {
    paddingTop: 30,
    fontSize: 20,
    fontFamily: "outfit",
    textAlign: "justify",
  },
  btnContainer: {
    paddingTop: 30,
    width: "60%",
    alignSelf: "center",
  },
  btnStyle: {
    borderWidth: 1,
    borderRadius: 25,
  },
  btnText: {
    textAlign: "center",
    fontFamily: "outfit-medium",
    fontSize: 16,
    paddingVertical: 12,
  },
});
