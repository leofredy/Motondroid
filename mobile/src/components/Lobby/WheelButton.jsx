import React, { useEffect, useState, useRef, useMemo } from "react";
import { View, TouchableOpacity, Animated, Button, Text } from "react-native";

import WheelSubButton from "./WheelSubButton";

export default function WheelButton({ 
  children, 
  style, 
  changeOption, 
  typeOption, 
  subChildren,
  childrenCustom,
  focusOption,
  focusButton,
  defaultChildren,
  setDefaultChildren
}) { 
  const [timer, setTimer] = useState(0);
  const [showWheelButtons, setShowWheelButtons] = useState(false);
  // const [defaultChildren, setDefaultChildren] = useState(children);

  useEffect(() => {
    clearTimeout(timer);
    if (!focusButton) {
      setTimer(setTimeout(() => {
        setShowWheelButtons(false);
      }, 300));
    }
  }, [focusButton]);

  return (
    <View
      style={style.wheelContainer}
    >
      <TouchableOpacity 
        style={style}
        
        onPressIn={() => {
          if (subChildren) {
            focusOption(!focusButton);
            if (!focusButton) {
              setShowWheelButtons(true);
              // fadeIn();
            }
          } else {
            focusOption(false);
            changeOption(typeOption);
          }
        }}   
        onPressOut={() => {
          if (typeOption === "ignition" || typeOption === "hooter") {
            changeOption(typeOption);
          }
        }}     
      >
        {defaultChildren}
      </TouchableOpacity>
      {
        subChildren && showWheelButtons
        && childrenCustom.map((custom, index) => {
          return (
            <WheelSubButton
              childrenCustom={custom}
              focusOption={focusOption}
              changeOption={changeOption}
              focusButton={focusButton}
              setDefaultChildren={setDefaultChildren}
              typeOption={typeOption}
              index={index}
              key={index}
            >
              {custom.children}
            </WheelSubButton>
          );
        })
      }
    </View>
  );
}