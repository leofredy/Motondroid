import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View, Text, Image  } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

import RelegioSVG from "../assets/img/relogio.png";

export default function Lobby() {
  const [time, setTime] = useState(0);
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

    setInterval(() => {
      setTime(prevState => prevState + 1);
    }, 1000);
  }, []);

  function getTimeHours() {
    const minutes = `${parseInt(time / 60)}`.padStart(2, "0");
    const seconds = `${parseInt(time % 60)}`.padStart(2, "0");
    return `${minutes}:${seconds}`; 
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.cronometro}>
          <Image source={RelegioSVG}/>
          <Text style={styles.text}>{getTimeHours()}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: StatusBar.currentHeight,
  },  
  header: {
    alignItems: "center"
  }, 
  cronometro: {
    alignItems: "center",
  },  
  text: {
    color: "#FFF",
  }
});