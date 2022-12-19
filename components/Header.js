import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { SimpleLineIcons } from "@expo/vector-icons";
import { logout } from "../reducers/user";
import { useDispatch } from "react-redux";
import { initializeTrip } from "../reducers/trips";
import { AntDesign } from "@expo/vector-icons";

export default function Header({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const trip = useSelector((state) => state.trip.value);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("Profil")}
        style={{ borderWidth: 2, borderRadius: "50%", borderColor: "#fff" }}
      >
        <Image
          source={{ uri: user.photo }}
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            borderWidth: 2,
            borderColor: "#F6F6F6",
          }}
        />
      </Pressable>

      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, color: "#fff" }}>
          Welcome {user.username} !
        </Text>
        <Text style={{ fontSize: 12 }}>
          Travel : {trip.initialDestination.adress}
        </Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <SimpleLineIcons
          name="logout"
          size={24}
          color="#fff"
          onPress={() => {
            dispatch(initializeTrip(""));
            dispatch(logout());
            navigation.navigate("Sign in");
          }}
        />
        <Text style={{ color: "#fff", fontSize: 12 }}>Logout</Text>
      </View>
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
