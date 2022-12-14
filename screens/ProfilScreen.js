import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import Header from "../components/Header";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView from "react-native-maps";

export default function ProfilScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
            <FontAwesome name="user-circle-o" size={38} color="#fff" />
            <Text style={styles.title}>Hello Name !</Text>
            </View> */}
      <Header navigation={navigation} />
      <View style={styles.navButtons}>
        <View style={styles.icon}>
          <Ionicons
            name="home-sharp"
            size={50}
            color="#20B08E"
            activeOpacity={0.8}
            onPress={() => navigation.navigate("TabNavigator")}
          />
          <Text style={styles.textIcon}>Home</Text>
        </View>
        <View style={styles.icon}>
          <AntDesign
            name="heart"
            size={50}
            color="#20B08E"
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Favorites")}
          />
          <Text style={styles.textIcon}>Favorites</Text>
        </View>
        <View style={styles.icon}>
          <Ionicons
            name="ios-settings-sharp"
            size={50}
            color="#20B08E"
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Settings")}
          />
          <Text style={styles.textIcon}>Settings</Text>
        </View>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name="format-list-checks"
            size={50}
            color="#20B08E"
            activeOpacity={0.8}
            onPress={() => navigation.navigate("To Do")}
          />
          <Text style={styles.textIcon}>To-do List</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <MapView
          style={styles.map}
          mapType="standard"
          initialRegion={{
            latitude: 43,
            longitude: 0.2,
            latitudeDelta: 180,
            longitudeDelta: 180,
          }}
          onLongPress={(e) => console.log(e.nativeEvent.position)}
        />
      </View>
      <View style={styles.countries}>
        <Text style={styles.textCountries}>Visited countries :｛counter｝</Text>
        <View style={styles.flags}>
        <FontAwesome5 name="flag" size={40} color="black" />
        <FontAwesome5 name="flag" size={40} color="black" />
        <FontAwesome5 name="flag" size={40} color="black" />
        <FontAwesome5 name="flag" size={40} color="black" />
        <FontAwesome5 name="flag" size={40} color="black" />
        <FontAwesome5 name="flag" size={40} color="black" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  map: {
    height: "100%",
    width: "100%",
  },
  navButtons: {
    flexDirection: "row",
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  icon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#f6f6f6",
  },
  textIcon: {
    paddingTop: 3,
    color: "#20B08E",
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: '100%',
    height: '80%',
  },
  countries: {
    marginBottom: 10,
    width: '100%',
  },
  textCountries: {
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: '#20B08E',
    overflow: "hidden",
    textAlign: "center",
  },
  flags: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 30,
  },
});
