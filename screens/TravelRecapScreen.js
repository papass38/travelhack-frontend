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
import { useEffect, useState } from "react";
import { addDateandBudget } from "../reducers/trips";
import { useSelector, useDispatch } from "react-redux";
import DestinationInfos from "../components/DestinationInfos";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";

export default function TravelRecapScreen({ navigation }) {
  const tripList = useSelector((state) => state.trip.value.trip);
  const user = useSelector((state) => state.user.value.username);
  const [dateType, setDateType] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [datesFilled, setDateFilled] = useState(true);
  const dispatch = useDispatch();

  const storeTrips = useSelector((state) => state.trip.value);
  console.log(storeTrips);

  // show the date picker
  const showDatePicker = (value) => {
    setDateType(value);
    setDatePickerVisibility(true);
  };

  // hide the date picker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // change the date
  const handleConfirm = (date) => {
    if (dateType === "start") {
      setArrivalDate(date);
    }
    if (dateType === "end") {
      setDepartureDate(date);
    }
    hideDatePicker();
  };

  let budget = 0;

  // get the infos of the destination based on what is in the redux store and stock in triplist
  // calculate the total budget per day, per destination and send it as props. 
  // generate the component DestinationInfo for each destination 
  const destinationsList = tripList.map((data, i) => {
    budget += parseFloat(data.mealBudget) + parseFloat(data.roomBudget);
    return (
      <View style={styles.destinationsInfos} key={i}>
        <DestinationInfos props={data} index={i} />
      </View>
    );
  });

  // calcul of the number of travel day based on the selected dates
  useEffect(() => {
    if (departureDate) {
      setNumberOfDays((departureDate - arrivalDate) / (1000 * 60 * 60 * 24));
    }
  }, [departureDate]);

  // calculate the total budget
  const totalBudget = (budget / tripList.length) * numberOfDays;

  const errorMessage = (
    <Text style={{ color: "red", marginBottom: 10 }}>
      please select your dates of travel
    </Text>
  );

  // on validation -> if the start and end date were selected : adds to the store the start and end dates + total budget for the entire trip and redirect to the last travel screen
  const handleValidation = () => {
    if (arrivalDate && departureDate) {
      setDateFilled(true);
      dispatch(
        addDateandBudget({
          startDate: arrivalDate,
          endDate: departureDate,
          budget: totalBudget.toFixed(2),
        })
      );
      navigation.navigate("Summary");
    } else {
      setDateFilled(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <Button
          title={
            arrivalDate ? moment(arrivalDate).format("DD MMM YY") : "Start Date"
          }
          onPress={() => showDatePicker("start")}
        />
        <AntDesign name="arrowright" size={18} color="black" />
        <Button
          title={
            departureDate
              ? moment(departureDate).format("DD MMM YY")
              : "End Date"
          }
          onPress={() => showDatePicker("end")}
        />
      </View>
      <View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          minimumDate={arrivalDate}
          mode="date"
          isDarkModeEnabled="false"
          onConfirm={handleConfirm}
          display={"inline"}
          onCancel={hideDatePicker}
        />
      </View>
      <View>
        <View></View>
      </View>
      <ScrollView>{destinationsList}</ScrollView>
      {!datesFilled && errorMessage}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => navigation.navigate("Map")}
        >
          <AntDesign name="arrowleft" size={34} color="white" />
        </TouchableOpacity>
        <View style={styles.total}>
          {budget > 0 && (
            <Text style={styles.totalText}> {totalBudget.toFixed(2)} € </Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => handleValidation()}
        >
          <AntDesign name="arrowright" size={34} color="white" />
        </TouchableOpacity>
      </View>
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
  datePick: {},
  text: {
    fontSize: 18,
  },
  destinationsInfos: {
    //width : "100%"
  },
  destinationName: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderStyle: "solid",
    borderColor: "#Eeeeee",
    borderWidth: 1,
    marginVertical: 10,
    width: 330,
  },
  destinationDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#Eeeeee",
    marginBottom: 20,
    //width : "100%"
  },
  footer: {
    height: "10%",
    backgroundColor: "#20B08E",
    width: "100%",
    flexDirection: "row",
  },
  arrowButton: {
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
  },
  total: {
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
  },
  totalText: {
    color: "white",
    fontSize: 25,
  },
});
