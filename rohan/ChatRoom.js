import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import AppTextInput from "../AppTextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Contex } from "./Contex";

const ChatRoom = ({ route }) => {
  const name = route.params;
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const {
    firstMessagesArray,
    setFirstMessagesArray,
    secondMessagesArray,
    setSecondMessagesArray,
    thirdMessagesArray,
    setThirdMessagesArray,
  } = useContext(Contex);

  const handleInput = (msg) => {
    setInputValue(msg);
  };

  useEffect(() => {
    if (name === "Rakesh") {
      setMessages(firstMessagesArray);
    } else if (name === "Shalini") {
      setMessages(secondMessagesArray);
    } else {
      setMessages(thirdMessagesArray);
    }
  }, [name]);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(message, index) => index}
        renderItem={({ item }) => (
          <View style={styles.mineMessage}>
            <Text style={styles.mine}>{item}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <AppTextInput placeholder="Message" onChange={handleInput} />
        <MaterialCommunityIcons
          name="send"
          size={25}
          color="#6e6969"
          onPress={() => {
            setMessages((prev) => [...prev, inputValue]);
            if (name === "Rakesh") {
                setFirstMessagesArray((prev) => [...prev, inputValue])
            } else if (name === "Shalini") {
                setSecondMessagesArray((prev) => [...prev, inputValue])
            } else {
                setThirdMessagesArray((prev) => [...prev, inputValue])
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  mineMessage: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 5,
  },
  awayMessage: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 5,
  },
  mine: {
    backgroundColor: "#0080ff",
    padding: 30,
    borderRadius: 10,
    color: "white",
    maxWidth: '80%'
  },
  away: {
    backgroundColor: "#4FAD2A",
    padding: 30,
    borderRadius: 10,
    color: "white",
  },
});

export default ChatRoom;
