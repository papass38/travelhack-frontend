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
import { AuthSession } from "expo";

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleConnection = () => {
    fetch("http://localhost:3000/users/signin", {
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
          dispatch(login({ username: signInUsername, token: data.token }));
          navigation.navigate("Home");
          setSignInUsername("");
          setSignInPassword("");
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.connectionSection}>
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
        />

        <Pressable style={styles.button} onPress={() => handleConnection()}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
      </View>

      <Text style={styles.textButton}>Don't have an account?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Sign up")}
      >
        <Text style={styles.textButton}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: "20px",
    backgroundColor: "#F6F6F6",
  },
  button: {
    backgroundColor: "#20B08E",
    padding: 10,
    width: "80%",
    borderRadius: "20px",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});
