import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Notification from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import * as Progress from "react-native-progress";
import CircularProgressBar from "./CircularProgressBar";
import Screen from "./Screen";
import Wheather from "./Wheather";
import IotContainer from "./IotContainer";
import AppNavigator from "./navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Contex } from "./rohan/Contex";

export default function App() {
  const [token, setToken] = useState(null);
  const [firstMessagesArray, setFirstMessagesArray] = useState([]);
  const [secondMessagesArray, setSecondMessagesArray] = useState([]);
  const [thirdMessagesArray, setThirdMessagesArray] = useState([]);

  const requestForPushNotification = async () => {
    let token;
    if (Device.isDevice) {
      const { status: exisitingStatus } =
        await Notification.getPermissionsAsync();

      let finalStatus = exisitingStatus;
      if (exisitingStatus !== "granted") {
        const { status } = await Notification.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert((title = "Failed to get push token for push Notification"));
        return;
      }
      token = await Notification.getExpoPushTokenAsync({
        projectId: "e50421fa-4340-428e-891e-ce985d2c697b",
      });
    } else {
      Alert.alert(
        (title = "Must be using a physical device for push notification")
      );
    }

    if (Platform.OS === "android") {
      Notification.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notification.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  useEffect(() => {
    requestForPushNotification().then((res) => setToken(res));
  }, []);
  useEffect(() => {}, []);

  return (
    <Contex.Provider
      value={{
        firstMessagesArray,
        setFirstMessagesArray,
        secondMessagesArray,
        setSecondMessagesArray,
        thirdMessagesArray,
        setThirdMessagesArray
      }}
    >
      <Screen>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Screen>
    </Contex.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444B6F",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
  },
});
