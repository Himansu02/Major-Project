import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import CircularProgressBar from "./CircularProgressBar";
import Wheather from "./Wheather";

export default function IotContainer() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Wheather />
        <CircularProgressBar />
      </View>
    </ScrollView>
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
