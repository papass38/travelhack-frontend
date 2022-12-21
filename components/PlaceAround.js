import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Linking } from "react-native";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { useEffect, useState } from "react";
import { AntDesign } from '@expo/vector-icons'; 

export default function PlaceAround(props){
    const[placeInfo, setPlaceInfo] = useState({})

    // fetch the google place api to get the detailed informations of one spécific place. 
    // here it was necessary to get the places websites, but we also fetch the names and ratings
    useEffect(() => {
        fetch(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${props.placeId}&fields=website%2Cname%2Crating&key=AIzaSyCx5Hb0tUovjDU45HZUySMkSN7vz_RVGC4`
              ).then(res => res.json()).then(data => {
                console.log(data)
                setPlaceInfo(data.result)
              })
    }, [])

    // this function handle the redirection to a place website
    const handlePress = () => Linking.canOpenURL(placeInfo.website).then(() => {
        Linking.openURL(placeInfo.website);
    });
   
    return(
        <View style={styles.infoCards}>
            <Text>{placeInfo.name}</Text>
            <TouchableOpacity onPress={() => handlePress()}>
            <Text style={{textDecorationLine : "underline"}}>visit website</Text></TouchableOpacity>
            <View style={{flexDirection : "row"}}>
            <AntDesign name="star" size={14} color="#21A37C" />
            <Text>{placeInfo.rating}/5</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    infoCards: {
        marginVertical : 5, 
        alignItems : "left",
        backgroundColor : "#Eeeeee",
        padding : 10,
        borderRadius : 10, 
        justifyContent : "space-between"
    }
  });