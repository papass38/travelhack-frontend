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

// get file data toDoData.json
const dataCheckList = require("../toDoData.json");

// dataCheckList.map((elmt) => {
//   console.log(elmt.documents);
// });

export default function ToDoScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [dataId, setDataId] = useState(0);
  const todo = useSelector((state) => state.todo.value);

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
          <Entypo
            name="circle-with-cross"
            size={24}
            color="#fff"
            onPress={() => setModalVisible(false)}
          />
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
