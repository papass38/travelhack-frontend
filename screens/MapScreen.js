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
import dataCost from "../data.json";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// API attraction touristique : https://rapidapi.com/opentripmap/api/places1 (feed?)

// https://developers.google.com/maps/documentation/geocoding/requests-geocoding
//https://maps.googleapis.com/maps/api/geocode/json?address=Paris&key=${GOOGLE_MAPS_APIKEY} cherche les coordonnées d'un endroit à partir de son nom

// https://developers.google.com/maps/documentation/geocoding/requests-reverse-geocoding
// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=${GOOGLE_MAPS_APIKEY} cherche le nom en fonction de ses coordonées

// https://developers.google.com/maps/documentation/places/web-service/details

// Place : https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=hotel&keyword=hotel&key=AIzaSyCx5Hb0tUovjDU45HZUySMkSN7vz_RVGC4

export default function MapScreen() {
  const dispatch = useDispatch();
  // const [coordinates, setCoordinates] = useState([]);
  const GOOGLE_MAPS_APIKEY = "AIzaSyCx5Hb0tUovjDU45HZUySMkSN7vz_RVGC4";
  const [adress, setAdress] = useState("");
  const [distance, setDistance] = useState(0);
  const [newRegion, setRegion] = useState(initialMapView);
  // const [step, setStep] = useState([]);

  //region initial de la carte par defaut : France
  const initialMapView = {
    latitude: 48.866667,
    longitude: 2.333333,
    latitudeDelta: 20,
    longitudeDelta: 20,
  };

  const initialSearch = useSelector(
    (state) => state.trip.value.initialDestination
  );
  const tripList = useSelector((state) => state.trip.value.trip);

  let coordMarkers;
  let way;
  let steps;

  const getAdressFromString = (place) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${GOOGLE_MAPS_APIKEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.results[0].types);
        // Si c'est un Pays, delta + elevé
        if (data.results[0].types.find((e) => e === "country")) {
          setRegion({
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng,
            latitudeDelta: 10,
            longitudeDelta: 10,
          });
        } // Si route ou adresse précise : Gros Zoom
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
        } else {
          setRegion({
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng,
            latitudeDelta: 0.04,
            longitudeDelta: 0.08,
          });
        }
      });
  };

  useEffect(() => {
    setAdress(initialSearch.adress);
    getAdressFromString(initialSearch.adress);
  }, []);

  if (tripList.length > 0) {
    //generation des destination
    steps = tripList.map((e, i) => {
      return (
        <View style={styles.destinations}>
          <Text style={{ textAlign: "flex-start", width: "80%" }} key={i}>
            {i +1} - {e.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "20%",
              justifyContent: "space-around",
            }}
          >
            <AntDesign name="infocirlce" size={20} color="#20B08E" />
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
            latitude: item.coordinates.latitude,
            longitude: item.coordinates.longitude,
          }}
          pinColor="#327A8A"
        />
      );
    });
  }

  // generation des directions(par groupe de 2 marker)
  if (tripList.length > 1) {
    way = tripList.map((item, index) => {
      if (index > 0) {
        return (
          <MapViewDirections
            origin={{
              latitude: tripList[index - 1].coordinates.latitude,
              longitude: tripList[index - 1].coordinates.longitude,
            }}
            destination={{
              latitude: item.coordinates.latitude,
              longitude: item.coordinates.longitude,
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
    //setCoordinates([...coordinates, newCoords]);
    //console.log(coordinates)
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newCoords.latitude},${newCoords.longitude}&key=${GOOGLE_MAPS_APIKEY}&language=en`
    )
      .then((response) => response.json())
      .then((data) => {
        setAdress(
          data.results[0].formatted_address.split(", ").slice(-2).join(", ")
        );
        const splitAdress = adress.split(" ");
        //setStep([...step, data.results[0].formatted_address]);
        const getBudgetCountry = dataCost.find((e) =>
          e.City.includes(splitAdress[splitAdress.length - 1])
        );
        //console.log(getBudgetCountry)
        // récupère les infos relatives au voyage pour les stocker
        dispatch(
          addTrip({
            name: data.results[0].formatted_address
              .split(", ")
              .slice(-2)
              .join(", "),
            coordinates: newCoords,
            budget: {
              meal: getBudgetCountry["Meal, Inexpensive Restaurant"] * 2,
              room:
                getBudgetCountry["Apartment (3 bedrooms) in City Centre"] / 31,
            },
            distanceFromPrevious: distance,
          })
        );
      });
  };

  const handlePress = () => {
    const newAdress = adress.replace(" ", "%");
    getAdressFromString(newAdress);
  };

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={newRegion}
        region={newRegion}
        style={styles.map}
        onLongPress={(e) => handleLongPress(e.nativeEvent.coordinate)}
      >
        {coordMarkers}
        {way}
      </MapView>
      
        <Text style={{ textAlign: "center", fontStyle: "italic", padding : 5 }}>
          Click on the map to create your itinerary.
        </Text>

      <KeyboardAvoidingView style={styles.inputView}>
        <GooglePlacesAutocomplete
          placeholder="What is your destination ? "
          query={{ key: GOOGLE_MAPS_APIKEY }}
          fetchDetails={true}
          onChangeText={(value) => setAdress(value)}
          onPress={(data, details = null) =>
            setAdress(data.description)
          }
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
          styles={{
            textInputContainer: {
              marginBottom : 0,
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
        >
          {/* //{adress} */}
        </GooglePlacesAutocomplete>
        <TouchableOpacity onPress={() => handlePress()} style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <ScrollView style={styles.markedPlaces}>
        <View style={styles.listContainer}>{steps}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flexStart",
    backgroundColor: "white",
  },
  inputView: {
    //width: "100%",
    padding : 10,
    flexDirection : "row",
    justifyContent : "center",
    alignItems : "center",
    height: "15%",
  },
  map: {
    marginTop: "25%",
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
    height: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

//box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
