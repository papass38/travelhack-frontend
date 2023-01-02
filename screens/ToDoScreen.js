import { useState } from "react";
import fetchIp from "../fetchIp.json";
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
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// get file data toDoData.json
const dataCheckList = require("../toDoData.json");
const dataVaccins = require("../vaccins.json");

export default function ToDoScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(true);
  const [dataId, setDataId] = useState(0);
  const [tripData, setTripData] = useState("");
  const [vaccins, setVaccins] = useState();
  const todoId = useSelector((state) => state.todo.value.todoId);
  const user = useSelector((state) => state.user.value);
  const [task, setTask] = useState([]);

  // FOR VACCINE DATA
  useEffect(() => {
    fetch(`http://${fetchIp.myIp}:3000/users/todo/${user.token}/${todoId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setTask(data.todo);
        }
      });

    dataVaccins.map((elmt) => {
      if (tripData === elmt.country) {
        setVaccins(elmt.vaccinations.name);
      }
    });
  }, []);

  // FOR GETTING TODO DATA IN MODAL
  const handleClick = () => {
    setModalVisible(true);
    setDataId(0);
    fetch(`http://${fetchIp.myIp}:3000/users/todo/${user.token}/${todoId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setTask(data.todo);
        }
      });
  };

  // REMOVE TODO
  const handleRemove = (e) => {
    fetch(
      `http://${fetchIp.myIp}:3000/users/removeTodo/${user.token}/${todoId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newTodo: e.task }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTask(data.todoData);
      });
  };

  const listingDataCheckList = dataCheckList.map((elmt, i) => {
    return (
      <ChoiceCheckList
        props={elmt}
        key={i}
        dataId={dataId}
        setDataId={setDataId}
      />
    );
  });

  const listingCheckBox = dataCheckList.map((elmt, i) => {
    if (elmt.id === dataId) {
      return <CheckBoxData props={elmt} key={i} />;
    }
  });

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <View style={styles.containerCheckList}>
        <ScrollView horizontal={true}>{listingDataCheckList}</ScrollView>
      </View>

      <Pressable onPress={() => handleClick()}>
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
          <View>
            {task &&
              task.map((e, i) => {
                return (
                  <View key={i} style={styles.modalChoice}>
                    <Text style={{ color: "#20B08E" }}>{e.task}</Text>
                    <AntDesign
                      name="delete"
                      size={24}
                      color="black"
                      onPress={() => handleRemove(e)}
                    />
                  </View>
                );
              })}
          </View>
        </View>
      </Modal>

      <ScrollView>
        <View style={styles.choiceCheckList}>{listingCheckBox}</View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("TabNavigator")}
      >
        <Ionicons name="ios-arrow-back-circle" size={40} color="#F6F6F6" />

        <Text style={styles.textButton}>Home</Text>
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
  },
  modal: {
    backgroundColor: "#20B08E",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  modalChoice: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    padding: 10,
    borderRadius: 5,
  },
  textButton: { color: "#F6F6F6" },
});
