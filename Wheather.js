import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, Button } from "react-native";
import * as Location from "expo-location";
import axios from "axios";

const Wheather = () => {
  const [imageUrl,setImageUrl]=useState(null)

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { longitude, latitude },
      } = await Location.getLastKnownPositionAsync();

      console.log(longitude, latitude);

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

      const { data:{current} } = await axios.request(options);
      console.log(current)

      if(current.cloud <= 20){
        setImageUrl("https://whatemoji.org/wp-content/uploads/2020/07/Sun-Behind-Cloud-Emoji-1080x1080.png")
      }else if(current.precip_mm === 0){
        setImageUrl("https://cdn1.iconfinder.com/data/icons/hawcons/32/700281-icon-40-clouds-1024.png")
      }else{
        setImageUrl("https://th.bing.com/th/id/R.04766b17050cef9d597b543a55702196?rik=172GsptQPE7oxg&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2ftransparent-weather%2ftransparent-weather-21.png&ehk=Vu9NwNmFqPAvkT1YpP2GjHHNu54l9s%2bpzDq8ApgW4hI%3d&risl=&pid=ImgRaw&r=0")
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeader}>Current Weather</Text>
      <Image
        style={{ width: 200, height: 200 }}
        source={{
          uri: imageUrl,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  weatherContainer:{
    display:"flex",
    flexDirection:"row"
  },
  mainHeader:{
    color:"white",
    fontSize:25,
    textAlign:"center",
  },
  button1:{
    color:"white",
    padding:10,
    backgroundColor:"black",
    borderRadius:10,
    fontSize:20
  },
  button2:{
    color:"white",
    padding:10,
    backgroundColor:"black",
    borderRadius:10,
    fontSize:20,
    marginLeft:10
  }
});

export default Wheather;
