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

  // stock la destination saisie dans le store et redirige vers mapscreen
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
          <Ionicons name="chevron-back" size={50} color="#20B08E" />
          <Text style={styles.text}>Accueil</Text>
        </TouchableOpacity>

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
    marginBottom: 90,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "35%",
  },
  text: {
    color: "#20B08E",
    fontSize: 30,
  },
});
