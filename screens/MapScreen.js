import { useSelector, useDispatch } from "react-redux";
import { addTrip, removeTrip, initializeTrip } from "../reducers/trips";
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

  //in case of issue, the initial destination is set to the coords of France

  const initialMapView = {
    latitude: 48.866667,
    longitude: 2.333333,
    latitudeDelta: 20,
    longitudeDelta: 20,
  };

  // Get the initial destination selected by the user and the list of trips stored in the redux store.

  const initialSearch = useSelector(
    (state) => state.trip.value.initialDestination
  );
  const tripList = useSelector((state) => state.trip.value.trip);

  let coordMarkers;
  let way;
  let steps;

  // the function addPins is called when the user selects a destination from the search results.

  const addPins = (info, coords) => {
    const newAdress = info.results[0].formatted_address
      .split(", ")
      .slice(-2)
      .join(", ");

    // updates the adress state variable with the address of the destination.
    setAdress(newAdress);
    const splitAdress = newAdress.split(" ");

    // this function will check our cost database to see if there is informations for the country of the adress
    const getBudgetCountry = dataCost.find((e) =>
      e.City.includes(splitAdress[splitAdress.length - 1])
    );
    let mealBudget = 0;
    let roomBudget = 0;

    if (getBudgetCountry) {
      // here we use the cost database (costData.json) to set the meal budget.
      //This is not accurate as the places are not all available
      // it does not handle the cost per city but per country
      // Unfortunately we do not have the budget (200€ per month) to use the api from wich that data was exctracted (https://www.numbeo.com/)
      mealBudget = getBudgetCountry["Meal, Inexpensive Restaurant"] * 2;
      roomBudget =
        getBudgetCountry["Apartment (3 bedrooms) in City Centre"] / 31;
    }

    // adds a trip and details to the redux store using the addTrip action from the redux store.
    dispatch(
      addTrip({
        name: info.results[0].formatted_address
          .split(", ")
          .slice(-2)
          .join(", "),
        latitude: coords.latitude,
        longitude: coords.longitude,
        mealBudget: typeof mealBudget !== NaN ? mealBudget.toFixed(2) : "?",
        roomBudget: typeof roomBudget !== NaN ? roomBudget.toFixed(2) : "?",
        distanceFromPrevious: distance,
      })
    );
  };

  //called when the user enters a destination in the search field.
  //sends a request to the Google Maps API to get the coordinates of the destination
  const getAdressFromString = (place) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${GOOGLE_MAPS_APIKEY}&language=en`
    )
      .then((response) => response.json())
      .then((data) => {
        // if Country : zoom -- / no pin added
        if (data.results[0].types.find((e) => e === "country")) {
          //updates the region state variable
          setRegion({
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng,
            latitudeDelta: 10,
            longitudeDelta: 10,
          });
        }
        // road, precise adress : zoom ++ / pin added
        else if (
          data.results[0].types[0] === "street_number" ||
          data.results[0].types[0] === "route" ||
          data.results[0].types[0] === "street_address"
        ) {
          //updates the region state variable
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

        // else : default zoom & pin added
        else {
          //updates the region state variable
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

  // when the component is mounted ir use the adress stocked in the store to set the Adress state.
  // It calls the get adressFromString function to create the first marker (if the adress was not a country)
  useEffect(() => {
    setAdress(initialSearch.adress);
    getAdressFromString(initialSearch.adress);
  }, []);

  // if there is trips in the this function générates the destination cards and the markers
  if (tripList.length > 0) {
    steps = tripList.map((e, i) => {
      return (
        // generation of the cards
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

    // generation of the markers
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

  //if there  is more than 2 destination in the store (steps) this functions generate the roads between the coordinates
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
            onReady={(result) => {
              // To improve : I try to get the distance between the points but it does not properly when a marker is deleted. SO the feature was remove (for now)
              setDistance(distance + result.distance);
            }}
          />
        );
      }
    });
  }

  // this function use the google api to get the adress from the coords and call the addPins Function (l52 - l87)
  const handleLongPress = (newCoords) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newCoords.latitude},${newCoords.longitude}&key=${GOOGLE_MAPS_APIKEY}&language=en`
    )
      .then((response) => response.json())
      .then((data) => {
        addPins(data, newCoords);
      });
  };

  // this function change the adress and replace the spaces with % so the string send to the gateAdressfrom string matches the param needed for the google API fetch
  const handlePress = () => {
    const newAdress = adress.replace(" ", "%");
    getAdressFromString(newAdress);
  };

  // show or hide the modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      {/* component modal from react-native*/}
      <Modal visible={isModalVisible} style={styles.modal}>
        <View style={styles.modalContent}>
          {/* see component ModalContent in the component file */}
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
          dispatch(initializeTrip({ adress: tripList[0].name }));
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
    width: "98%",
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
