import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  View,
} from "react-native";
import MessageList from "./MessageList";
import ListItemDeleteAction from "./ListItemDeleteAction";
import ListItemSeparator from "./ListItemSeparator";

const m = [
  {
    id: 1,
    title: "Rakesh",
    description: "Close Friend",
    image: require("../assets/avatar1.png"),
  },
  {
    id: 2,
    title: "Shalini",
    description: "Office Friend",
    image: require("../assets/avatar2.png"),
  },
  {
    id: 3,
    title: "Riya",
    description: "Neighbour",
    image: require("../assets/avatar3.png"),
  },
];

const MessageContainer = ({navigation}) => {
  const [messageArray, setMessageArray] = useState(m);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (item) => {
    const newMessayArray = messageArray.filter((ele) => ele.id !== item.id);

    setMessageArray(newMessayArray);
  };

  return (
      <FlatList
        data={messageArray}
        keyExtractor={(message) => message.id}
        renderItem={({ item }) => (
          <MessageList
            image={item.image}
            title={item.title}
            subTitle={item.description}
            onPress={() => navigation.navigate(item.title,item.title)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => setMessageArray([
          {
            id: 3,
            title: "user3",
            description: "description3",
            image: require("../assets/avatar3.png"),
          },
        ])}
      />
  );
};

export default MessageContainer;
