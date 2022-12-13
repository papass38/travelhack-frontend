import { View, StyleSheet, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.container}>
      <FontAwesome name="user-circle-o" size={38} color="#fff" />
      <Text>Welcome Julien !</Text>
      <Feather name="menu" size={32} color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#21A37C",
    flexDirection: "row",
    width: "100%",
    height: "14%",
    paddingTop: 40,
  },
});
