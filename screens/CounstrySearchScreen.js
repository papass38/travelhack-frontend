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
import { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { initializeTrip } from "../reducers/trips";

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";


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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.searchPlace}>


<TouchableHighlight onPress={() => navigation.navigate('TabNavigator')}>
     <View>
     <Ionicons name="arrow-back" size={50} color="#20b08e" />      
     </View>
 </TouchableHighlight>


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
              marginTop: 100,
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 60,
    color: "#20B08E",
  },
  button: {
    backgroundColor: "#20B08E",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 15,
  },
  buttonText: {
    color: "white",
    fontFamily: "Ubuntu",
    fontSize: 20,
    fontWeight: "bold",
  },
});
