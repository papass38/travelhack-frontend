import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");

  const handleRegister = () => {
    fetch("http://172.16.191.15:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signUpUsername,
        firstname: signUpFirstName,
        lastname: signUpLastName,
        email: signUpEmail,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          navigation.navigate("TabNavigator");
          dispatch(login({ username: signUpUsername, token: data.token }));
          setSignUpUsername("");
          setSignUpFirstName("");
          setSignUpLastName("");
          setSignUpEmail("");
          setSignUpPassword("");
        }
      });
  };

  return (
    <LinearGradient
      colors={["#20B08E", "white"]}
      start={{ x: 0, y: 0.2 }}
      end={{ x: 0, y: 1.7 }}
      style={styles.container}
    >
      <View style={styles.signinHeaderSection}>
        <View>
          <Text>Already have an account?</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Sign in")}
          >
            <FontAwesome
              style={styles.textButton}
              name="sign-in"
              color="black"
              size={30}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Travel Hack</Text>
        </View>
      </View>
      <View style={styles.registerSection} activeOpacity={0.8}>
        <View style={styles.button}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(e) => setSignUpUsername(e)}
            value={signUpUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Firstname"
            onChangeText={(e) => setSignUpFirstName(e)}
            value={signUpFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Lastname"
            onChangeText={(e) => setSignUpLastName(e)}
            value={signUpLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(e) => setSignUpEmail(e)}
            value={signUpEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(e) => setSignUpPassword(e)}
            value={signUpPassword}
            secureTextEntry={true}
            textContentType={"password"}
          />
          <Pressable style={styles.button} onPress={() => handleRegister()}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
  titleContainer: {
    paddingTop: 120,
    alignItems: "center",
  },
  signinHeaderSection: {
    height: "50%",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    padding: 30,
  },
  title: {
    fontSize: 40,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "grey",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
  },
  registerSection: {
    paddingVertical: 40,
    width: "100%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(246, 246, 246, 0.7)",
  },
  buttonText: {
    color: "#black",
    fontSize: 18,
  },

  button: {
    width: "80%",
  },
});
