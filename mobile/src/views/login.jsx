import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, PermissionsAndroid } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Input from "../components/Formulario/input";

import AppLoading from 'expo-app-loading';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import Logo from "../assets/img/logo.png";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [stateWifi, setStateWifi] = useState({isConnected: false});

  useEffect(() => {
    handlePermission();
  }, []);

  const [ fontLoaded ] = useFonts({
    Inter_400Regular,
  });
  
  let state = false;
  if (!fontLoaded){
    return <AppLoading/>
  }
  async function handlePermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Permitir acesso",
        message: `App necessita de acesso a camera para fazer consultas sobre wifi!`,
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      try {
        const state = await NetInfo.fetch();
        alert(state.details.ssid)
        setStateWifi(state);
      } catch(error) {
        alert("Erro: ", error);
        console.log("erro request: ", error)
      }
    } else {
      alert("acesso negado!");
    }
    
  }

  function handleLogin() {
    if (!stateWifi.details.ssid) {
      fetch(
        "http://192.168.4.1/login", 
        {
          method: "POST", 
          body: JSON.stringify({
            username: username, 
            password: password
          })
        }
      ).then(response => response.json()
      ).then(data => {
        if (data.status === "logado com sucesso!") {
          navigation.navigate("Lobby");
        } else {
          setPassword("");
          alert("Usuário ou senha incorreto!");
        }
      }).catch(() => {
        alert("sem request")
      });
    } else {
      alert("indo para proxima página")
      navigation.navigate("Lobby");
    }
  }

  return (
    <View style={styles.container}>      
      <View style={styles.wrapper}>
        {stateWifi.isConnected ? (
          <>
            <Image 
              style={styles.img}
              source={Logo}
            />

            <Text style={styles.title}>
              Login
            </Text>

            <View style={styles.firstInput}>
              <Input
                valueInput={username}
                setValueInput={setUsername}
                label={"usuário"}
              />
            </View>
            
            <Input
              valueInput={password}
              setValueInput={setPassword}
              label={"senha"}
              type={"password"}
            />

            <TouchableOpacity
              style={styles.btn}
              onPressIn={handleLogin}
            >
              <Text style={styles.btnText}>
                Entrar
              </Text>
            </TouchableOpacity>
          </>
        ): (
          <Text>
            Loading... - {stateWifi.isConnected}
          </Text>
        )}
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#121212",
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 20,
    paddingLeft: 20,
  },  
  img: {
    alignSelf: "center",
    marginBottom: 24
  },  
  title: {
    marginBottom: 16,
    fontSize: 22,
    color: "#DEDEDE",
    fontFamily: "Inter_400Regular"
  },
  firstInput: {
    marginBottom: 16
  },
  btn: {
    alignItems: "center",
    marginTop: 24,
    paddingVertical: 10,
    backgroundColor: "#AB2B43",
    borderRadius: 4,
  },
  btnText: {
    color: "#DEDEDE",
    fontSize: 14,
  }
});