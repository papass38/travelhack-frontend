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
import DateTimePicker from "@react-native-community/datetimepicker";
import Header from "../components/Header";
import { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { initializeTrip } from "../reducers/trips";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import DestinationInfos from "../components/DestinationInfos";

export default function TravelRecapScreen({ navigation }) {
  const tripList = useSelector((state) => state.trip.value.trip);
  const user = useSelector((state) => state.user.value.username);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const destinationsList = tripList.map((data, i) => {
    return (
      <View style = {styles.destinationsInfos}>
        <DestinationInfos props = {data} index = {i}/>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView>{destinationsList}</ScrollView>
      <TouchableOpacity onPress={() =>  navigation.navigate("Map")}><Text>Back</Text></TouchableOpacity>
        <TouchableOpacity><Text>Next</Text></TouchableOpacity>
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
  text: {
    fontSize: 18,
  },
  destinationsInfos : {
    //width : "100%"
  },
  destinationName: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding : 10, 
    borderStyle : "solid", 
    borderColor : "#Eeeeee", 
    borderWidth : 1, 
    marginVertical : 10,
    width : 330
  },
  destinationDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding : 10, 
    backgroundColor : "#Eeeeee", 
    marginBottom : 20,
    //width : "100%"

  },
  
});
