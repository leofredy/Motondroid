import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import Input from "../components/Formulario/input";

import AppLoading from 'expo-app-loading';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import Logo from "../assets/img/logo.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [ fontLoaded ] = useFonts({
    Inter_400Regular,
  });

  if (!fontLoaded){
    return <AppLoading/>
  }

  return (
    <View style={styles.container}>      
      <View style={styles.wrapper}>
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
        >
          <Text style={styles.btnText}>
            Entrar
          </Text>
        </TouchableOpacity>
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