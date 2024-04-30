import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AppTextInput = ({ placeholder, onChange }) => {

    const handleTextChange = (num)=>{
        onChange(placeholder, num)
    }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#6e6969"
        keyboardType="numeric"
        onChangeText={handleTextChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    padding: 15,
    backgroundColor: "#f8f4f4",
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    fontSize: 20,
    color: "#0c0c0c",
  },
});

export default AppTextInput;
