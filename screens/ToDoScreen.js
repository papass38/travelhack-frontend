import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useSelector } from "react-redux";
import CheckBoxData from "../components/CheckBoxData";
import ChoiceCheckList from "../components/ChoiceCheckList";
import Header from "../components/Header";
import { Entypo } from "@expo/vector-icons";
import { useEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

// get file data toDoData.json
const dataCheckList = require("../toDoData.json");
const dataVaccins = require("../vaccins.json");

// dataCheckList.map((elmt) => {
//   console.log(elmt.documents);
// });

export default function ToDoScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [dataId, setDataId] = useState(0);
  const [tripData, setTripData] = useState("");
  const [vaccins, setVaccins] = useState();
  const todo = useSelector((state) => state.todo.value);
  const trip = useSelector((state) => state.trip.value);

  useEffect(() => {
    if (trip.initialDestination.adress === undefined) {
      setTripData("");
    } else if (trip.initialDestination.adress.split(" ").length === 2) {
      setTripData(trip.initialDestination.adress.split(" ")[1].toUpperCase());
    } else if (trip.initialDestination.adress.split(" ").length === 1) {
      setTripData(trip.initialDestination.adress.split(" ")[0].toUpperCase());
    }
  });

  useEffect(() => {
    dataVaccins.map((elmt) => {
      if (tripData === elmt.country) {
        setVaccins(elmt.vaccinations.name);
      }
    });
  });

  const listingDataCheckList = dataCheckList.map((elmt) => {
    return (
      <ChoiceCheckList
        props={elmt}
        key={elmt.id}
        dataId={dataId}
        setDataId={setDataId}
      />
    );
  });

  const listingCheckBox = dataCheckList.map((elmt) => {
    if (elmt.id === dataId) {
      return <CheckBoxData props={elmt} key={dataId} />;
    }
  });

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <View style={styles.containerCheckList}>
        <ScrollView horizontal={true}>{listingDataCheckList}</ScrollView>
      </View>

      <Pressable onPress={() => setModalVisible(true)}>
        <Text style={{ color: "#21A37C" }}>See All Selections</Text>
      </Pressable>

      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <View style={styles.modal}>
          <View
            style={{
              paddingBottom: 20,
              alignItems: "center",
              justifyContent: "space-around",
              height: 200,
            }}
          >
            <Entypo
              name="circle-with-cross"
              size={24}
              color="#fff"
              onPress={() => setModalVisible(false)}
            />
            <View
              style={{
                height: 50,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                width: "80%",
              }}
            >
              <Text style={{ color: "#fff" }}>
                Vaccines recommended for : {tripData}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "70%",
                  justifyContent: "space-evenly",
                }}
              >
                <FontAwesome5 name="syringe" size={20} color="#fff" />
                <Text style={{ color: "#fff", fontSize: 18 }}>{vaccins}</Text>
              </View>
            </View>
          </View>

          {todo.map((elmt, index) => {
            return (
              <View key={index} style={styles.modalChoice}>
                <Text style={{ color: "#20B08E" }}>{elmt}</Text>
              </View>
            );
          })}
        </View>
      </Modal>

      <ScrollView>
        <View style={styles.choiceCheckList}>{listingCheckBox}</View>
      </ScrollView>
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
  containerCheckList: {
    paddingTop: 15,
    alignItems: "center",
    height: "20%",
    padding: 15,
  },
  choiceCheckList: {
    position: "relative",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "60%",
  },
  button: {
    backgroundColor: "#20B08E",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 15,
  },
  modal: {
    backgroundColor: "#20B08E",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  modalChoice: {
    backgroundColor: "#fff",
    width: "80%",
    marginTop: 5,
    padding: 10,
    borderRadius: 5,
  },
});
