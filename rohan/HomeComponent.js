import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import CircularProgressBar from "../CircularProgressBar";
import ProgressCircle from "react-native-progress-circle";
import * as Location from "expo-location";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Contex } from "./Contex";

const HomeComponent = () => {
  const [location, setLocation] = useState({
    name: 'Burla',
    region: 'Orissa',
    country: 'India'
  });
  const {
    firstMessagesArray,
    setFirstMessagesArray,
    secondMessagesArray,
    setSecondMessagesArray,
    thirdMessagesArray,
    setThirdMessagesArray,
  } = useContext(Contex);
  const [percent, setPercent] = useState(0);
  const [color, setColor] = useState("");

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { longitude, latitude },
      } = await Location.getCurrentPositionAsync();

      const options = {
        method: "GET",
        url: "https://weatherapi-com.p.rapidapi.com/current.json",
        params: { q: `${latitude},${longitude}` },
        headers: {
          "X-RapidAPI-Key":
            "39d6afefc0msh4088645ca6fd238p1a6dfdjsnd049c3ac6435",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };

      const { data } = await axios.request(options);
      console.log(data.location);
      setLocation(data.location);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    getLocation();
    if (percent > 24) {
      setFirstMessagesArray((prev) => [
        ...prev,
        `Hi Ramesh, Pick me, my car is locked. My current location is ${location.name +", " +location.region +", " +location.country}`,
      ]);
      setSecondMessagesArray((prev) => [
        ...prev,
        `Hi Shalini, Pick me, my car is locked. My current location is ${location.name + ", " + location.region + ", " + location.country}`,
      ]);
      setThirdMessagesArray((prev) => [
        ...prev,
        `Hi Riya, Pick me, my car is locked. My current location is ${location.name + ", " + location.region + ", " + location.country}`,
      ]);
    }
  }, [percent]);

  useEffect(() => {
    const updatePercent = async () => {
      try {
        const response = await fetch(
          "https://driveaware-561fb-default-rtdb.asia-southeast1.firebasedatabase.app/Alcohol.json"
        );
        if (!response.ok) {
          throw new Error("Somethinge Went Wrong!");
        }
        const data = await response.json();
        console.log(data);
        const alcoholLevel = data.Value;
        const currentPercent = Math.round((alcoholLevel / 4095) * 100);
        console.log("hh", currentPercent);
        setPercent(currentPercent);
        if (currentPercent > 24) {
          setColor("red");
        } else {
          setColor("green");
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    // Call the updatePercent function periodically (e.g., every 2 seconds)
    const intervalId = setInterval(() => {
      updatePercent();
    }, 2000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Current Alcohol Level</Text>
      <View style={styles.circleContainer}>
        <ProgressCircle
          percent={percent}
          radius={120}
          borderWidth={15}
          color={color}
          bgColor="black"
        >
          <Text style={{ fontSize: 38, color: "#fff" }}>{`${percent}%`}</Text>
        </ProgressCircle>
      </View>
      <View style={styles.locationContainer}>
        <MaterialCommunityIcons name="google-maps" size={35} color="#6e6969" />
        <Text style={styles.locationText}>
          {location.name + ", " + location.region + ", " + location.country}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  circleContainer: {
    marginTop: 40,
    marginBottom: 60,
  },
  locationContainer: {
    display: "flex",
    flexDirection: "row",
  },
  locationText: {
    fontSize: 20,
  },
  header: {
    fontSize: 30,
  },
});

export default HomeComponent;
