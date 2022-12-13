import { useState } from "react";
import { View, StyleSheet, Text, ScrollView, Pressable, TouchableOpacity } from "react-native";
import CheckBoxData from "../components/CheckBoxData";
import ChoiceCheckList from "../components/ChoiceCheckList";
import Header from "../components/Header";

// get file data toDoData.json
const dataCheckList = require("../toDoData.json");

// dataCheckList.map((elmt) => {
//   console.log(elmt.documents);
// });

export default function ToDoScreen() {
  const [dataId, setDataId] = useState(0);
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
      <Header />

      <View style={styles.containerCheckList}>
        <ScrollView horizontal={true}>{listingDataCheckList}</ScrollView>
      </View>
      <ScrollView>
        <View style={styles.choiceCheckList}>{listingCheckBox}</View>
      </ScrollView>
      <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Profil')}>
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
    width: "100%",
    padding: 15,
  },
  choiceCheckList: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "60%",
  },
});
