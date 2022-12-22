import fetchIp from "../fetchIp.json";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Header,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import { FontAwesome } from "@expo/vector-icons";

import * as Location from "expo-location";
import Pusher from "pusher-js/react-native";

const PUSHER_KEY = "4dfa87353ff9a2ca6457";
const PUSHER_CLUSTER = "eu";

const pusher = new Pusher(PUSHER_KEY, {
  cluster: PUSHER_CLUSTER,
  encrypted: true,
});

export default function Chat() {
  const scrollViewMsgRef = useRef(null);

  const myUsername = useSelector((state) => state.user.value.username);

  const [locationName, setLocationName] = useState(
    "Allow location in settings to get access to this feature"
  );
  const [msgList, setMsgList] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  // ASKING FOR LOCATION PERMISSION
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 1000 }, (location) => {
          fetch(`http://${fetchIp.myIp}:3000/chat/location`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }),
          })
            .then((res) => res.json())
            .then((data) =>
              setLocationName(
                data.location.normalize("NFD").replace(/[\u0300-\u036f ]/g, ""),
                ""
              )
            );
        });
      }
    })();

    fetch(`http://${fetchIp.myIp}:3000/users/all`)
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
      });
  }, []);

  //GET ALL MESSAGE FROM A CHANNEL
  useEffect(() => {
    fetch(`http://${fetchIp.myIp}:3000/chat/channel/${locationName}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          const allMsg = [];
          for (let i of data.message) {
            allMsg.push({
              name: i.name,
              channel: i.channel,
              message: i.message,
              date: i.date,
            });
          }
          setMsgList(
            allMsg.sort((a, b) => {
              return new Date(b.date) + new Date(a.date);
            })
          );
        }
      });

    // WAITING A MESSAGE TO COME IN PUSHER AND START THE FUNCTION
    const subscription = pusher.subscribe(locationName);
    subscription.bind("pusher:subscription_succeeded", (data) => {
      subscription.bind("message", (data) => {
        setMsgList((prevState) => [...prevState, data]);
      });
    });
  }, [locationName]);

  // DISPLAY ALL MESSAGES
  const msgDisplay = msgList.map((data, i) => {
    let msgContainer = styles.msgContainer;
    let msgText = styles.msgText;
    let usernameStyle = { textAlign: "left" };

    if (data.name === myUsername) {
      msgContainer = styles.myMsgContainer;
      msgText = styles.myMsgText;
      usernameStyle = { textAlign: "right" };
    }

    let dateOne;
    if (i === 0) {
      dateOne = (
        <Text style={styles.dateStyle}>
          {new Date(data.date).toLocaleDateString()}
        </Text>
      );
    } else if (
      new Date(new Date(data.date).getDate()).getTime() >
      new Date(new Date(msgList[i - 1].date).getDate()).getTime()
    ) {
      dateOne = (
        <Text style={styles.dateStyle}>
          {new Date(data.date).toLocaleDateString()}
        </Text>
      );
    }

    let profilImg =
      "https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?b=1&s=170667a&w=0&k=20&c=HEO2nP4_uEAn0_JzVTU6_Y5hyn-qHxyCrWWTirBvScs=";

    if (allUsers.some((e) => e.username === data.name)) {
      const imgFound = allUsers.find((e) => e.username === data.name).photo;
      if (imgFound) {
        profilImg = imgFound;
      }
    }

    return (
      <View key={i}>
        {dateOne}
        <View style={msgContainer}>
          <Image source={{ uri: profilImg }} style={styles.msgImg} />
          <View style={styles.usernameMsgContainer}>
            <Text style={usernameStyle}>{data.name}</Text>
            <Text style={msgText}>{data.message}</Text>
          </View>
        </View>
      </View>
    );
  });

  // SEND A MESSAGE TO PUSHER
  const handleSend = () => {
    if (!newMsg) {
      return;
    }

    fetch(`http://${fetchIp.myIp}:3000/chat/newChat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: myUsername,
        message: newMsg,
        channel: locationName,
        date: new Date(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setNewMsg("");
        console.log(data);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.containerChat}
      >
        <View style={styles.locationContainer}>
          <Text style={styles.locationName}>{locationName}</Text>
        </View>

        <ScrollView
          style={styles.msgDisplay}
          ref={scrollViewMsgRef}
          onContentSizeChange={() =>
            scrollViewMsgRef.current.scrollToEnd({ animated: true })
          }
        >
          {msgDisplay}
        </ScrollView>
        <View style={styles.sendChatContainer}>
          <TextInput
            style={styles.sendChatInput}
            value={newMsg}
            placeholder="Send Chat !"
            onChangeText={(e) => setNewMsg(e)}
          />
          <Pressable style={styles.sendChatBtn} onPress={() => handleSend()}>
            <FontAwesome name="send" size={15} color="black" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#E6E6E6",
    justifyContent: "space-between",
  },
  locationContainer: {
    width: "100%",
    backgroundColor: "#20B08E",
    borderRadius: 5,
  },
  containerChat: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    height: 200,
  },
  locationName: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  //-----------------------------------Msg Content---------
  msgDisplay: {
    flex: 1,
    width: "90%",
    overflow: "hidden",
  },
  dateStyle: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  msgContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  myMsgContainer: {
    flexDirection: "row-reverse",
    marginBottom: 30,
  },
  usernameMsgContainer: {
    minWidth: 50,
    maxWidth: "80%",
  },
  msgImg: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    borderWidth: 0.5,
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
  },
  msgText: {
    borderRadius: 5,
    backgroundColor: "white",
    overflow: "hidden",
    padding: 15,
  },
  myMsgText: {
    borderRadius: 5,
    backgroundColor: "#20B08E",
    overflow: "hidden",
    padding: 15,
  },
  //-----------------------------------Msg Content---------
  sendChatContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",

    marginTop: 10,

    marginBottom: 50,
  },
  sendChatInput: {
    width: "80%",
    height: 35,
    paddingLeft: 10,

    backgroundColor: "white",
    borderRadius: 5,
  },
  sendChatBtn: {
    width: "10%",
    height: 35,

    backgroundColor: "#20B08E",
    borderRadius: 5,

    justifyContent: "center",
    alignItems: "center",
  },
});
