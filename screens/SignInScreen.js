import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textButton}>Don't have an account?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Sign up")}
      >
        <Text style={styles.textButton}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("TabNavigator")}
      >
        <Text style={styles.textButton}>Sign in</Text>
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
    backgroundColor: "#20B08E",
    borderRadius: 10,
  },
});
