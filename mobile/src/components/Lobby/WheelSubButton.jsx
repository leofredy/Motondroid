import React, { useEffect, useState, useRef } from "react";
import { View, Animated } from "react-native";

const ViewAnimated = Animated.createAnimatedComponent(View);

export default function WheelSubButton({
  children, 
  childrenCustom, 
  focusOption, 
  focusButton,
  changeOption,
  typeOption, 
  setDefaultChildren,
  index
}) {
  const opacityAnimat = useRef(new Animated.Value(0)).current;
  const positionAnimat = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  useEffect(() => {
    if (focusButton) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [focusButton]);

  function fadeIn() {
    Animated.parallel([
      Animated.timing(opacityAnimat, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(positionAnimat.x, {
        toValue: childrenCustom.styles.right,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(positionAnimat.y, {
        toValue: childrenCustom.styles.top,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  }

  function fadeOut() {
    Animated.parallel([
      Animated.timing(opacityAnimat, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(positionAnimat.x, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(positionAnimat.y, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  }

  return (
    <ViewAnimated
      style={{
        ...childrenCustom.styles,
        opacity: opacityAnimat,
        top: 0,
        right: 0,
        zIndex: -1,
        transform: [
          {translateX: (positionAnimat.x)},
          {translateY: (positionAnimat.y)},
        ],
      }}
      onTouchStart={() => {
        focusOption(false);
        changeOption(typeOption, index + 1);
        setDefaultChildren(childrenCustom.children); 
      }}
    >
      {children}
    </ViewAnimated>
  );
}