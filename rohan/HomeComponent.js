import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import CircularProgressBar from "../CircularProgressBar";
import ProgressCircle from "react-native-progress-circle";
import * as Location from "expo-location";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeComponent = () => {

  const [location,setLocation] = useState({})

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
      setLocation(data.location)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Current Alocohol Level</Text>
      <View style={styles.circleContainer}>
        <ProgressCircle
          percent={70}
          radius={120}
          borderWidth={15}
          color="red"
          shadowColor="#f8f4f4"
          bgColor="#444B6F"
        >
          <Text style={{ fontSize: 38, color: "#fff" }}>{`${"70"}%`}</Text>
        </ProgressCircle>
      </View>
      <View style={styles.locationContainer}>
        <MaterialCommunityIcons name="google-maps" size={35} color="#6e6969" />
        <Text style={styles.locationText}>{location.name+', '+location.region+', '+location.country}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    flexDirection:'column',
    width: '100%',
    height: '100%'
  },
  circleContainer: {
    marginTop: 40,
    marginBottom: 60
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  locationText: {
    fontSize: 20
  },
  header: {
    fontSize: 30,
  }
});

export default HomeComponent;
