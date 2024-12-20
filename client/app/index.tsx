import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
type Todo = {
  name: string;
  complete: boolean;
};
const serverHost = "http://10.44.22.41:3000";
const Index = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState("");
  const addNewTodo = async () => {
    const newTodo = { name: newTodoName, complete: false };
    if (todoList) setTodoList((prev: Todo[]) => [...prev, newTodo]);
    const response = await axios.post(serverHost, newTodo);
    if (response.status === 201) {
      console.log("todo added");
    }
  };

  useEffect(() => {
    const getTodos = async () => {
      const response = await axios.get(serverHost);
      const newTodos = response.data;
      setTodoList(newTodos);
    };
    getTodos();
  }, []);
  return (
    <View style={styles.page}>
      <View style={styles.top}>
        <Text style={styles.header}>My Todo List</Text>
        <Text style={styles.label}>New Todo Name:</Text>
        <TextInput
          style={styles.input}
          value={newTodoName}
          onChangeText={(t) => setNewTodoName(t)}
        />
        <Pressable style={styles.addButton} onPress={() => addNewTodo()}>
          <Text style={styles.buttonText}>Add Todo</Text>
        </Pressable>
      </View>
      <View style={styles.bottom}>
        {todoList.map((todo) => {
          return (
            <View key={todo.name} style={styles.todoContainer}>
              <Text style={styles.todo}>{todo.name}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
    marginBottom: 20,
  },
  top: {
    flex: 1,
    padding: 20,
  },
  bottom: {
    flex: 2,
    borderTopColor: "white",
    borderTopWidth: 2,
    padding: 20,
  },
  todo: {
    color: "white",
  },
  todoContainer: {
    display: "flex",
    borderColor: "grey",
    borderWidth: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
  },
  input: {
    borderColor: "grey",
    color: "white",
    borderWidth: 1,
    borderRadius: 5,
    height: 35,
    width: "50%",
    marginTop: 20,
  },
  label: {
    color: "white",
  },
  addButton: {
    borderColor: "green",
    borderWidth: 1,
    width: 100,
    borderRadius: 10,
    padding: 5,
  },
  buttonText: {
    color: "white",
  },
});
