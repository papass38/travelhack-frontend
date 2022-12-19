import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import { AntDesign } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View>
        <TouchableOpacity
          style={styles.newTripBtn}
          onPress={() => navigation.navigate("CountrySearch")}
        >
          <AntDesign name="pluscircle" size={50} color="#20B08E" />
          <Text style={styles.text}>New trip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal contentContainerStyle={styles.newTripsScroll}>
        <View>
          <Image
            source={{
              uri: "https://www.acs-ami.com/fr/blog/wp-content/uploads/2019/07/Organiser-son-road-trip.png",
            }}
            style={styles.imgNewTrip}
          />
          <View style={styles.textContainerNewTrip}>
            <View>
              <Text>Mexico</Text>
              <Text>En cours</Text>
            </View>
            <View>
              <AntDesign name="edit" size={24} color="black" />
            </View>
          </View>
        </View>
        <View>
          <Image
            source={{
              uri: "https://www.acs-ami.com/fr/blog/wp-content/uploads/2019/07/Organiser-son-road-trip.png",
            }}
            style={styles.imgNewTrip}
          />
          <View style={styles.textContainerNewTrip}>
            <View>
              <Text>Mexico</Text>
              <Text>En cours</Text>
            </View>
            <View>
              <AntDesign name="edit" size={24} color="black" />
            </View>
          </View>
        </View>
        <View>
          <Image
            source={{
              uri: "https://www.acs-ami.com/fr/blog/wp-content/uploads/2019/07/Organiser-son-road-trip.png",
            }}
            style={styles.imgNewTrip}
          />
          <View style={styles.textContainerNewTrip}>
            <View>
              <Text>Mexico</Text>
              <Text>En cours</Text>
            </View>
            <View>
              <AntDesign name="edit" size={24} color="black" />
            </View>
          </View>
        </View>
        <View>
          <Image
            source={{
              uri: "https://www.acs-ami.com/fr/blog/wp-content/uploads/2019/07/Organiser-son-road-trip.png",
            }}
            style={styles.imgNewTrip}
          />
          <View style={styles.textContainerNewTrip}>
            <View>
              <Text>Mexico</Text>
              <Text>En cours</Text>
            </View>
            <View>
              <AntDesign name="edit" size={24} color="black" />
            </View>
          </View>
        </View>
      </ScrollView>

      <ScrollView contentContainerStyle={styles.oldTripsScroll}>
        <View style={styles.oldTripsContainer}>
          <Image
            source={{
              uri: "https://www.acs-ami.com/fr/blog/wp-content/uploads/2019/07/Organiser-son-road-trip.png",
            }}
            style={styles.imgOldTrip}
          />
          <View style={styles.textContainerOldTrip}>
            <View>
              <Text>Mexico</Text>
              <Text>En cours</Text>
            </View>
            <View>
              <AntDesign name="edit" size={24} color="black" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  newTripBtn: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  text: {
    fontSize: 30,
    marginLeft: 10,
    fontWeight: "bold",
  },
  newTripsScroll: {
    flexDirection: "row",
  },
  imgNewTrip: {
    width: 200,
    height: 150,
  },
  textContainerNewTrip: {
    flexDirection: "row",
    justifyContent: "space-between",

    borderWidth: 1,
    borderTopWidth: 0,
  },
  oldTripsScroll: {},
  oldTripsContainer: {
    flexDirection: "row",
    borderWidth: 1,
    width: "100%",
  },
  imgOldTrip: {
    width: 100,
    height: 80,
  },
});
