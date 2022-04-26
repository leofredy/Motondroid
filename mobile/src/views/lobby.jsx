import React, { useEffect, useState, useRef } from "react";
import { StatusBar, StyleSheet, View, Text, Image, Animated } from "react-native"
import * as ScreenOrientation from "expo-screen-orientation";
import Svg, { Path } from "react-native-svg";

import WheelMenu from "../components/Lobby/WheelMenu";
import RelegioSVG from "../assets/img/relogio.png";

const PathAnimated = Animated.createAnimatedComponent(Path);

export default function Lobby() {
  const [time, setTime] = useState(0);
  const piscaLigado = useRef(0);
  const AnimatedOpacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

    const timer = setInterval(() => {
      setTime(prevState => prevState + 1);
    }, 1000);

    
    const intervalPisca = piscaAnimate();

    return () => {
      clearTimeout(timer);
      clearInterval(intervalPisca);
    }
  }, []);

  function getTimeHours() {
    const hours = `${parseInt(time / 3600)}`.padStart(2, "0");
    const minutes = `${parseInt((time % 3600) / 60)}`.padStart(2, "0");
    const seconds = `${parseInt((time % 3600) % 60)}`.padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`; 
  }

  function handleArrowHeader(value) {
    switch (value) {
      case 1: 
        // seta direita
        break;
      case 2: 
        // seta esquerda
        break;
      case 3:
        // pisca alerta 
        break;
      case 4:
      case -1:
        // desliga seta
        break;
    }
  }
  function piscaAnimate() {
    return setInterval(() => {
      // console.log(piscaLigado.current);
      Animated.timing(AnimatedOpacity, {
        toValue: piscaLigado.current ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      

      piscaLigado.current = !piscaLigado.current;
    }, 400);
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Svg 
          style={styles.header_svgLeft}
          width="21" 
          height="18" 
          viewBox="0 0 21 18" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path 
            d="M6.625 17.75H12.25L6 9L12.25 0.25H6.625L0.375 9L6.625 17.75Z" 
            fill="#727077"
          />
          <Path 
            d="M15.375 17.75H21L14.75 9L21 0.25H15.375L9.125 9L15.375 17.75Z" 
            fill="#727077"
          />
        </Svg>
        <View style={styles.cronometro}>
          <Image source={RelegioSVG}/>
          <Text style={styles.cronometroText}>{getTimeHours()}</Text>
        </View>
        <Svg 
          style={styles.header_svgRight}
          width="21" 
          height="18" 
          viewBox="0 0 21 18" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <PathAnimated 
            d="M6.625 17.75H12.25L6 9L12.25 0.25H6.625L0.375 9L6.625 17.75Z" 
            fill="#727077"
            fillOpacity={AnimatedOpacity}
          />
          <Path 
            d="M15.375 17.75H21L14.75 9L21 0.25H15.375L9.125 9L15.375 17.75Z" 
            fill="#727077"
          />
        </Svg>
      </View>

      {/* <ViewAnimated
        style={{
          opacity: AnimatedOpacity
        }}  
      >

        <Text style={{color: "white"}}>
          ooi
        </Text>
          </ViewAnimated> */}

      <WheelMenu 
        style={styles.controls}
        changeArrow={handleArrowHeader}  
      />
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }, 
  cronometro: {
    alignItems: "center",
  },  
  cronometroText: {
    color: "#DEDEDE",
    fontSize: 12
  },
  header_svgLeft: { 
    marginRight: 24
  },
  header_svgRight: {
    marginLeft: 24,
    transform: [{rotate: "180deg"}],
  },
  controls: {
    position: "absolute",
    bottom: 54,
    right: 67,
  },
});