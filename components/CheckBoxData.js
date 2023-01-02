import { View, Text, StyleSheet } from "react-native";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { CheckBox } from "react-native-elements";
import fetchIp from "../fetchIp.json";

export default function CheckBoxData({ props }) {
  const user = useSelector((state) => state.user.value);
  const todoId = useSelector((state) => state.todo.value.todoId);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetch(`http://${fetchIp.myIp}:3000/users/todo/${user.token}/${todoId}`)
      .then((res) => res.json())
      .then((data) => {
        setTodoList(data.todo);
      });
  }, []);

  const listingData = props.data.map((elmt, index) => {
    let checked = false;
    if (todoList.some((e) => e.task === elmt)) {
      checked = true;
    }

    const handleClick = () => {
      if (!checked) {
        fetch(
          `http://${fetchIp.myIp}:3000/users/newTodo/${user.token}/${todoId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newTodo: elmt }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            setTodoList(data.todoData);
          });
      } else {
        fetch(
          `http://${fetchIp.myIp}:3000/users/removeTodo/${user.token}/${todoId}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newTodo: elmt }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            setTodoList(data.todoData);
          });
      }
    };

    return (
      <View key={index} style={styles.container}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            onPress={() => handleClick()}
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
    // alignSelf: "flex-start",
  },
  label: {
    fontSize: 20,
    margin: 8,
    color: "#4B4B4B",
  },
});
