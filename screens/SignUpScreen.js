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

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");

  const handleRegister = () => {
    fetch("http://172.16.190.135:3000/users/signup", {
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
    <View style={styles.container}>
      <View style={styles.button} activeOpacity={0.8}>
        <View style={styles.registerSection}>
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
      <Text>Already have an account?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Sign in")}
      >
        <Text style={styles.textButton}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "100%",
  },
  registerSection: {},
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "grey",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
  button: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    width: "80%",
    backgroundColor: "#20B08E",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  textButton: {
    color: "#white",
    fontWeight: "bold",
  },
});
