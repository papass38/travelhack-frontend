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
} from "react-native";
import Header from "../components/Header"
import { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { initializeTrip } from "../reducers/trips";
import { useSelector } from "react-redux";

export default function CountrySearchScreen({ navigation }) {
  const dispatch = useDispatch();
  const [destination, setDestination] = useState();
  const GOOGLE_MAPS_APIKEY = "AIzaSyCx5Hb0tUovjDU45HZUySMkSN7vz_RVGC4";

  const handleValidation = () => {
    if (destination) {
      dispatch(initializeTrip(destination));
      navigation.navigate("Map");
    }
  };

  return (
    <View style={styles.container}>
      <Header></Header>
      <KeyboardAvoidingView style={styles.searchPlace}>
        <Text style={styles.title}>Select your destination</Text>
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
              borderWidth: 1,
            },
            textInput: {
              height: 38,
              color: "#5d5d5d",
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
          }}
        />
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
  },
  searchPlace: {
    flex: 1,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: 50,
    fontFamily: "Ubuntu",
    fontSize: 55,
    color: "#20B08E",
  },
  button: {
    backgroundColor: "#20B08E",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 15,
    marginBottom : 90
  },
  buttonText: {
    color: "white",
    fontFamily: "Ubuntu",
    fontSize: 20,
    fontWeight: "bold",
  },
});
