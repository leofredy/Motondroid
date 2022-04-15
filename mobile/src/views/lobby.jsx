import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Lobby() {
  return(
    <View>
      <Text style={styles.text}>OOOI LOBBY</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "red",
  }
});