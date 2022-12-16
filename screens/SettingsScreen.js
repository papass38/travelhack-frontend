import fetchIp from "../fetchIp.json";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { login } from "../reducers/user";
import { useDispatch } from "react-redux";

// comm for commit
export default function FavoriteScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [infoUser, setInfoUser] = useState({ username: null, email: null });
  const [inputUsername, setInputUsername] = useState("");
  useEffect(() => {
    fetch(`http://${fetchIp.myIp}:3000/users/${user.username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          console.log(data.user);
          setInfoUser({ username: data.user.username, email: data.user.email });
        }
      });
  }, []);

  const handleClick = () => {
    fetch(`http://${fetchIp.myIp}:3000/users/${user.username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        replaceUsername: inputUsername,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: inputUsername }));
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.navigate("Profil")}
      >
        <Ionicons name="chevron-back" size={50} color="#20B08E" />
        <Text style={styles.text}>Profil</Text>
      </TouchableOpacity>
      <View
        style={{
          alignItems: "center",
          height: "30%",
          justifyContent: "space-evenly",
        }}
      >
        <Text>Your photo</Text>
        <View
          style={{
            borderColor: "#21A37C",
            borderWidth: 2,
            height: 100,
            width: 100,
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome name="user-secret" size={64} color="black" />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: 200,
            justifyContent: "space-around",
            padding: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#21A37C",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#fff" }}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#21A37C",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#fff" }}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          height: "30%",
          justifyContent: "space-around",
        }}
      >
        <View>
          <Text>Username</Text>
          <TextInput
            placeholder={infoUser.username}
            style={styles.input}
            value={inputUsername}
            onChangeText={(value) => setInputUsername(value)}
          />
        </View>
        <View>
          <Text>Email</Text>
          <TextInput placeholder={infoUser.email} style={styles.input} />
        </View>
        <Pressable
          style={{
            backgroundColor: "#21A37C",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <TouchableOpacity onPress={() => handleClick()}>
            <Text style={{ color: "#fff" }}>Change</Text>
          </TouchableOpacity>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#21A37C",
    width: 300,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "35%",
  },
  text: {
    color: "#20B08E",
    fontSize: 30,
  },
});
