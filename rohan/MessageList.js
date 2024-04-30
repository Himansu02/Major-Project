import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import colors from "../config/Colors";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const MessageList = ({
  image,
  ImageComponent,
  title,
  subTitle,
  onPress,
  renderRightActions,
}) => {
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
          <View style={styles.container}>
            {ImageComponent}
            {image && (
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={image} />
              </View>
            )}
            <View style={styles.detailContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              {subTitle && (
                <Text style={styles.subTitle} numberOfLines={1}>
                  {subTitle}
                </Text>
              )}
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={30}
              color={colors.medium}
            />
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  subTitle: {
    color: colors.medium,
  },
});

export default MessageList;
