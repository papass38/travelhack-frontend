import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";

export default function ChoiceCheckList({ props, setDataId }) {
  return (
    <View style={styles.card}>
      <View style={styles.containerCard}>
        <Pressable
          onPress={() => {
            setDataId(props.id);
          }}
        >
          <FontAwesome5 name={props.icone} size={36} color="#fff" />
        </Pressable>
      </View>
      <Text
        style={{
          textAlign: "center",
          color: "#7F7F7F",
          fontSize: 12,
          fontWeight: "bold",
        }}
      >
        {props.name.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "space-around",
    marginRight: 15,
  },
  containerCard: {
    alignItems: "center",
    justifyContent: "center",
    height: 90,
    width: 90,
    borderRadius: "50%",
    backgroundColor: "#21A37C",
  },
});
