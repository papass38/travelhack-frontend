import fetchIp from "../fetchIp.json";
import {
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
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
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

  const [inputUsername, setInputUsername] = useState(user.username);
  const [inputEmail, setInputEmail] = useState(user.email);
  const [changeSucces, setChangeSucces] = useState(false);

  useEffect(() => {
    async () => {
      const galleryStatus =
        //Cette ligne utilise l'API ImagePicker pour demander à
        //l'utilisateur l'autorisation d'accéder à la bibliothèque de médias
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
      //La variable galleryStatus est mise à jour avec
      //le résultat de la demande de permission.
      //Si la permission a été accordée,
      //la valeur de hasGalleryPermission sera mise à true,
      //sinon elle sera mise à false
    };
  }, []);

  const pickImage = async () => {
    //let result =
    //await ImagePicker.launchImageLibraryAsync
    //({ - Cette ligne utilise l'API ImagePicker pour lancer la sélection de l'image
    // à partir de la bibliothèque de l'utilisateur.
    //Le résultat de la sélection est stocké dans la variable result

    let result = await ImagePicker.launchImageLibraryAsync({
      //mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //- Cette ligne indique que seules les images seront affichées
      //dans la bibliothèque de médias.
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //allowsEditing: true, - Cette ligne indique que l'utilisateur peut éditer l'image sélectionnée.
      allowsEditing: true,
      //aspect: [4, 3], - Cette ligne indique que l'image sélectionnée doit avoir un ratio d'aspect de 4:3.
      aspect: [4, 3],
      quality: 0.1,
    });
    // console.log(result);
    if (!result.canceled) {
      console.log(result)
      //if (!result.canceled)
      //{ - Cette ligne vérifie si l'image sélectionnée n'a pas été annulée par l'utilisateur.
      //Si l'image n'a pas été annulée, le code à l'intérieur des accolades sera exécuté.
      setImage(result.assets[0].uri);
      //setImage(result.assets[0].uri); -
      //Cette ligne utilise la fonction setImage pour mettre à jour
      //la variable d'état image avec l'URI de l'image sélectionnée.
      dispatch(addPhoto(result.assets[0].uri));
      // console.log(result.assets);
      handleClick("photo")
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>No access to internal storage</Text>;
  }

  const handleClick = (itemToUpdate) => {

    if(itemToUpdate === "userInfo")
    if (inputUsername) {
      fetch(`http://${fetchIp.myIp}:3000/users/info/${user.username}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          replaceUsername: inputUsername,
          // photo: image,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            dispatch(
              login({
                username: data.user.username,
                email: data.user.email,
                photo: data.user.photo,
                token: data.user.token,
              })
            );
            setChangeSucces(true);
            // console.log(inputUsername);
          }
        });
    } 
    if(itemToUpdate === "photo") {
      console.log(image)
      
      const formData = new FormData()
      formData.append("userPhoto", {uri:image, name : "photo.jpg", type : "image/jpeg"})

      fetch(`http://${fetchIp.myIp}:3000/users/photo/${user.username}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            dispatch(
              login({
                username: data.user.username,
                email: data.user.email,
                photo: data.user.photo,
                token: data.user.token,
              })
            );
            setChangeSucces(true);
            // console.log(inputUsername);
          }
        });
    } 
      // console.log("error");
    }


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.navigate("Profil")}
      >
        <Ionicons name="ios-arrow-back-circle" size={40} color="#20B08E" />
        <Text style={styles.text}>Profil</Text>
      </TouchableOpacity>
      <View
        style={{
          alignItems: "center",
          height: "30%",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: 150,
            height: 150,
            borderRadius: "20%",
            borderWidth: 0,
            borderColor: "#20B08E",
          }}
        >
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 155,
                height: 155,
                borderRadius: "50%",
                borderWidth: 1,
                borderColor: "#20B08E",
              }}
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
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              {" "}
              Update Photo
            </Text>
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
            placeholder={user.username}
            style={styles.input}
            value={inputUsername}
            onChangeText={(value) => setInputUsername(value)}
          />
        </View>
        <View>
          <Text>Email</Text>
          <TextInput
            placeholder={user.email}
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
          <TouchableOpacity onPress={() => handleClick("userInfo")}>
            <Text style={{ color: "#fff" }}>Update Infos</Text>
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
    borderColor: "#20B08E",
    width: 300,
    padding: 10,
    borderRadius: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "35%",
    paddingLeft: 10,
  },
  text: {
    color: "#20B08E",
    fontSize: 30,
  },
});
