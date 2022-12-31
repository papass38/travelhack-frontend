import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import Header from "../components/Header";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import fetchIp from "../fetchIp.json";
import Modal from "react-native-modal";

export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const [newTripsList, setNewTripsList] = useState([]);
  const [oldTripsList, setOldTripsList] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  const TravelImage = [
    "https://images.unsplash.com/photo-1583653319049-4db347571740?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8MTQwMTcxMnx8ZW58MHx8fHw%3D&w=1000&q=80",
    "https://img.static-rmg.be/a/view/q75/w4000/h2667/4779070/2135445-jpg.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY3TCE94CXtQ2wAs1kTVLg6fRym18e9-6fiw&usqp=CAU",
    "https://i.pinimg.com/564x/82/f0/97/82f0979c0934212e303af2fe6707e1dd.jpg",
    "https://i.pinimg.com/564x/74/f3/ad/74f3ada6009269bb8f359f5c0a0a6601.jpg",
    "https://i.pinimg.com/564x/ed/dd/27/eddd279b5b74950e3590cc1a92bb4ba7.jpg",
    "https://i.pinimg.com/474x/31/31/a5/3131a51d5077aaae22d46d69eace1bfc.jpg",
    "https://i.pinimg.com/564x/03/a8/9e/03a89ecf6b1aa248e56c2fda651b7d92.jpg",
    "https://i.pinimg.com/564x/b6/9d/e6/b69de628eb90bf5502d6869eaac1f178.jpg",
    "https://i.pinimg.com/736x/0b/8c/0a/0b8c0a5340d62457ff521598a9fdd9a7.jpg",
  ];

  const isFocused = useIsFocused();

  const fetchTrips = () => {
    fetch(`http://${fetchIp.myIp}:3000/users/alltrips/${user.token}`)
      .then((res) => res.json())
      .then((data) => {
        const newTripTab = [];
        const oldTripTab = [];

        for (let item of data.trips) {
          if (new Date(item.endDate).getTime() > new Date().getTime()) {
            newTripTab.push(item);
          } else {
            oldTripTab.push(item);
          }
        }
        setNewTripsList(newTripTab);
        setOldTripsList(oldTripTab);
      });
  };

  useEffect(() => {
    fetchTrips();
  }, [isFocused]);

  let oldTripsExist = "No old trip yet";
  if (oldTripsList.length > 0) {
    oldTripsExist = "Old Trips";
  }

  let newTripsExist = "No trip planned yet";
  if (newTripsList.length > 0) {
    newTripsExist = "";
  }

  const deleteTrip = (myId) => {
    fetch(`http://${fetchIp.myIp}:3000/users/removeTrip/${user.token}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: myId,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchTrips();
        setModalVisible(false);
      });
  };

  const newTripsDisplay = newTripsList
    .sort((a, b) => {
      return new Date(a.startDate) - new Date(b.startDate);
    })
    .map((data, i) => {
      return (
        <TouchableOpacity
          key={i}
          travelId={data._id}
          style={styles.newTrip}
          onPress={() => {
            setModalVisible(!isModalVisible);
            setModalData({
              travelId: data["_id"],
              destination: data.destination,
              startDate: data.startDate,
              endDate: data.endDate,
              steps: data.steps,
              totalBudget: data.totalBudget,
            });
          }}
        >
          <Image
            style={styles.imgTrip}
            source={{
              uri: TravelImage[Math.floor(Math.random() * TravelImage.length)],
            }}
          />

          <View style={styles.textNewTrip}>
            <View>
              <Text style={{ fontWeight: "bold" }}>{data.destination}</Text>
              <Text>
                {new Date(data.startDate).toLocaleDateString()} -{" "}
                {new Date(data.endDate).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });

  const oldTripsDisplay = oldTripsList
    .sort((a, b) => {
      return new Date(b.startDate) - new Date(a.startDate);
    })
    .map((data, i) => {
      console.log(data.startDate);
      return (
        <TouchableOpacity
          key={i}
          style={styles.oldTrip}
          onPress={() => {
            console.log(data["_id"]);
            setModalVisible(!isModalVisible);
            setModalData({
              travelId: data["_id"],
              destination: data.destination,
              startDate: data.startDate,
              endDate: data.endDate,
              steps: data.steps,
              totalBudget: data.totalBudget,
            });
          }}
        >
          <Image
            style={styles.imgOldTrip}
            source={{
              uri: TravelImage[Math.floor(Math.random() * TravelImage.length)],
            }}
          />

          <View style={styles.textOldTrip}>
            <View>
              <Text style={{ fontWeight: "bold" }}>{data.destination}</Text>
              <Text>
                {new Date(data.startDate).toLocaleDateString()} -{" "}
                {new Date(data.endDate).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });

  let stepsModal;
  if (modalData.steps) {
    stepsModal = modalData.steps.map((data, i) => {
      return (
        <Text key={i} style={{ marginVertical: 2 }}>
          &#8594; {data.name}
        </Text>
      );
    });
  }

  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible} style={styles.modal}>
        <View style={styles.modalContent}>
          <ImageBackground
            source={require("../assets/cloudModalBg.jpeg")}
            style={styles.modalBgImg}
            imageStyle={{ opacity: 0.7 }}
          >
            <View style={styles.modalText}>
              <Text style={{ textAlign: "center" }}>
                {new Date(modalData.startDate).toLocaleDateString()} -{" "}
                {new Date(modalData.endDate).toLocaleDateString()}
              </Text>

              <Text
                style={{ fontWeight: "bold", fontSize: 25, marginVertical: 10 }}
              >
                {modalData.destination}
              </Text>
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                ≈ {modalData.totalBudget}€
              </Text>
              <View style={styles.stepsModal}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  Steps :
                </Text>
                {stepsModal}
              </View>
            </View>
            <View style={styles.btnModal}>
              <TouchableOpacity
                style={styles.modalButtonDelete}
                onPress={() =>
                  deleteTrip(modalData.travelId, modalData.endDate)
                }
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(!isModalVisible)}
                style={styles.modalButton}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </Modal>

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

      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        {newTripsExist}
      </Text>
      <View style={styles.newScrollContainer}>
        <ScrollView horizontal contentContainerStyle={styles.newTripsScroll}>
          {newTripsDisplay}
        </ScrollView>
      </View>
      <Text
        style={{
          fontWeight: "bold",
          marginTop: 20,
          marginBottom: 20,
          fontSize: 20,
        }}
      >
        {oldTripsExist}
      </Text>
      <View style={styles.OldScrollContainer}>
        <ScrollView contentContainerStyle={styles.oldTripsScroll}>
          {oldTripsDisplay}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
  },
  newTripBtn: {
    flexDirection: "row",
    alignItems: "center",
    margin: 30,
  },
  text: {
    fontSize: 30,
    marginLeft: 10,
    fontWeight: "bold",
    fontFamily: "Ubuntu-Regular",
  },
  newScrollContainer: {
    height: "30%",
    minWidth: "100%",
  },
  newTripsScroll: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  newTrip: {
    height: "100%",
    width: 200,
    justifyContent: "space-between",
    borderWidth: 0.3,
    borderColor: "#20B08E",
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#20B08E",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 60,
  },
  imgTrip: {
    width: "100%",
    height: "70%",
  },
  textNewTrip: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  OldScrollContainer: {
    height: "30%",
    width: "100%",
  },
  oldTripsScroll: {
    alignItems: "center",
  },
  oldTrip: {
    height: 100,
    width: "90%",
    borderWidth: 0.3,
    borderColor: "#20B08E",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#20B08E",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 60,
  },
  imgOldTrip: {
    width: "40%",
    height: "100%",
  },
  textOldTrip: {
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  modal: {
    flex: 1,
    height: "100%",
    width: "100%",
    margin: 0,
    backgroundColor: "rgba(27, 25, 26, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#20B08E",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 60,
  },
  modalContent: {
    backgroundColor: "#E6E6E6",
    height: "60%",
    width: "80%",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#20B08E",
    overflow: "hidden",
  },
  modalBgImg: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalText: {
    marginTop: "20%",
    borderRadius: 20,
  },
  modalButton: {
    backgroundColor: "#20B08E",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "50%",
    borderRadius: 5,
  },
  modalButtonDelete: {
    backgroundColor: "#BF0000",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "50%",
    borderRadius: 5,
  },
  btnModal: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    height: "20%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  stepsModal: {
    marginTop: 40,
    marginBottom: 10,
  },
});
