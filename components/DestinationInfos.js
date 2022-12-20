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
import { addDate } from "../reducers/trips";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


export default function DestinationInfos({ props, index }) {
  console.log(props)
  const [budget, setBudget] = useState(0);
  const tripList = useSelector((state) => state.trip.value.trip);
  const dispatch = useDispatch();

  // calcul du budget journalier par destination
  useEffect(() => {
    const destinationBudget = (props.mealBudget + props.roomBudget);
    setBudget(destinationBudget.toFixed(2));
  }, []);

  const today = new Date()


  return (
    <View>
      <View style={styles.destinationName}>
        <Text style={styles.text}>{index + 1} - {props.name}</Text>
      </View>
      <View style={styles.destinationDetails}>
        <Text style={styles.text}>{budget }€ / day </Text>
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
  },
});
