import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Pressable
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FavoriteScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.navigate("Profil")}>
        <Ionicons
          name="chevron-back"
          size={50}
          color="#20B08E"
        />
        <Text style={styles.text}>Profil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.navigate("Wishlist")}>
        <Ionicons
          name="ios-heart"
          size={50}
          color="red"
        />
        <Text style={styles.text}>Wishlist</Text>
      </TouchableOpacity>
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
    width: '35%',
  },
  text: {
    color: "#20B08E",
    fontSize: 30,
  },
});