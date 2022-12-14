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

  useEffect(() => {
    setAround("");
    if (selected === "Restaurants") {
      fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${place.coordinates.latitude}%2C${place.coordinates.longitude}&radius=10000&types=restaurant&key=AIzaSyCx5Hb0tUovjDU45HZUySMkSN7vz_RVGC4`
      )
        .then((res) => res.json())
        .then((data) => setAround(data.results));
    }
    if (selected === "Hotels") {
      fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${place.coordinates.latitude}%2C${place.coordinates.longitude}&radius=5000&types=hotel&key=AIzaSyCx5Hb0tUovjDU45HZUySMkSN7vz_RVGC4`
      )
        .then((res) => res.json())
        .then((data) => setAround(data.results.slice(1)));
    }
    if (selected === "Points of interests") {
      fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${place.coordinates.latitude}%2C${place.coordinates.longitude}&radius=5000&types=tourist_attraction&key=AIzaSyCx5Hb0tUovjDU45HZUySMkSN7vz_RVGC4`
      )
        .then((res) => res.json())
        .then((data) => setAround(data.results));
    } else {
      return;
    }
  }, [selected]);

  let aroundList;

  if (around.length > 0) {
    aroundList = around.map((e, i) => {
      //   fetch(
      //     `https://maps.googleapis.com/maps/api/place/details/json?place_id=${e.place_id}&fields=website%2Cname%2Crating&key=AIzaSyCx5Hb0tUovjDU45HZUySMkSN7vz_RVGC4`
      //   )
      //     .then((res) => res.json())
      //     .then((data) => {
      //         setWebsite([...website, {name : data.result.name, website : data.result.website, rating : data.result.rating }])
      //         return
      //     })
      return <PlaceAround placeId={e.place_id}></PlaceAround>;
    });
  }

  console.log(website);
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
            {place.budget.room > 0
              ? `${place.budget.meal.toFixed(2)} €`
              : "information unavailable"}{" "}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons name="bed-empty" size={24} color="black" />
          <Text>
            {place.budget.room > 0
              ? `${place.budget.room.toFixed(2)} €`
              : "information unavailable"}
          </Text>
        </View>
      </View>
      <View>
        <View style={{ marginTop: 10 }}>
          <SelectList
            placeholder="See Around"
            setSelected={(e) => setSelected(e)}
            data={select}
            save="value"
          />
        </View>
        <ScrollView>{aroundList}</ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //width : 300,
    flex: 1,
  },
  modalTitle: {
    fontSize: 25,
  },
  radio: {
    textColor: "red",
  },
});
