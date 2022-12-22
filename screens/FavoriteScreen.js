import fetchIp from "../fetchIp.json";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

// comm for commit
export default function FavoriteScreen({ navigation }) {
  const [input, setInput] = useState("");
  const [array, setArray] = useState([]);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch(`http://${fetchIp.myIp}:3000/users/${user.username}`)
      .then((res) => res.json())
      .then((data) => {
        setArray(data.user.favorites);
      });
  }, []);

  const listing = array.map((e, i) => {
    return (
      <View key={i} style={styles.arrayResult}>
        <Text style={{ fontSize: 25 }}>{e.name}</Text>
        <Ionicons
          name="ios-trash-outline"
          size={30}
          color="black"
          onPress={() => handleRemove(e)}
        />
      </View>
    );
  });

  const handleRemove = (e) => {
    fetch(`http://${fetchIp.myIp}:3000/users/removeFavorite/${user.username}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: e.name }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    setArray(array.filter((data) => data.name !== e.name));
  };

  const handleClick = () => {
    console.log(input);
    if (input) {
      fetch(`http://${fetchIp.myIp}:3000/users/addFavorite/${user.username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: input }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });

      setInput("");
      setArray((e) => [...e, { name: input }]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.navigate("Profil")}
      >
        <Ionicons
          style={{ paddingLeft: 10 }}
          name="ios-arrow-back-circle"
          size={40}
          color="#20B08E"
        />
        <Text style={styles.textHeader}>Profil</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          paddingBottom: 20,
        }}
      >
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={(e) => setInput(e)}
          placeholder="Where do you want to go ?"
        />
        <Ionicons
          name="add-circle"
          size={50}
          color="#20B08E"
          onPress={() => {
            handleClick();
          }}
        />
      </View>
      <ScrollView>{listing}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: "Ubuntu-Regular",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "35%",
    fontFamily: "Ubuntu-Regular",
  },
  textHeader: {
    fontSize: 30,
    color: "#20B08E",
    fontFamily: "Ubuntu-Regular",
  },
  input: {
    flexDirection: "row",
    fontSize: 20,
    width: "80%",
    padding: 5,
    borderBottomWidth: 1,
    marginRight: 10,
    fontFamily: "Ubuntu-Regular",
  },
  arrayResult: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 7,
    backgroundColor: "#F5F5F5",
    borderRadius: 7,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "gray",
    shadowOpacity: 1.0,
    fontFamily: "Ubuntu-Regular",
  },
});
