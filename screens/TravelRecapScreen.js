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
import { useSelector } from "react-redux";
import DestinationInfos from "../components/DestinationInfos";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'

export default function TravelRecapScreen({ navigation }) {
  const tripList = useSelector((state) => state.trip.value.trip);
  const user = useSelector((state) => state.user.value.username);
  const [dateType, setDateType] = useState("")
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = (value) => {
    setDateType(value)
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if(dateType === "start"){
        setArrivalDate(date)
    }
    if(dateType === "end"){
        setDepartureDate(date)
    }
    console.warn(date);
    hideDatePicker();
  };

  const destinationsList = tripList.map((data, i) => {
    return (
      <View style = {styles.destinationsInfos}>
        <DestinationInfos props = {data} index = {i}/>
      </View>
    );
  });
  console.log(arrivalDate)
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View>
        <View style = {{flexDirection : "row", alignItems : "center"}}>
      <Button title="Start Date" onPress={() => showDatePicker("start")} />
       <Text>{moment(arrivalDate).format("DD MMM YY")}</Text>
        </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        isDarkModeEnabled = "false"
        onConfirm={handleConfirm}
        display ={"inline"}
        onCancel={hideDatePicker}
      />
    </View>
    <View>
        <View style = {{flexDirection : "row", alignItems : "center"}}>
      <Button title="End Date" onPress={() => showDatePicker("end")} />
      <Text>{moment(departureDate).format("DD MMM YYYY")}</Text>
        </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        isDarkModeEnabled = "false"
        onConfirm={handleConfirm}
        display ={"inline"}
        onCancel={hideDatePicker}
      />
    </View>
      <View>
        <View>

    </View>
      </View>
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
