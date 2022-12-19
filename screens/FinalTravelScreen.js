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
import { useEffect, useState } from "react";
import DestinationInfos from "../components/DestinationInfos";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

export default function FinalTravelScreen({ navigation }) {
  const trip = useSelector((state) => state.trip.value);
  const token = useSelector((state) => state.user.value.token);
  const user = useSelector((state) => state.user.value.username);

  const handleValidation = () => {
    fetch(`http://${fetchIp.myIp}:3000/users/newtrip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        username: user,
        destination: trip.initialDestination.adress,
        steps: [],
        budget: trip.totalBudget.toFixed(2),
        startDate: trip.startDate,
        endDate: trip.endDate,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        for (let step of trip.trip) {
          fetch(`http://${fetchIp.myIp}:3000/users/newtrip/newstep`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token: token,
              username: user,
              name: step.name,
              latitude: step.coordinates.latitude,
              longitude: step.coordinates.longitude,
              mealBudget: step.budget.meal,
              roomBudget: step.budget.room,
            }),
          })
            .then((res) => res.json())
            .then((data) => console.log(data));
        }
      });
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ImageBackground source={require('../assets/plane.jpeg')} style={{width: '100%', height: '76%', flex: 1}}>
      <View styles = {styles.content}>
      <Button
        title="Click!"
        onPress={() => {
          handleValidation();
        }}
      />
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
          <AntDesign name="arrowright" size={34} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
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
  // content : {
  //   flex : 1,
  //   height : "100%",
    
  // }
});
