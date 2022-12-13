import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function FavoriteScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Profil")}
      >
        <Text style={styles.textButton}>Retour au profil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    width: "80%",
    backgroundColor: "red",
    borderRadius: 10,
  },
  textButton: {
    color: "white",
    fontSize: 20,
  },
});
