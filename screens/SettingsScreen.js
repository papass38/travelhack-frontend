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
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { login } from "../reducers/user";
import { useDispatch } from "react-redux";
import { addPhoto } from "../reducers/user";
import * as ImagePicker from "expo-image-picker";

// comm for commit
export default function FavoriteScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(user.photo);
  const dispatch = useDispatch();

  const [infoUser, setInfoUser] = useState({ username: null, email: null });
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [changeSucces, setChangeSucces] = useState(false);
  useEffect(() => {
    fetch(`http://${fetchIp.myIp}:3000/users/${user.username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setInfoUser({ username: data.user.username, email: data.user.email });
        }
      });
  }, []);

  useEffect(() => {
    async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      dispatch(addPhoto(result.assets[0].uri));
      console.log(user.photo);
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>No access to internal storage</Text>;
  }

  const handleClick = () => {
    fetch(`http://${fetchIp.myIp}:3000/users/${user.username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        replaceUsername: inputUsername,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: inputUsername }));
          setChangeSucces(true);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.navigate("Profil")}
      >
        <Ionicons name="chevron-back" size={50} color="#20B08E" />
        <Text style={styles.text}>Profil</Text>
      </TouchableOpacity>
      <View
        style={{
          alignItems: "center",
          height: "30%",
          justifyContent: "space-evenly",
        }}
      >
        <Text>Your photo</Text>
        <View
          style={{
            marginTop: 30,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, borderRadius: "50%" }}
            />
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            width: 200,
            justifyContent: "space-around",
            padding: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => pickImage()}
            style={{
              backgroundColor: "#21A37C",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#fff" }}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#21A37C",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#fff" }}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          height: "30%",
          justifyContent: "space-around",
        }}
      >
        {changeSucces && (
          <Text style={{ color: "#21A37C", fontWeight: "bold" }}>
            change successfully completed
          </Text>
        )}
        <View>
          <Text>Username</Text>
          <TextInput
            placeholder={infoUser.username}
            style={styles.input}
            value={inputUsername}
            onChangeText={(value) => setInputUsername(value)}
          />
        </View>
        <View>
          <Text>Email</Text>
          <TextInput
            placeholder={infoUser.email}
            style={styles.input}
            value={inputEmail}
            onChangeText={(value) => setInputEmail(value)}
          />
        </View>
        <Pressable
          style={{
            backgroundColor: "#21A37C",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <TouchableOpacity onPress={() => handleClick()}>
            <Text style={{ color: "#fff" }}>Change</Text>
          </TouchableOpacity>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#21A37C",
    width: 300,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "35%",
  },
  text: {
    color: "#20B08E",
    fontSize: 30,
  },
});
