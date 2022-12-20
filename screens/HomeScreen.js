import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import fecthIp from "../fetchIp.json";

import Modal from "react-native-modal";

export default function HomeScreen({ navigation }) {
  const myUsername = useSelector((state) => state.user.value.username);

  const [newTripsList, setNewTripsList] = useState([]);
  const [oldTripsList, setOldTripsList] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    destination: "Londres",
    startDate: "20/12/2022",
    endDate: "27/12/2022",
    steps: [{ name: "Manchester" }, { name: "Chelsea" }, { name: "Liverpool" }],
    totalBudget: "522.19",
  });

  const isFocused = useIsFocused();

  useEffect(() => {
    fetch(`http://${fecthIp.myIp}:3000/users/alltrips/${myUsername}`)
      .then((res) => res.json())
      .then((data) => {
        const newTripTab = [];
        const oldTripTab = [];
        // console.log(data.trips);
        for (let item of data.trips) {
          if (new Date(item.endDate).getTime() > new Date().getTime()) {
            newTripTab.push(item);
          } else {
            oldTripTab.push(item);
          }
        }
        // console.log(oldTripTab);
        setNewTripsList(newTripTab);
        setOldTripsList(oldTripTab);
      });
  }, [isFocused]);

  let oldTripsExist = "No old trip yet";
  if (oldTripsList.length > 0) {
    oldTripsExist = "Old Trips";
  }

  let newTripsExist = "No trip planned yet";
  if (newTripsList.length > 0) {
    newTripsExist = "";
  }

  const newTripsDisplay = newTripsList.map((data, i) => {
    return (
      <TouchableOpacity
        key={i}
        style={styles.newTrip}
        onPress={() => {
          setModalVisible(!isModalVisible);
          setModalData({
            destination: data.destination,
            startDate: data.startDate,
            endDate: data.endDate,
            steps: data.steps,
            totalBudget: data.totalBudget,
          })
        }}
      >
        <Image
          style={styles.imgTrip}
          source={{
            uri: "https://img.static-rmg.be/a/view/q75/w4000/h2667/4779070/2135445-jpg.jpg",
          }}
        />

        <View style={styles.textNewTrip}>
          <View>
            <Text style={{ fontWeight: "bold" }}>{data.destination}</Text>
            <Text>{new Date(data.startDate).toLocaleDateString()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  const oldTripsDisplay = oldTripsList.map((data, i) => {
    return (
      <TouchableOpacity
        key={i}
        style={styles.oldTrip}
        onPress={() => {
          setModalVisible(!isModalVisible);
          setModalData({
            destination: data.destination,
            startDate: data.startDate,
            endDate: data.endDate,
            steps: data.steps,
            totalBudget: data.totalBudget,
          });
        }}
      >
        <Image
          style={styles.imgOldTrip}
          source={{
            uri: "https://img.static-rmg.be/a/view/q75/w4000/h2667/4779070/2135445-jpg.jpg",
          }}
        />

        <View style={styles.textOldTrip}>
          <View>
            <Text style={{ fontWeight: "bold" }}>{data.destination}</Text>
            <Text>
              {new Date(data.startDate).toLocaleDateString()} -
              {new Date(data.endDate).toLocaleDateString()}{" "}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  const stepsModal = modalData.steps.map((data, i) => {
    return <Text key={i}>{data.name}</Text>;
  });

  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible} style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.modalText}>
            <Text style={{ fontWeight: "bold" }}>{modalData.destination}</Text>
            <Text>{new Date(modalData.startDate).toLocaleDateString()}</Text>
            <Text>{new Date(modalData.endDate).toLocaleDateString()}</Text>
            <Text>{modalData.totalBudget}€</Text>
            <View>
              <Text>Steps :</Text>
              {stepsModal}
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setModalVisible(!isModalVisible)}
            style={styles.modalButton}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Header navigation={navigation} />
      <View>
        <TouchableOpacity
          style={styles.newTripBtn}
          onPress={() => navigation.navigate("CountrySearch")}
        >
          <AntDesign name="pluscircle" size={50} color="#20B08E" />
          <Text style={styles.text}>New trip</Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        {newTripsExist}
      </Text>
      <View style={styles.newScrollContainer}>
        <ScrollView horizontal contentContainerStyle={styles.newTripsScroll}>
          {newTripsDisplay}
        </ScrollView>
      </View>
      <Text
        style={{
          fontWeight: "bold",
          marginTop: 20,
          marginBottom: 20,
          fontSize: 20,
        }}
      >
        {oldTripsExist}
      </Text>
      <View style={styles.OldScrollContainer}>
        <ScrollView contentContainerStyle={styles.oldTripsScroll}>
          {oldTripsDisplay}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
  },
  newTripBtn: {
    flexDirection: "row",
    alignItems: "center",
    margin: 30,
  },
  text: {
    fontSize: 30,
    marginLeft: 10,
    fontWeight: "bold",
  },
  newScrollContainer: {
    height: "30%",
    minWidth: "100%",
  },
  newTripsScroll: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  newTrip: {
    height: 230,
    width: 230,
    justifyContent: "space-between",
    borderWidth: 4,
    borderColor: "#20B08E",
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  imgTrip: {
    width: "100%",
    height: "70%",
  },
  textNewTrip: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  OldScrollContainer: {
    height: "30%",
    width: "100%",
  },
  oldTripsScroll: {
    alignItems: "center",
  },
  oldTrip: {
    height: 100,
    width: "90%",
    borderWidth: 4,
    borderColor: "#20B08E",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  imgOldTrip: {
    width: "40%",
    height: "100%",
  },
  textOldTrip: {
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  modal: {
    flex: 1,
    height: "100%",
    width: "100%",
    margin: 0,
    backgroundColor: "rgba(27, 25, 26, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#E6E6E6",
    height: "60%",
    width: "80%",
    padding: 20,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#20B08E",
  },
  modalText: {
    borderRadius: 20,
    padding: 40,
    height: "50%",
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: "#20B08E",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "10%",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
