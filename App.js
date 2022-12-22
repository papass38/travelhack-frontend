import { StyleSheet } from "react-native";

import React from "react";
import user from "./reducers/user";
import todo from "./reducers/toDo";
import array from "./reducers/array";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
import FinalTravelScreen from "./screens/FinalTravelScreen";
import { Feather } from "@expo/vector-icons";
import { LogBox } from "react-native";

// ------------------ CUSTOM FONTS ---------------------

import AppLoading from "expo-app-loading";
import { useState } from "react";

import useFonts from "./hooks/useFonts";

// ------------------ CUSTOM FONTS ----------------------

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const store = configureStore({
  reducer: { trip, user, todo, array },
});

LogBox.ignoreAllLogs();

const TabNavigator = () => {
  return (
    <Provider store={store}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = "";

            if (route.name === "Home") {
              iconName = "home";
              return <Feather name={iconName} size={size} color={color} />;
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
        <Tab.Screen name="Home" component={HomeScreen} />
        {/* <Tab.Screen name="Itinéraires" component={TripScreen} /> */}
        {/* <Tab.Screen name='Itinéraires' component={CountrySearchScreen}/> */}
        <Tab.Screen name="Chat" component={ChatScreen} />
      </Tab.Navigator>
    </Provider>
  );
};

export default function App() {
  // --------- CUSTOM FONTS -----------

  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

  // ------- CUSTOM FONTS ---------

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CountrySearch" component={CountrySearchScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="Recap" component={TravelRecapScreen} />
          <Stack.Screen name="Summary" component={FinalTravelScreen} />
          <Stack.Screen
            name="Sign in"
            component={SignInScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="Sign up"
            component={SignUpScreen}
            options={{ gestureEnabled: false }}
          />
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
