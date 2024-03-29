import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
} from "react-native";

import SwipeButton from "rn-swipe-button";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/welcome-background.png")}
        style={styles.background}
      />

      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome to Travel Hack !</Text>
        <SwipeButton
          disabled={false}
          swipeSuccessThreshold={90}
          height={60}
          width={350}
          title="Swipe to get started !"
          onSwipeSuccess={() => {
            navigation.navigate("Sign in");
          }}
          railFillBackgroundColor="#20cb8e"
          thumbIconBackgroundColor="#20B08E"
          thumbIconBorderColor="white"
          railBackgroundColor="white"
          railBorderColor="transparent"
          railFillBorderColor="transparent"
          titleColor="#20B08E"
          fontFamily="Ubuntu-Bold"
          titleStyles={{ fontWeight: "bold" }}
        ></SwipeButton>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    resizeMode: "repeat",
  },
  button: {
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 80,
    paddingRight: 80,
    backgroundColor: "white",
    borderRadius: 20,
  },
  textButton: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  title: {
    fontSize: "60",
    flex: 1,
    fontWeight: "bold",
    letterSpacing: -1,
    fontFamily: "Ubuntu-Bold",
  },
});
