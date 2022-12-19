import fetchIp from "../fetchIp.json";
import jwtDecode from "jwt-decode";
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
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

//web 90077612632-sqq87ue9rnpj7njp6abht7iv26gj2sg0.apps.googleusercontent.com
//ios 90077612632-1fng2dqhhtvjc8d320p0ulv79j7mv00l.apps.googleusercontent.com
//android

export default function SignUpScreen({ navigation }) {
  const [user, setUser] = useState(null);
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

  const handleLogin = (credentialResponse) => {
    const userInfo = jwtDecode(credentialResponse.credential);
    setUser(userInfo);
  };

  const handleRegister = () => {
    fetch(`http://${fetchIp.myIp}:3000/users/signup`, {
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
              email: signUpEmail,
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
          <Text style={styles.signInBtnText}>Already have an account?</Text>
          <TouchableOpacity
            style={styles.signInBackBtn}
            onPress={() => navigation.navigate("Sign in")}
          >
            <Ionicons name="chevron-back" size={50} color="white" />
            <Text style={styles.text}>Sign In</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Sign in")}
          >
            <FontAwesome
              style={styles.textButton}
              name="sign-in"
              color="black"
              size={30}
            />
          </TouchableOpacity> */}
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Travel Hack</Text>
        </View>
      </View>
      <KeyboardAvoidingView style={styles.registerSection} activeOpacity={0.8}>
        <KeyboardAvoidingView style={styles.buttonContainer}>
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
          <TouchableOpacity
            style={styles.buttonGoogle}
            onPress={() => {
              promptAsync();
              navigation.navigate("TabNavigator");
            }}
            onSuccess={(credentialResponse) => {
              handleLogin(credentialResponse);
            }}
            disabled={!request}
          >
            <AntDesign name="google" size={32} color="black" title="Login" />
            <Text> SignUp with Google</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
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
    paddingTop: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  signinHeaderSection: {
    height: "50%",
    width: "100%",
    paddingTop: 60,
    paddingRight: 20,
    marginLeft: 10,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
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
    paddingVertical: 30,
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
    marginBottom: 10,
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
  signInBackBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    textAlign: "center",
    width: "45%",
  },
  text: {
    color: "white",
    fontSize: 30,
  },
  signInBtnText: {
    color: "white",
    fontWeight: "bold",
  },
});
