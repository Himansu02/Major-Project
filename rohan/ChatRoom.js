import React from "react";
import { View, StyleSheet, Text } from "react-native";
import AppTextInput from "../AppTextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ChatRoom = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mineMessage}>
        <Text style={styles.mine}>Hi, I am Drunk. Pick me up.</Text>
      </View>
      <View style={styles.awayMessage}>
        <Text style={styles.away}>Ok coming.</Text>
      </View>
      <View style={styles.inputContainer}>
        <AppTextInput placeholder="Message" />
        <MaterialCommunityIcons name="send" size={25} color="#6e6969" />
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
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5
  },
  awayMessage: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5
  },
  mine: {
    backgroundColor: '#0080ff',
    padding: 30,
    borderRadius: 10,
    color: 'white'
  },
  away: {
    backgroundColor: '#4FAD2A',
    padding: 30,
    borderRadius: 10,
    color: 'white'
  }
});

export default ChatRoom;
