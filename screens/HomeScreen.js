import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Header from "../components/Header";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("CountrySearch")}>
        <Text>New Trip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
    },
  button: {
    display: "flex",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    width: "80%",
    backgroundColor: "#20B08E",
    borderRadius: 10,
  },
});
