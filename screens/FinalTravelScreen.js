import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  ImageBackground,
} from "react-native";
import fetchIp from "../fetchIp.json";
import Header from "../components/Header";
import moment from "moment";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { removeAll } from "../reducers/trips";


export default function FinalTravelScreen({ navigation }) {
  const trip = useSelector((state) => state.trip.value);
  const token = useSelector((state) => state.user.value.token);
  const user = useSelector((state) => state.user.value.username);
  const dispatch = useDispatch();

  console.log(trip.initialDestination.adress);

  const handleValidation = () => {
    fetch(`http://${fetchIp.myIp}:3000/users/newtrip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        username: user,
        destination: trip.initialDestination.adress,
        steps: trip.trip,
        budget: trip.totalBudget,
        startDate: trip.startDate,
        endDate: trip.endDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
          dispatch(removeAll())
          navigation.navigate("TabNavigator")
      });
  };

  console.log

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ImageBackground
        source={require("../assets/plane.jpeg")}
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          justifyContent: "flex-end",
        }}
        resizeMode="cover"
      >
        <View style={styles.connectionSection}>
          <View style={styles.textWithPin}>
            <MaterialIcons name="pin-drop" size={28} color="#20B08E" />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {" "}
              {trip.initialDestination.adress}
            </Text>
            {/* <AntDesign name="arrowright" size={24} color="black" />
            <Text style = {{fontSize : 15, }}> {trip.trip[trip.trip.length - 1].name}</Text> */}
          </View>
          <View style={styles.budgetBackground}>
            <Text
              style={{ color: "#20B08E", fontWeight: "bold", fontSize: 16 }}
            >
              {trip.totalBudget}€ /pers
            </Text>
          </View>
          {/* <Text style={{fontWeight:"bold", fontSize:16}}>
            From {moment(trip.startDate).format("L")} to{" "}
            {moment(trip.endDate).format("L")}
          </Text> */}
          <View>
            <Text style={{ fontSize: 20 }}>
              Departure {moment(trip.startDate).endOf("day").fromNow()} !
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => navigation.navigate("Recap")}
        >
          <AntDesign name="arrowleft" size={34} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => {
            handleValidation();
          }}
        >
          <Ionicons name="ios-checkmark-sharp" size={34} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    // alignItems: "center",
    // justifyContent: "flex-start",
    // backgroundColor: "white",
    // height: "100%",
  },
  content: {
    flex: 1,
    height: "100%",
  },
  footer: {
    height: "10%",
    backgroundColor: "#20B08E",
    width: "100%",
    flexDirection: "row",
  },
  arrowButton: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
  },
  connectionSection: {
    paddingTop: 30,
    height: "60%",
    width: "100%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    alignItems: "center",
    justifyContent: "space-evenly",
    //justifyContent: "center",
    backgroundColor: "rgba(246, 246, 246, 0.80)",
  },
  textWithPin: {
    alignItems: "center",
    flexDirection: "row",
    alignContent: "space-between",
  },
  budgetBackground: {
    backgroundColor: "white",
    height: "17%",
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    color: "white",
  },
});
