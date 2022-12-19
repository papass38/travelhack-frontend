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
  import { useSelector } from "react-redux";
  import DestinationInfos from "../components/DestinationInfos";
  import DateTimePickerModal from "react-native-modal-datetime-picker";
  import moment from "moment";
  import { AntDesign } from "@expo/vector-icons";

  export default function TravelSummary({navigation}){
    return (
        <View>
            <Text>Hello</Text>
            <Button title="Click!"/>
        </View>
    )
  }