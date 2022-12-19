import fetchIp from "../fetchIp.json";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

// comm for commit
export default function FavoriteScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.navigate("Profil")}
      >
        <Ionicons name="chevron-back" size={50} color="#20B08E" />
        <Text style={styles.textHeader}>Profil</Text>
      </TouchableOpacity>
      <View style={{flexDirection: "row", justifyContent: "center"}}>
      <TextInput
      placeholder="Enter your name list" 
      style={styles.input}/>
        <Ionicons name="add-circle" size={50} color="#20B08E" />
      </View>
      <View style={styles.wishlistContainer}>
      <View
        style={styles.wishlist}>
        <TouchableOpacity
        onPress={() => navigation.navigate("Wishlist")}
         style={styles.wishlistContent}>
        <Ionicons  name="bookmark" size={40} />
        <Text style={{fontSize: 30}}>List name</Text>
        </TouchableOpacity>
        <Ionicons name="trash" size={40} color="#DC143C"/>
      </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "35%",
  },
  textHeader: {
    fontSize: 30,
    color: '#20B08E',
  },
  wishlistContainer: {
    alignItems: "center",
    flex: 1,
  },
  wishlist: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    height: '10%',
    width: '90%',
    justifyContent: "center",
    borderRadius: 15,
    marginTop: 50,
    justifyContent: "space-between",
  },
  wishlistContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    flexDirection: "row",
    fontSize: 20,
    width: '80%',
    padding: 5,
    borderBottomWidth: 2,
  }
});
