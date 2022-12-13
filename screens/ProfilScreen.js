import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function ProfilScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
            <FontAwesome name="user-circle-o" size={38} color="#fff" />
            <Text style={styles.title}>Hello Name !</Text>
            </View> */}
      <Header navigation={navigation} />
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("TabNavigator")}
        >
          <Text style={styles.textButton}>Accueil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Favorites")}
        >
          <Text style={styles.textButton}>Favoris</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Settings")}
        >
          <Text style={styles.textButton}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("To Do")}
        >
          <Text style={styles.textButton}>To Do</Text>
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
  button: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#20B08E",
    borderRadius: 10,
    padding: 10,
  },
  textButton: {
    color: "white",
    fontSize: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  header: {
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#21A37C",
    flexDirection: "row",
    width: "100%",
    height: "10%",
    padding: 10,
    marginTop: 50,
  },
  navButtons: {
    flexDirection: "row",
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
