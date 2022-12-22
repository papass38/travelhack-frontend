import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import Header from "../components/Header";
import { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { initializeTrip } from "../reducers/trips";
import { Ionicons } from "@expo/vector-icons";

export default function CountrySearchScreen({ navigation }) {
  const dispatch = useDispatch();
  const [destination, setDestination] = useState();
  const GOOGLE_MAPS_APIKEY = "AIzaSyCx5Hb0tUovjDU45HZUySMkSN7vz_RVGC4";

  // checks if the destination state variable has a value
  // dispatches the destination (name + coords) to the redux store using the dispatch function
  //navigates to the Map screen using the navigate function from the navigation prop.

  const handleValidation = () => {
    if (destination) {
      dispatch(initializeTrip(destination));
      navigation.navigate("Map");
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <KeyboardAvoidingView style={styles.searchPlace}>
        <TouchableOpacity
          style={styles.header}
          onPress={() => navigation.navigate("TabNavigator")}
        >
          <Ionicons name="ios-arrow-back-circle" size={40} color="#20B08E" />
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Select your destination</Text>

        {/* allows the user to search for a destination using the GooglePlacesAutocomplete component. 
        When the user selects a place from the search results, the setDestination function is called to update the destination state  */}

        <GooglePlacesAutocomplete
          placeholder="What is your destination ? "
          query={{ key: GOOGLE_MAPS_APIKEY }}
          fetchDetails={true}
          onPress={(data, details = null) =>
            setDestination({
              adress: data.description,
              lat: details.geometry.location.lat,
              lon: details.geometry.location.lng,
            })
          }
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
          styles={{
            textInputContainer: {
              marginBottom: 0,
              width: "100%",
              marginTop: 50,
              borderWidth: 2,
              borderRadius: 20,
              borderColor: "#20B08E",
            },
            textInput: {
              height: 38,
              color: "#5d5d5d",
              fontSize: 16,
              borderRadius: 20,
              width: "80%",
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
          }}
        />
        {/* When the user clicks the submit button, the handleValidation function is called to dispatch the selected destination to the redux store and navigate to the Map screen. */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleValidation()}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
    fontFamily: "Ubuntu-Regular",
  },
  searchPlace: {
    flex: 1,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Ubuntu-Regular",
  },
  title: {
    marginTop: 50,
    fontSize: 55,
    color: "#20B08E",
    fontFamily: "Ubuntu-Regular",
  },
  button: {
    backgroundColor: "#20B08E",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    borderRadius: 15,
    marginBottom: 90,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Ubuntu-Regular",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingTop: 10,
    fontFamily: "Ubuntu-Regular",
  },
  text: {
    color: "#20B08E",
    fontSize: 30,
    fontFamily: "Ubuntu-Regular",
  },
});
