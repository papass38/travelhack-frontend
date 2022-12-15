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

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleConnection = () => {
    fetch("http://172.16.190.18:3000/users/signin", {
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
          navigation.navigate("TabNavigator");
          setSignInUsername("");
          setSignInPassword("");
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Access to your acount</Text>
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
          secureTextEntry={true}
          textContentType={"password"}
        />
        <TouchableOpacity
          style={styles.buttonRadient}
          onPress={() => handleConnection()}
        >
          <LinearGradient
            colors={["#20B08E", "white"]}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 0, y: 1.7 }}
            style={styles.button}
          >
            <Text style={styles.signInButton}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Text style={styles.orText}>Or Sign in With</Text>

      <Text style={styles.text}>Don't have an account?</Text>

      <TouchableOpacity
        style={styles.buttonRadient}
        onPress={() => navigation.navigate("Sign up")}
      >
        <LinearGradient
          colors={["#20B08E", "white"]}
          start={{ x: 0, y: 0.2 }}
          end={{ x: 0, y: 1.7 }}
          style={styles.button}
        >
          <Text style={styles.signUpButton}>Sign up</Text>
        </LinearGradient>
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
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  buttonRadient: {
    backgroundColor: "#20B08E",
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "grey",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
  },
  button: {
    backgroundColor: "#20B08E",
    paddingVertical: 10,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  signUpButton: {
    color: "F6F6F6",
    fontSize: 18,
  },
  orText: {
    marginVertical: 10,
  },
  signInButton: {
    color: "F6F6F6",
    fontSize: 18,
  },

  connectionSection: {
    width: "100%",
  },
});
