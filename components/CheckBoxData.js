import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";

export default function CheckBoxData({ props }) {
  const listingData = props.data.map((elmt, index) => {
    const [checked, setChecked] = useState(false);

    const handleClick = (e) => {
      if (e === elmt) {
        setChecked(!checked);
      }
    };
    return (
      <View key={index} style={styles.container}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            onPress={() => handleClick(elmt)}
            checked={checked}
            checkedColor="#21A37C"
            style={styles.checkbox}
          />
          <Text style={styles.label}>{elmt}</Text>
        </View>
      </View>
    );
  });
  return <View>{listingData}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    fontSize: 20,
    margin: 8,
    color: "#4B4B4B",
  },
});
