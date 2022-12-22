import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function DestinationInfos({ props, index }) {
  console.log(props);
  const [budget, setBudget] = useState(0);

  // when the component is mounted -, this function calculate the average daily price based on the meal budget and room budget per day
  useEffect(() => {
    const destinationBudget =
      parseFloat(props.mealBudget) + parseFloat(props.roomBudget);
    console.log(typeof destinationBudget);
    setBudget(destinationBudget);
  }, []);

  const today = new Date();

  return (
    <View>
      <View style={styles.destinationName}>
        <Text style={styles.text}>
          {index + 1} - {props.name}
        </Text>
      </View>
      <View style={styles.destinationDetails}>
        <Text style={styles.text}>{budget.toFixed(2)}€ / day </Text>
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
