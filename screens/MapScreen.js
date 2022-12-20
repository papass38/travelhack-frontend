import { useSelector, useDispatch } from "react-redux";
import { addTrip, removeTrip } from "../reducers/trips";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import dataCost from "../costData.json";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Modal from "react-native-modal";
import Header from "../components/Header";
import ModalContent from "../components/ModalContent";

export default function MapScreen({ navigation }) {
  const dispatch = useDispatch();
  const GOOGLE_MAPS_APIKEY = "AIzaSyCx5Hb0tUovjDU45HZUySMkSN7vz_RVGC4";
  const [adress, setAdress] = useState("");
  const [distance, setDistance] = useState(0);
  const [newRegion, setRegion] = useState(initialMapView);
  const [isModalVisible, setModalVisible] = useState(false);

  //region initial de la carte par defaut si problème au chargement : France

  const initialMapView = {
    latitude: 48.866667,
    longitude: 2.333333,
    latitudeDelta: 20,
    longitudeDelta: 20,
  };

  // récupération de la destination rensegnée dans le précédent screen (countrysearch)
  const initialSearch = useSelector(
    (state) => state.trip.value.initialDestination
  );
  const tripList = useSelector((state) => state.trip.value.trip);
  console.log(tripList);
  let coordMarkers;
  let way;
  let steps;

  // fonction d'ajout des markers
  const addPins = (info, coords) => {
    const newAdress = info.results[0].formatted_address
      .split(", ")
      .slice(-2)
      .join(", ");
    setAdress(newAdress);
    const splitAdress = newAdress.split(" ");
    const getBudgetCountry = dataCost.find((e) =>
      e.City.includes(splitAdress[splitAdress.length - 1])
    );
    let mealBudget = "?";
    let roomBudget = "?";

    if (getBudgetCountry) {
      mealBudget = getBudgetCountry["Meal, Inexpensive Restaurant"] * 2;
      roomBudget =
        getBudgetCountry["Apartment (3 bedrooms) in City Centre"] / 31;
    }

    // récupère les infos relatives au voyage pour les stocker dans le store
    dispatch(
      addTrip({
        name: info.results[0].formatted_address
          .split(", ")
          .slice(-2)
          .join(", "),
        latitude : coords.latitude,
        longitude : coords.longitude,
        mealBudget : mealBudget, 
        roomBudget : roomBudget,
        distanceFromPrevious: distance,
      })
    );
  };

  // récupération des coordonées depuis l'adresse renseignées
  const getAdressFromString = (place) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${GOOGLE_MAPS_APIKEY}&language=en`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Si c'est un Pays, delta + elevé (zoom -) + pas de marker
        if (data.results[0].types.find((e) => e === "country")) {
          setRegion({
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng,
            latitudeDelta: 10,
            longitudeDelta: 10,
          });
        } // Si route ou adresse précise : Gros Zoom + ajout du marker via la fonction addpin()
        else if (
          data.results[0].types[0] === "street_number" ||
          data.results[0].types[0] === "route" ||
          data.results[0].types[0] === "street_address"
        ) {
          setRegion({
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng,
            latitudeDelta: 0.0004,
            longitudeDelta: 0.0008,
          });
          addPins(data, {
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng,
          });
        }
        //zoom par defaut + ajout du marker via la fonction addpin()
        else {
          setRegion({
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng,
            latitudeDelta: 0.04,
            longitudeDelta: 0.08,
          });
          addPins(data, {
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng,
          });
        }
      });
  };

  // au chargement => récupération de l'adresse stockée dans le store + génération du premier marker
  useEffect(() => {
    setAdress(initialSearch.adress);
    getAdressFromString(initialSearch.adress);
  }, []);

  //generation des Views destination
  if (tripList.length > 0) {
    steps = tripList.map((e, i) => {
      return (
        <View style={styles.destinations} key={i}>
          <Text style={{ textAlign: "flex-start", width: "80%" }} key={i}>
            {i + 1} - {e.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "20%",
              justifyContent: "space-around",
            }}
          >
            <AntDesign
              name="infocirlce"
              size={20}
              color="#20B08E"
              onPress={() => {
                setAdress(e.name);
                toggleModal();
              }}
            />
            <Entypo
              name="circle-with-cross"
              size={24}
              color="#20B08E"
              onPress={() => dispatch(removeTrip(e.name))}
            />
          </View>
        </View>
      );
    });

    //generation des markers
    coordMarkers = tripList.map((item, index) => {
      return (
        <Marker
          key={index}
          title={item.name}
          coordinate={{
            latitude: item.latitude,
            longitude: item.longitude,
          }}
          pinColor="#327A8A"
        />
      );
    });
  }

  // generation des chemins (par groupe de 2 marker)
  if (tripList.length > 1) {
    way = tripList.map((item, index) => {
      if (index > 0) {
        return (
          <MapViewDirections
            key={index}
            origin={{
              latitude: tripList[index - 1].latitude,
              longitude: tripList[index - 1].longitude,
            }}
            destination={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            // Which transportation mode to use when calculating directions. Allowed values are "DRIVING", "BICYCLING", "WALKING", and "TRANSIT"
            mode="DRIVING"
            strokeColor="#46B1C9"
            // onStart={(params) => {
            //   console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            // }}
            onReady={(result) => {
              setDistance(distance + result.distance);
              // console.log(`Duration: ${result.duration} min.`)
              // console.log(`Distance: ${result.distance} min.`)
            }}
          />
        );
      }
    });
  }

  // au clic sur la carte -> ajout du Pin + récupération de l'adresse depuis les coordonées (en EN pour communiquer avec la data (cost/country))
  const handleLongPress = (newCoords) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newCoords.latitude},${newCoords.longitude}&key=${GOOGLE_MAPS_APIKEY}&language=en`
    )
      .then((response) => response.json())
      .then((data) => {
        addPins(data, newCoords);
      });
  };

  // au clic sur le bouton -> changement de l'adress pour qu'elle s'adapte au parametre demandé par l'API google + appel a la fonction get adress from string
  const handlePress = () => {
    const newAdress = adress.replace(" ", "%");
    getAdressFromString(newAdress);
  };

  // fait apparaitre / disparaitre la modale
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <Modal visible={isModalVisible} style={styles.modal}>
        <View style={styles.modalContent}>
          <ModalContent name={adress} />
          <TouchableOpacity
            onPress={() => toggleModal()}
            style={styles.modalButton}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <MapView
        initialRegion={newRegion}
        region={newRegion}
        style={styles.map}
        onLongPress={(e) => handleLongPress(e.nativeEvent.coordinate)}
      >
        {coordMarkers}
        {way}
      </MapView>

      <KeyboardAvoidingView style={styles.inputView}>
        <GooglePlacesAutocomplete
          placeholder="Where are you going next ?"
          query={{ key: GOOGLE_MAPS_APIKEY }}
          fetchDetails={true}
          onChangeText={(value) => setAdress(value)}
          onPress={(data, details = null) => setAdress(data.description)}
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
          styles={{
            textInputContainer: {
              marginBottom: 0,
              backgroundColor: "white",
              width: "90%",
              textAlign: "center",
              height: "40%",
              borderBottomColor: "#20B08E",
              borderBottomWidth: 2,
            },
            textInput: {
              height: 30,
              color: "#5d5d5d",
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
          }}
        ></GooglePlacesAutocomplete>
        <TouchableOpacity onPress={() => handlePress()} style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <ScrollView style={styles.markedPlaces}>
        <View style={styles.listContainer}>{steps}</View>
      </ScrollView>
      <TouchableOpacity
        style={styles.footer}
        onPress={() => {
          tripList.length > 0 && navigation.navigate("Recap");
        }}
      >
        <AntDesign name="arrowright" size={34} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flexStart",
    backgroundColor: "white",
  },
  inputView: {
    //width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "15%",
  },
  map: {
    marginTop: "0%",
    width: "100%",
    height: "30%",
  },

  button: {
    backgroundColor: "#20B08E",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  markedPlaces: {
    flex: 1,
    width: "100%",
    backgroundColor: "#Eeeeee",
    paddingBottom: 20,
  },
  listContainer: {
    paddingTop: 5,
    alignItems: "center",
  },
  destinations: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 5,
    width: "90%",
    //height: 40,
    borderRadius: 5,
    height: 80,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
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
    justifyContent: "center",
    backgroundColor: "white",
    height: "80%",
    width: "80%",
    padding: 20,
    borderRadius: 20,
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
  footer: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#20B08E",
  },
  footerText: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
});

//box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
