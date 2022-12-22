import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { logout } from "../reducers/user";
import { useDispatch } from "react-redux";
import { initializeTrip } from "../reducers/trips";
import { AntDesign } from "@expo/vector-icons";

export default function Header({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("Profil")}
        style={{ borderWidth: 1, borderRadius: "50%", borderColor: "#F6F6F6" }}
      >
        <Image
          source={{ uri: user.photo }}
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            borderWidth: 1,
            borderColor: "#F6F6F6",
          }}
        />
      </Pressable>

      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginTop: 10,
            fontSize: 18,
            color: "#F6F6F6",
            fontWeight: "bold",
          }}
        >
          Welcome {user.username} !
        </Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <AntDesign
          name="logout"
          size={35}
          color="#F6F6F6"
          onPress={() => {
            dispatch(initializeTrip(""));
            dispatch(logout());
            navigation.navigate("Sign in");
          }}
        />
        <Text style={{ color: "#F6F6F6", fontSize: 12 }}>Logout</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#20B08E",
    flexDirection: "row",
    width: "100%",
    height: "14%",
    paddingTop: 40,
    paddingBottom: 10,
  },
});
