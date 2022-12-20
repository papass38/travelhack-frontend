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
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { addArray, removeArray } from "../reducers/array";

// comm for commit
export default function FavoriteScreen({ navigation }) {
  const [input, setInput] = useState("");
  const array = useSelector((state) => state.array.value);

  const dispatch = useDispatch();
  const listing = array.map((e, i) => {
    return (
      <View key={i} style={styles.arrayResult}>
        <Text style={{ fontSize: 25 }}>{e}</Text>
        <Ionicons
          name="ios-trash-outline"
          size={30}
          color="black"
          onPress={() => dispatch(removeArray(e))}
        />
      </View>
    );
  });

  const handleClick = () => {
    if (input) {
      setInput("");
      dispatch(addArray(input));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.navigate("Profil")}
      >
        <Ionicons name="chevron-back" size={50} color="#20B08E" />
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
      <ScrollView>
      {listing}
      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "35%",
  },
  textHeader: {
    fontSize: 30,
    color: "#20B08E",
  },
  input: {
    flexDirection: "row",
    fontSize: 20,
    width: "80%",
    padding: 5,
    borderBottomWidth: 1,
    marginRight: 10,
  },
  arrayResult: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    padding: 5,
    marginHorizontal: 10,
    marginVertical: 2,
  },
});
