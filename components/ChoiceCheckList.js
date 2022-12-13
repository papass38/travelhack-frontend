import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";

export default function ChoiceCheckList({ props, setDataId }) {
  const [color, setColor] = useState(false);

  const handleSubmit = (e) => {
    if (e !== props.name) {
      setColor(false);
    } else {
      setColor(true);
    }

    setTimeout(() => {
      setColor(false);
    }, 2000);
  };
  return (
    <View style={styles.card}>
      <View style={styles.containerCard}>
        <Pressable
          onPress={() => {
            setDataId(props.id);
            handleSubmit(props.name);
          }}
        >
          <FontAwesome5 name={props.icone} size={36} color="#fff" />
        </Pressable>
      </View>
      <Text
        style={{
          textAlign: "center",
          color: color ? "#21A37C" : "#7F7F7F",
          fontSize: 12,
          fontWeight: color ? "bold" : "",
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
