import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text  } from "react-native";


export default function WheelButton({ children, style }) {

  return (
    <View 
      style={{
        ...style,
        opacity: 0.7,
      }}
    >
      {children}
    </View>
  );
}