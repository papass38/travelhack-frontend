import fetchIp from "../fetchIp.json";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

// WebBrowser.maybeCompleteAuthSession();

//web 90077612632-sqq87ue9rnpj7njp6abht7iv26gj2sg0.apps.googleusercontent.com
//ios 90077612632-1fng2dqhhtvjc8d320p0ulv79j7mv00l.apps.googleusercontent.com
//android

export default function SignUpScreen({ navigation }) {
  const [user, setUser] = useState(null);
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   clientId:
  //     "90077612632-sqq87ue9rnpj7njp6abht7iv26gj2sg0.apps.googleusercontent.com",
  //   iosClientId:
  //     "90077612632-1fng2dqhhtvjc8d320p0ulv79j7mv00l.apps.googleusercontent.com",
  // });
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
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        photo:
          "https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?b=1&s=170667a&w=0&k=20&c=HEO2nP4_uEAn0_JzVTU6_Y5hyn-qHxyCrWWTirBvScs=",
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          navigation.navigate("TabNavigator");
          dispatch(
            login({
              username: data.user.username,
              email: data.user.email,
              photo: data.user.photo,
              token: data.user.token,
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

  // React.useEffect(() => {
  //   if (response?.type === "success") {
  //     const { authentication } = response;
  //   }
  // }, [response]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/travelhack-logo.png")}
        style={styles.imageBackground}
        resizeMode="contain"
      >
        <View style={styles.signinHeaderSection}>
          <View style={styles.sectionSignInBtnText}>
            <Text style={styles.signInBtnText}>Already have an account?</Text>
            <TouchableOpacity
              style={styles.signInBackBtn}
              onPress={() => navigation.navigate("Sign in")}
            >
              <Ionicons name="ios-arrow-back-circle" size={30} color="white" />
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
        </View>
      </ImageBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.registerSection}
      >
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

          <TouchableOpacity
            style={styles.buttonRadient}
            onPress={() => handleRegister()}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
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
  titleContainer: {
    paddingTop: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  signinHeaderSection: {
    position: "absolute",
    top: 20,
    height: "40%",
    width: "100%",
    paddingLeft: 20,
    marginBottom: 240,
  },
  sectionSignInBtnText: {
    margin: 0,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    color: "white",
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
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },

  button: {
    width: "70%",
    height: 40,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "#20B08E",
    marginBottom: 50,
  },
  buttonGoogle: {
    backgroundColor: "black",
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
