import fetchIp from "../fetchIp.json";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import * as React from "react";

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleConnection = () => {
    fetch(`http://${fetchIp.myIp}:3000/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setMessageError("");
          dispatch(
            login({
              username: data.user.username,
              email: data.user.email,
              photo: data.user.photo,
              token: data.user.token,
            })
          );
          navigation.navigate("TabNavigator");
          setSignInUsername("");
          setSignInPassword("");
        } else if (data.error === "Missing or empty fields") {
          setMessageError("Missing or empty fields");
        } else if (data.error === "User not found or wrong password") {
          setMessageError("User not found or incorrect password");
        }
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ImageBackground
          source={require("../assets/travelhack-logo.png")}
          style={styles.imageBackground}
          resizeMode="contain"
        ></ImageBackground>
        <View style={styles.connectionSection}>
          <View>
            <Text style={styles.title}>Welcome back !</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(e) => setSignInUsername(e)}
            value={signInUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(e) => setSignInPassword(e)}
            value={signInPassword}
            secureTextEntry={true}
            textContentType={"password"}
          />
          <Text
            style={{
              color: "red",
              fontWeight: "bold",
              textAlign: "center",
              paddingBottom: 15,
            }}
          >
            {messageError}
          </Text>
          <TouchableOpacity
            style={styles.buttonRadient}
            onPress={() => handleConnection()}
          >
            <View style={styles.button}>
              <Text style={styles.signInButton}>Sign In</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.text}>Don't have an account?</Text>

          <TouchableOpacity
            style={styles.buttonRadient}
            onPress={() => navigation.navigate("Sign up")}
          >
            <View style={styles.button}>
              <Text style={styles.signUpButton}>Sign up</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#20B08E",
  },
  imageBackground: {
    flex: 1,
    height: "100%", // This can be adjusted based on your desired size
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    margin: 50,
    marginBottom: 0,
  },
  titleSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    marginBottom: 140,
  },
  title: {
    fontSize: 25,
    color: "black",
    marginBottom: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 25,
    color: "white",
  },
  buttonRadient: {
    backgroundColor: "#20B08E",
    width: "80%",
    borderRadius: 10,
    alignItems: "center",
  },

  input: {
    width: "80%",
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
    borderWidth: "none",
  },
  button: {
    backgroundColor: "#20B08E",
    paddingVertical: 10,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  signUpButton: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  orText: {
    marginVertical: 10,
  },
  signInButton: {
    color: "F6F6F6",
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },

  connectionSection: {
    width: "100%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(246, 246, 246, 0.7)",
    paddingVertical: 50,
  },
  buttonGoogle: {
    backgroundColor: "white",
    width: "80%",
    paddingVertical: 0,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#black",
    fontSize: 18,
  },
  text: {
    marginVertical: 10,
  },
});
