import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import React from "react";
import user from "./reducers/user";
import todo from "./reducers/toDo";

import SwipeButton from "rn-swipe-button";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import trip from "./reducers/trips";

import HomeScreen from "./screens/HomeScreen";
import CountrySearchScreen from "./screens/CounstrySearchScreen";
import MapScreen from "./screens/MapScreen";
import ProfilScreen from "./screens/ProfilScreen";
import ChatScreen from "./screens/ChatScreen";
import ToDoScreen from "./screens/ToDoScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import SettingsScreen from "./screens/SettingsScreen";
import TravelRecapScreen from "./screens/TravelRecapScreen";
import WishlistScreen from "./screens/WishlistScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const store = configureStore({
  reducer: { trip, user, todo },
});

const TabNavigator = () => {
  return (
    <Provider store={store}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = "";

            if (route.name === "Accueil") {
              iconName = "home-sharp";
              return <Ionicons name={iconName} size={size} color={color} />;
            }
            // if (route.name === "Itinéraires") {
            //   iconName = "route";
            //   return <FontAwesome5 name={iconName} size={size} color={color} />
            // }
            if (route.name === "Chat") {
              iconName = "chatbubble-ellipses";
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          },

          tabBarActiveTintColor: "#20B08E",
          tabBarInactiveTintColor: "black",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Accueil" component={HomeScreen} />
        {/* <Tab.Screen name="Itinéraires" component={TripScreen} /> */}
        {/* <Tab.Screen name='Itinéraires' component={CountrySearchScreen}/> */}
        <Tab.Screen name="Chat" component={ChatScreen} />
      </Tab.Navigator>
    </Provider>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CountrySearch" component={CountrySearchScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="Recap" component={TravelRecapScreen} />
          <Stack.Screen name="Sign in" component={SignInScreen} />
          <Stack.Screen name="Sign up" component={SignUpScreen} />
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="Profil" component={ProfilScreen} />
          <Stack.Screen name="Favorites" component={FavoriteScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="To Do" component={ToDoScreen} />
          <Stack.Screen name="Wishlist" component={WishlistScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

// ok

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
});
