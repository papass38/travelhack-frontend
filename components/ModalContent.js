import { View, StyleSheet, Text, ScrollView, Linking } from "react-native";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import PlaceAround from "./PlaceAround";
import { useEffect, useState } from "react";

export default function ModalContent(props) {
  const [selected, setSelected] = useState("");
  const [around, setAround] = useState([]);
  const [website, setWebsite] = useState([]);

  //get the list of trips stored in the redux store.
  const tripList = useSelector((state) => state.trip.value.trip);

  
  const place = tripList.find((e) => e.name.includes(props.name));
  const select = [
    {
      value: "Restaurants",
    },
    {
      value: "Hotels",
    },
    {
      value: "Points of interests",
    },
  ];
  
  // when the modal appear & the user select a value in the dropdown : 
  // fetch the list of places around the selected place (2.5km radius) and set the arround state with the list sent by the api
  useEffect(() => {
    setAround("");
    if (selected === "Restaurants") {
      fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${place.latitude}%2C${place.longitude}&radius=2500&types=restaurant&key=AIzaSyCx5Hb0tUovjDU45HZUySMkSN7vz_RVGC4`
      )
        .then((res) => res.json())
        .then((data) => setAround(data.results));
    }
    if (selected === "Hotels") {
      fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${place.latitude}%2C${place.longitude}&radius=2500&types=hotel&key=AIzaSyCx5Hb0tUovjDU45HZUySMkSN7vz_RVGC4`
      )
        .then((res) => res.json())
        .then((data) => setAround(data.results.slice(1)));
    }
    if (selected === "Points of interests") {
      fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${place.latitude}%2C${place.longitude}&radius=2500&types=tourist_attraction&key=AIzaSyCx5Hb0tUovjDU45HZUySMkSN7vz_RVGC4`
      )
        .then((res) => res.json())
        .then((data) => setAround(data.results));
    } else {
      return;
    }
  }, [selected]);

  let aroundList;

  // if there is info in the arround State -> call the component PlaceAround (see /component/PlaceAround.js)
  if (around.length > 0) {
    aroundList = around.map((e, i) => {
      return <PlaceAround key={i} placeId={e.place_id}></PlaceAround>;
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.modalTitle}>About {props.name}</Text>
      <View>
        <Text> Estimated Budget per day</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            size={24}
            color="black"
          />
          <Text>
            {" "}
            {place.mealBudget > 0
              ? `${place.mealBudget} €`
              : "information unavailable"}{" "}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons name="bed-empty" size={24} color="black" />
          <Text>
            {place.roomBudget > 0
              ? `${place.roomBudget} €`
              : "information unavailable"}
          </Text>
        </View>
      </View>
      <View>
        <View style={{ marginVertical: 10 }}>
          <SelectList
            placeholder="See Around"
            setSelected={(e) => setSelected(e)}
            data={select}
            save="value"
          />
        </View>
        <View style={{ height: "78%" }}>
          <ScrollView>{aroundList}</ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //width : 300,
    flex: 1,
    overflow: "hidden",
  },
  modalTitle: {
    fontSize: 25,
  },
  radio: {
    textColor: "red",
  },
});
