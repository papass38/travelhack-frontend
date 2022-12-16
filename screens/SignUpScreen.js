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
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as React from "react";

WebBrowser.maybeCompleteAuthSession();

//web 90077612632-sqq87ue9rnpj7njp6abht7iv26gj2sg0.apps.googleusercontent.com
//ios 90077612632-1fng2dqhhtvjc8d320p0ulv79j7mv00l.apps.googleusercontent.com
//android

export default function SignUpScreen({ navigation }) {
  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "90077612632-sqq87ue9rnpj7njp6abht7iv26gj2sg0.apps.googleusercontent.com",
    iosClientId:
      "90077612632-1fng2dqhhtvjc8d320p0ulv79j7mv00l.apps.googleusercontent.com",
  });
  const dispatch = useDispatch();

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");

  const handleRegister = () => {
    fetch("http://172.16.190.140:3000/users/signup", {
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
          dispatch(
            login({
              username: signUpUsername,
              token: data.token,
            })
          );
          setSignUpUsername("");
          setSignUpFirstName("");
          setSignUpLastName("");
          setSignUpEmail("");
          setSignUpPassword("");
        }
      });
  };

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
    }
  }, [response]);

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
        <View style={styles.buttonContainer}>
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
          <Button
            disabled={!request}
            title="Login"
            onPress={() => {
              promptAsync();
            }}
          />
          <TouchableOpacity
            style={styles.buttonRadient}
            onPress={() => handleRegister()}
          >
            <LinearGradient
              colors={["#20B08E", "white"]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0, y: 1.7 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  titleContainer: {
    paddingTop: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  signinHeaderSection: {
    height: "50%",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingTop: 60,
    paddingRight: 20,
  },
  title: {
    fontSize: 40,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "70%",
    height: 40,
    borderWidth: "transparent",
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F6F6F6",
  },
  registerSection: {
    paddingVertical: 70,
    width: "100%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(246, 246, 246, 0.7)",
  },
  buttonRadient: {
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#black",
    fontSize: 18,
  },

  button: {
    width: "80%",
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonGoogle: {
    height: "62%",
    justifyContent: "center",
    alignItems: "center",
  },
});
