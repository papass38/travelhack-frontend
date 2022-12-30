import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fecthIp from "../fetchIp.json";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProfilScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const [visitedCountries, setVisitedCountries] = useState([]);

  let markers = [];

  useEffect(() => {
    fetch(`http://${fecthIp.myIp}:3000/users/alltrips/${user.token}`)
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.trips.length; i++) {
          for (let step of data.trips[i].steps) {
            if (step.latitude) {
              setVisitedCountries((state) => [
                ...state,
                {
                  name: step.name,
                  coordinate: {
                    latitude: step.latitude,
                    longitude: step.longitude,
                  },
                },
              ]);
            }
          }
        }
      });
  }, []);

  markers = visitedCountries.map((e, i) => {
    return (
      <Marker
        key={i}
        coordinate={e.coordinate}
        title={e.name}
        // Set the opacity of the marker to 0.5 to make it appear greyed out
        pinColor="#20B08E"
      />
    );
  });

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.navButtons}>
        <View style={styles.icon}>
          <Feather
            name="home"
            size={50}
            color="#20B08E"
            activeOpacity={0.8}
            onPress={() => navigation.navigate("TabNavigator")}
          />
          <Text style={styles.textIcon}>Home</Text>
        </View>
        <View style={styles.icon}>
          <MaterialIcons
            name="favorite-border"
            size={50}
            color="#20B08E"
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Favorites")}
          />
          <Text style={styles.textIcon}>Favorites</Text>
        </View>

        <View style={styles.icon}>
          <Feather
            name="settings"
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
        >
          {markers}
        </MapView>
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
    margin: 10,
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
});
