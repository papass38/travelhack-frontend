import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import { AntDesign } from "@expo/vector-icons";

import SwipeButton from 'rn-swipe-button'

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View>
        <TouchableOpacity
          style={styles.newTripBtn}
          onPress={() => navigation.navigate("CountrySearch")}
        >
          <AntDesign name="pluscircle" size={50} color="#20B08E" />
          <Text style={styles.text}>New trip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  newTripBtn: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  text: {
    fontSize: 30,
    marginLeft: 10,
    fontWeight: "bold",
  },
});
