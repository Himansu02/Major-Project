import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CropDetails = ({ route }) => {
  const crop = route.params;
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={crop.url} style={styles.image}></Image>
        <Text style={styles.cropName}>{String(crop.name).toUpperCase()}</Text>
        <Text style={styles.cropDesc}>{crop.desc}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>Current Data Values</Text>
          <ScrollView horizontal={true}>
            <View style={styles.circleContainer}>
              <View style={styles.circle}>
                <ProgressCircle
                  percent={70}
                  radius={50}
                  borderWidth={7}
                  color="green"
                  shadowColor="#f8f4f4"
                  bgColor="#444B6F"
                >
                  <Text style={{ fontSize: 25, color: "#fff" }}>N</Text>
                </ProgressCircle>
              </View>
              <View style={styles.circle}>
                <ProgressCircle
                  percent={30}
                  radius={50}
                  borderWidth={7}
                  color="green"
                  shadowColor="#f8f4f4"
                  bgColor="#444B6F"
                >
                  <Text style={{ fontSize: 25, color: "#fff" }}>P</Text>
                </ProgressCircle>
              </View>
              <View style={styles.circle}>
                <ProgressCircle
                  percent={50}
                  radius={50}
                  borderWidth={7}
                  color="green"
                  shadowColor="#f8f4f4"
                  bgColor="#444B6F"
                >
                  <Text style={{ fontSize: 25, color: "#fff" }}>K</Text>
                </ProgressCircle>
              </View>
              <View style={styles.circle}>
                <ProgressCircle
                  percent={20}
                  radius={50}
                  borderWidth={7}
                  color="green"
                  shadowColor="#f8f4f4"
                  bgColor="#444B6F"
                >
                  <Text style={{ fontSize: 25, color: "#fff" }}>PH</Text>
                </ProgressCircle>
              </View>
              <View style={styles.circle}>
                <ProgressCircle
                  percent={60}
                  radius={50}
                  borderWidth={7}
                  color="green"
                  shadowColor="#f8f4f4"
                  bgColor="#444B6F"
                >
                  <MaterialCommunityIcons
                    name="weather-rainy"
                    size={28}
                    color="#fff"
                  />
                </ProgressCircle>
              </View>
              <View style={styles.circle}>
                <ProgressCircle
                  percent={70}
                  radius={50}
                  borderWidth={7}
                  color="green"
                  shadowColor="#f8f4f4"
                  bgColor="#444B6F"
                >
                  <Text
                    style={{ fontSize: 25, color: "#fff" }}
                  >H</Text>
                </ProgressCircle>
              </View>
              <View style={styles.circle}>
                <ProgressCircle
                  percent={30}
                  radius={50}
                  borderWidth={7}
                  color="green"
                  shadowColor="#f8f4f4"
                  bgColor="#444B6F"
                >
                  <Text
                    style={{ fontSize: 25, color: "#fff" }}
                  >T</Text>
                </ProgressCircle>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: 250,
  },
  cropName: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  cropDesc: {
    fontSize: 16,
    margin: 10,
    lineHeight: 22,
  },
  detailsText: {
    margin: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  detailsContainer: {
    // margin: 10,
  },
  circleContainer: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    overflow: "scroll",
  },
  circle: {
    margin: 10,
  },
});

export default CropDetails;
