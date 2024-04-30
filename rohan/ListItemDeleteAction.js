import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import colors from "../config/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ListItemDeleteAction = ({onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="trash-can"
          color={colors.white}
          size={35}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.danger,
    width: 80,
  },
});

export default ListItemDeleteAction;
