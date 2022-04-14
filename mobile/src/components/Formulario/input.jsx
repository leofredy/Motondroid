import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from 'react-native';

import AppLoading from 'expo-app-loading';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';

export default function Input({ label, type, valueInput, setValueInput }) {
  
  const [statusFocused, setStatusFocused] = useState(false);

  let [ fontLoaded ] = useFonts({
    Inter_400Regular,
  });

  if (!fontLoaded) {
    return <AppLoading/>;
  }

  function onFocused() {
    setStatusFocused(true);
  }
  function notFocused() {
    if (valueInput) {
      setStatusFocused(true);
    } else {
      setStatusFocused(false);
    }
  }
  

  return (
    <View style={styles.container}>
      <View style={{
        ...styles.containerLabel,
        paddingVertical: statusFocused ? 4 : 10
      }}>
        <Text style={{
          ...styles.label,
          fontSize: statusFocused ? 10 : 14
        }}>
          { label }
        </Text>
      </View>

      <TextInput
        secureTextEntry={type === "password" ? true : false}
        style={{
          ...styles.input,
        }}
        onFocus={onFocused}
        onBlur={notFocused}
        value={valueInput}
        onChangeText={setValueInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  containerLabel: {
    position: "absolute",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    paddingHorizontal: 8,
  },  
  label: {
    color: "#89898B",
    fontFamily: "Inter_400Regular",
  },
  input: {
    borderBottomColor: "#89898B",
    borderBottomWidth: 2,
    paddingHorizontal: 8,
    paddingBottom: 0,
    paddingTop: 16,
    color: "#DEDEDE",
    fontSize: 14,
  },
});