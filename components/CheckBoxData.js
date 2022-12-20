import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addTodo, filterTodo } from "../reducers/toDo";
import fetchIp from "../fetchIp.json";

export default function CheckBoxData({ props }) {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todo.value);
  const user = useSelector((state) => state.user.value.username);

  const listingData = props.data.map((elmt, index) => {
    const [checked, setChecked] = useState(false);
    const handleClick = (e) => {
      if (e === elmt && checked === false) {
        // dispatch(addTodo(elmt));
        // setChecked(true);
        fetch(`http://${fetchIp.myIp}:3000/users/newTodo/${user}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: user,
            task: elmt,
          }),
        })
          .then((res) => res.json())
          .then(() => {
            console.log(elmt);
            dispatch(addTodo(elmt));
            setChecked(true);
          });
        // console.log(todo);
      } else {
        setChecked(false);
        dispatch(filterTodo(elmt));
        // console.log(todo);
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
