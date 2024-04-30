import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AppTextInput from "./AppTextInput";
import LottieView from "lottie-react-native";
import { useState } from "react";
import axios from "axios";
import { cropMap } from "./cropMap";
import { nodeServerUrl, pythonServerUrl } from "./baseUrl";

export default function CropPrediction({navigation}) {

  const [loading,setLoading] = useState(false)
  const [loadMsg,setLoadMsg] = useState('')
  const [inputValues,setInputValues] = useState({
    'Nitrogen': -1,
    'Phosphorous': -1,
    'Potassium': -1,
    'PH': -1,
    'Rainfall': -1
  })

  const handlePredict = async() => {
    let flag = false;
    Object.keys(inputValues).forEach((key)=>{
      const value = inputValues[key];
      console.log(value)
      if(value === -1) {
        flag = true;
      }
    })
    if(flag) {
      return;
    }
    setLoading(true)
    setLoadMsg('Fetching Temprature and Humidity...')
    try{
      const {data} = await axios.get(`${nodeServerUrl}/th`)
      setLoadMsg('Predicting Your Crop...')
      console.log(data.Humidity)
      const crop = await axios.post(`${pythonServerUrl}/crop`, {
        Humidity: data.Humidity,
        Temperature: data.Temperature,
        N: inputValues.Nitrogen,
        P: inputValues.Phosphorous,
        K: inputValues.Potassium,
        pH: inputValues.PH,
        Rainfall: inputValues.Rainfall
      })
      console.log(crop.data.prediction);
      console.log(cropMap[crop.data.prediction].url)
      setTimeout(() => {
        navigation.navigate('CropDetails',cropMap[crop.data.prediction])
        setLoading(false);
      }, 3000);
    }catch(err) {
      console.log(JSON.stringify(err))
    }
  }

  const handleChange = (placeholder, num) => {
    let updatedValue = {...inputValues};
    updatedValue[placeholder] = num;
    setInputValues(updatedValue);
  }

  return (
    <ImageBackground
      source={require("./assets/cropBackground.jpg")}
      style={styles.container}
    >
      <Text style={styles.title}>Most Suitable Crop</Text>
      <View style={styles.formContainer}>
        <AppTextInput placeholder="Nitrogen" onChange={handleChange}/>
        <AppTextInput placeholder="Phosphorous" onChange={handleChange}/>
        <AppTextInput placeholder="Potassium" onChange={handleChange}/>
        <AppTextInput placeholder="PH" onChange={handleChange}/>
        <AppTextInput placeholder="Rainfall" onChange={handleChange}/>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handlePredict}>
        <Text style={[styles.button2, { backgroundColor: "#4FAD2A" }]}>
          Predict
        </Text>
      </TouchableOpacity>
      { loading && <View style={styles.modal}>
        <LottieView
          autoPlay
          loop
          source={require("./assets/test.json")}
          speed={2.5}
          key="1"
          style={{
            width: 300,
            height: 300,
          }}
        />
        <Text style={styles.loadingText}>{loadMsg}</Text>
      </View>}
      <View style={styles.lottieContainer}>
        <LottieView
          autoPlay
          loop
          source={require("./assets/plantLottie.json")}
          key="1"
          style={{
            position: "absolute",
            width: 200,
            height: 200,
          }}
        />
        <LottieView
          autoPlay
          loop
          source={require("./assets/crop.json")}
          key="2"
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            right: -10,
          }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
  },
  button2: {
    color: "white",
    padding: 12,
    borderRadius: 10,
    fontSize: 23,
    width: "50%",
    textAlign: "center",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    marginTop: 10,
  },
  lottieContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  modal: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    opacity: 0.8,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
    position: 'absolute',
    bottom: '33%',
    letterSpacing: 1.5
  }
});
