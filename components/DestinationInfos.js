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
  import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default function DestinationInfos({props}){
    const [budget, setBudget] = useState(props.budget.meal + props.budget.room)
    const [arrivalDate, setArrivalDate] = useState("")
    const [departureDate, setDepartureDate] = useState("")
    
    useEffect(() => {
        const totalBudget = props.budget.meal + props.budget.room
        setBudget(totalBudget.toFixed(2))
    }, [])
    return (
        <View>
        <View style={styles.destinationName}>
          <Text style={styles.text}>{props.name}</Text>
          <Entypo name="calendar" size={18} color="black" style={styles.text} />
        </View>
        <View style={styles.destinationDetails}>
          {/* <DestinationDetails/>   */}
          <Text style={styles.text}>Estimated Budget : {budget} € </Text>
          <AntDesign name="caretdown" size={18} color="black" />
        </View>
        </View>
    )
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