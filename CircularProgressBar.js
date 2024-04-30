import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Switch,
  TouchableOpacity,
} from "react-native";
import ProgressCircle from "react-native-progress-circle";
import CustomSwitch from "./CustomSwitch";
import { Menu, Divider, Provider } from "react-native-paper";
import * as Location from "expo-location";
import { nodeServerUrl, pythonServerUrl } from "./baseUrl";

const CircularProgressBar = () => {
  const [percent, setPercent] = useState(0); // Initial percent value
  const [color, setColor] = useState("red");
  const [isEnabled, setIsEnabled] = useState(false);
  const [manual, setManual] = useState(true);

  const [selectedPrediction, setSelectedPrediction] = useState("current");
  const [title, setTitle] = useState("Current Soil Moisture");

  const [forecast, setForecast] = useState([]);

  const toggleSwitch = async (val) => {
    await axios.post(`${nodeServerUrl}/signal`, {
      signal: val ? 1 : 0,
    });
    setIsEnabled(val);
  };

  const getWeatherData = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { longitude, latitude },
      } = await Location.getLastKnownPositionAsync();

      console.log(longitude, latitude);

      const options = {
        method: "GET",
        url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
        params: {
          q: `${latitude},${longitude}`,
          days: "2",
        },
        headers: {
          "X-RapidAPI-Key":
            "39d6afefc0msh4088645ca6fd238p1a6dfdjsnd049c3ac6435",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      setForecast(response.data.forecast.forecastday);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  // Simulate a dynamic change in percent value after a delay
  useEffect(() => {
    const updatePercent = () => {
      // You can replace this with your actual data fetching or logic to update the percent value.
      // For example, fetching data from an API and setting the percent based on that data.
      axios
        .get(`${nodeServerUrl}/analytics?userId=1`)
        .then(({ data }) => {
          const moistureLevel = data.currentMoistureLevel.moisture;
          const currentPercent = Math.round(100 - (moistureLevel / 1024) * 100);
          console.log("hh", currentPercent);
          setPercent(currentPercent);
          if (currentPercent >= 0 && currentPercent <= 39) {
            setColor("red");
          } else if (currentPercent >= 40 && currentPercent <= 70) {
            setColor("green");
          } else {
            setColor("yellow");
          }
        })
        .catch((err) => console.log(err));
    };

    // Call the updatePercent function periodically (e.g., every 2 seconds)
    const intervalId = setInterval(() => {
      if (selectedPrediction === "current") {
        updatePercent();
      }
    }, 20000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handlePrediction = async (type) => {
    let Humidity, Temperature;
    if (type === "5hr") {
      Humidity = forecast[0].hour[5].humidity;
      Temperature = forecast[0].hour[5].temp_c;
    } else if (type === "1day") {
      Humidity = forecast[1].day.avghumidity;
      Temperature = forecast[1].day.avgtemp_c;
    } else {
      axios
        .get(`${nodeServerUrl}/analytics?userId=1`)
        .then(({ data }) => {
          const moistureLevel = data.currentMoistureLevel.moisture;
          const currentPercent = Math.round(100 - (moistureLevel / 1024) * 100);
          setPercent(currentPercent);
          if (currentPercent >= 0 && currentPercent <= 39) {
            setColor("red");
          } else if (currentPercent >= 40 && currentPercent <= 70) {
            setColor("green");
          } else {
            setColor("yellow");
          }
        })
        .catch((err) => console.log(err));

      return;
    }

    const { data } = await axios.post(`${pythonServerUrl}/predict`, {
      Humidity,
      Temperature,
    });
    // const res=await axios.post('http://127.0.0.1:5000/predict',{Humidity,Temperature})
    const currentPercent = Math.round(data.prediction * 100);
    setPercent(currentPercent);
    if (currentPercent >= 0 && currentPercent <= 39) {
      setColor("red");
    } else if (currentPercent >= 40 && currentPercent <= 70) {
      setColor("green");
    } else {
      setColor("yellow");
    }
  };

  const sendMode = async (data) => {
    await axios.post(`${nodeServerUrl}/mode`, { manual: data });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeader}>{title}</Text>
      <ProgressCircle
        percent={percent}
        radius={90}
        borderWidth={15}
        color={color}
        shadowColor="#f8f4f4"
        bgColor="#444B6F"
      >
        <Text style={{ fontSize: 38, color: "#fff" }}>{`${percent}%`}</Text>
      </ProgressCircle>
      <Text style={[styles.title, { marginTop: 20 }]}>
        {color === "red"
          ? "Water Level Very Low"
          : color === "green"
          ? "Ideal Water Level"
          : "Water Level Very High"}
      </Text>
      <View style={styles.buttonContainer}>
        {
          <TouchableOpacity
            onPress={() => {
              setSelectedPrediction("current");
              setTitle("Current Soil Moisture");
              handlePrediction("current");
            }}
          >
            <Text
              style={[
                styles.button1,
                selectedPrediction === "current" && styles.active,
              ]}
            >
              Current
            </Text>
          </TouchableOpacity>
        }
        <TouchableOpacity
          onPress={() => {
            setSelectedPrediction("5hr");
            setTitle("Predicted 5hr Soil Moisture");
            handlePrediction("5hr");
          }}
        >
          <Text
            style={[
              styles.button1,
              { marginLeft: 10 },
              selectedPrediction === "5hr" && styles.active,
            ]}
          >
            Next 5hr
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedPrediction("1day");
            setTitle("Predicted 1day Soil Moisture");
            handlePrediction("1day");
          }}
        >
          <Text
            style={[
              styles.button2,
              selectedPrediction === "1day" && styles.active,
            ]}
          >
            Next 1day
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text style={{ fontSize: 30, color: "white", marginRight: 20 }}>
          Mode
        </Text>
        <TouchableOpacity
          onPress={() => {
            setManual(!manual);
            sendMode(!manual);
          }}
        >
          <Text style={[styles.button2, { backgroundColor: "#fc5c65" }]}>
            {manual ? "Switch to Auto" : "Switch to Manual"}
          </Text>
        </TouchableOpacity>
      </View>
      {manual && (
        <View style={styles.pumpContainer}>
          <Text style={styles.pumpTitle}>Water Pump</Text>
          <CustomSwitch
            value={isEnabled}
            onValueChange={toggleSwitch}
            percent={percent}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    color: "#fff",
  },
  pumpTitle: {
    fontSize: 30,
    color: "#fff",
    marginRight: 15,
  },
  moistureText: {
    fontSize: 20,
  },
  pumpContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
  },
  mainHeader: {
    fontSize: 25,
    color: "white",
    marginBottom: 20,
  },
  button1: {
    color: "white",
    padding: 10,
    backgroundColor: "black",
    borderRadius: 10,
    fontSize: 20,
  },
  button2: {
    color: "white",
    padding: 10,
    backgroundColor: "black",
    borderRadius: 10,
    fontSize: 20,
    marginLeft: 10,
  },
  active: {
    color: "black",
    backgroundColor: "white",
  },
});

export default CircularProgressBar;
