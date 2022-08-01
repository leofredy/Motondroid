import React, { useEffect, useState, useRef, useMemo } from "react";
import { AppState, StatusBar, StyleSheet, View, Text, Image, Animated } from "react-native"
import * as ScreenOrientation from "expo-screen-orientation";
import Svg, { Path } from "react-native-svg";

import WheelMenu from "../components/Lobby/WheelMenu";
import RelegioSVG from "../assets/img/relogio.png";

const PathAnimated = Animated.createAnimatedComponent(Path);

export default function Lobby({ navigation }) {
  const [time, setTime] = useState(0);
  const [codArrow, setCodArrow] = useState(-1);
  const piscaLigado = useRef(0);
  const animatArrowFirst = useRef(new Animated.Value(0)).current;
  const animatArrowSeconday = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(1);
  const [socketAPI, setSocketAPI] = useState(null);

  useEffect(() => {
    handleStartSocket()
    .then((socket) => {
      setSocketAPI(socket);
      setLoading(0);
    })
    .catch(messageErro => console.log("erro man"));
  }, []);
  
  useEffect(() => {
    if (socketAPI) {
      AppState.addEventListener("change", handleAppStateChange);
    }

  }, [socketAPI]);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

    const timer = setInterval(() => {
      setTime(prevState => prevState + 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    piscaAnimate();
  }, [codArrow]);

  const isArrowLeft = useMemo(() => {
    return codArrow === 2 || codArrow === 3;
  }, [codArrow]);

  const isArrowRight = useMemo(() => {
    return codArrow === 1 || codArrow === 3;
  }, [codArrow]);

  function getTimeHours() {
    const hours = `${parseInt(time / 3600)}`.padStart(2, "0");
    const minutes = `${parseInt((time % 3600) / 60)}`.padStart(2, "0");
    const seconds = `${parseInt((time % 3600) % 60)}`.padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`; 
  }

  function handleStartSocket() {   
    return new Promise(async (resolve, reject) => {
      const socket = await new WebSocket("ws://192.168.4.1:81/");
      
      socket.onopen = () => {
        resolve(socket);
      }
      socket.onerror = function (error) {
        reject("Erro de connexão");
      };

    });
  }

  function handleAppStateChange(event) {
    if (socketAPI.readyState === 1 && event === "background") {
      socketAPI.send("offPainel");
      socketAPI.close();
      setLoading(1);
      navigation.navigate("Login");

    } else if (socketAPI.readyState !== 1 && event === "active") {
      handleStartSocket()
        .then((socket) => {
          setSocketAPI(socket);
          setLoading(0);
        })
        .catch(messageErro => console.log("erro man"));
    }
  }


  function piscaAnimate() {
    animatArrowFirst.setValue(0);
    animatArrowSeconday.setValue(0);
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatArrowFirst, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(animatArrowSeconday, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.parallel([
            Animated.timing(animatArrowFirst, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(animatArrowSeconday, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ])
        ], {}),
        {iterations: -1}
      ).start();
  }

  return(
    loading ? 
      (
        <Text>
          Loading socket...
        </Text>
      )
      : (
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
              <PathAnimated 
                d="M6.625 17.75H12.25L6 9L12.25 0.25H6.625L0.375 9L6.625 17.75Z" 
                fill={isArrowLeft ? "#FFEE58" : "#727077"}
                opacity={isArrowLeft ? animatArrowSeconday : 1}
              />
              <PathAnimated 
                d="M15.375 17.75H21L14.75 9L21 0.25H15.375L9.125 9L15.375 17.75Z" 
                fill={isArrowLeft ? "#FFEE58" : "#727077"}
                opacity={isArrowLeft ? animatArrowFirst : 1}
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
                fill={isArrowRight ? "#FFEE58" : "#727077"}
                fillOpacity={isArrowRight ? animatArrowSeconday: 1}
              />
              <PathAnimated 
                d="M15.375 17.75H21L14.75 9L21 0.25H15.375L9.125 9L15.375 17.75Z" 
                fill={isArrowRight ? "#FFEE58" : "#727077"}
                fillOpacity={isArrowRight ? animatArrowFirst : 1}
              />
            </Svg>
          </View>
          <WheelMenu 
            socket={socketAPI}
            changeArrow={setCodArrow}  
            style={styles.controls}
          />
        </View>
      )
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