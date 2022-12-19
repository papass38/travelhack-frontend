import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Share,
} from "react-native";
import Header from "../components/Header";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";
import { useSelector } from "react-redux";
import CountryFlag from "react-native-country-flag";

const dataVaccins = require("../vaccins.json");

export default function ProfilScreen({ navigation }) {
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const trip = useSelector((state) => state.trip.value);
  const visitedCountries = [
    {
      latitude: 38,
      longitude: 97,
    },
    {
      latitude: 48.85,
      longitude: 2.35,
    },
  ];

  const listingTrip = trip.trip.map((elmt, index) => {
    return dataVaccins.map((count, i) => {
      // console.log(`elmt : ${elmt.name.toUpperCase().split(" ")[1]}`);
      // console.log(count.country);
      if (count.country === elmt.name.toUpperCase().split(" ")[1]) {
        return (
          <View style={{ alignItems: "center" }} key={index}>
            <CountryFlag isoCode={count.code} size={40} key={i} />
          </View>
        );
      }
    });
  });

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
            <FontAwesome name="user-circle-o" size={38} color="#fff" />
            <Text style={styles.title}>Hello Name !</Text>
            </View> */}
      <Header navigation={navigation} />
      <View style={styles.navButtons}>
        <View style={styles.icon}>
          <Ionicons
            name="home-sharp"
            size={50}
            color="#20B08E"
            activeOpacity={0.8}
            onPress={() => navigation.navigate("TabNavigator")}
          />
          <Text style={styles.textIcon}>Home</Text>
        </View>
        <View style={styles.icon}>
          <AntDesign
            name="heart"
            size={50}
            color="#20B08E"
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Favorites")}
          />
          <Text style={styles.textIcon}>Favorites</Text>
        </View>
        <View style={styles.icon}>
          <Ionicons
            name="ios-settings-sharp"
            size={50}
            color="#20B08E"
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Settings")}
          />
          <Text style={styles.textIcon}>Settings</Text>
        </View>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name="format-list-checks"
            size={50}
            color="#20B08E"
            activeOpacity={0.8}
            onPress={() => navigation.navigate("To Do")}
          />
          <Text style={styles.textIcon}>To-do List</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <MapView
          style={styles.map}
          mapType="standard"
          initialRegion={{
            latitude: 43,
            longitude: 0.2,
            latitudeDelta: 180,
            longitudeDelta: 180,
          }}
          onLongPress={(e) => {
            setLong(e.nativeEvent.coordinate.longitude);
            setLat(e.nativeEvent.coordinate.latitude);
          }}
        >
          {visitedCountries.map((country) => (
            <Marker
              coordinate={country}
              title={country.name}
              description={country.description}
              // Set the opacity of the marker to 0.5 to make it appear greyed out
              pinColor="#20B08E"
            />
          ))}
        </MapView>
      </View>
      <View style={styles.countries}>
        <View style={styles.flags}>{listingTrip}</View>
        <Text>test</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  map: {
    height: "100%",
    width: "100%",
  },
  navButtons: {
    flexDirection: "row",
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  icon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#f6f6f6",
  },
  textIcon: {
    paddingTop: 3,
    color: "#20B08E",
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "80%",
  },
  countries: {
    width: "100%",
    backgroundColor: "#21A37C",
  },
  textCountries: {
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: "#20B08E",
    overflow: "hidden",
    textAlign: "center",
  },
  flags: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 30,
  },
});
