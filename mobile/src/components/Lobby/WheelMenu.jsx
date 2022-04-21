import React, { useEffect, useState } from "react";
import { StyleSheet, View  } from "react-native";
import Svg, { Path } from "react-native-svg";

import WheelButton from "./WheelButton";

export default function WheelMenu({ style }) {
  return (
    <View style={style}>
      <WheelButton
        style={{
          ...styles.wheelButtonSecondary,
          position: "absolute",
          top: -(36 + styles.wheelButtonSecondary.width),
          right: 0
        }}
      >
        <Svg 
          width="20" 
          height="13" 
          viewBox="0 0 20 13" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path 
            d="M0.232544 1.82477L6.45986 1.82477M0.232544 4.4468L6.45986 4.4468M0.232544 7.06883L6.45986 7.06883M0.232544 9.69086H6.45986M0.232544 11.9851H6.45986M11.3762 1.16927C13.6589 0.61709 18.765 2.18421 19.2422 6.74107C19.7195 11.2979 11.6234 12.909 11.3762 12.3129C9.27402 11.9838 8.5075 10.697 8.09863 6.74107C8.44779 3.12714 9.19945 1.60527 11.3762 1.16927Z" 
            stroke="#DEDEDE"
          />
        </Svg>
      </WheelButton>
      <WheelButton
        style={{
          ...styles.wheelButtonSecondary,
          position: "absolute",
          top: -(13 + styles.wheelButtonSecondary.width),
          right: 5 + styles.wheelButtonSecondary.width
        }}
      >
        <Svg 
          width="18" 
          height="14" 
          viewBox="0 0 18 14" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path 
            d="M14 6.16667V7.83333H17.3333V6.16667H14ZM12.3333 11.675C13.1333 12.2667 14.175 13.05 15 13.6667C15.3333 13.225 15.6666 12.775 16 12.3333C15.175 11.7167 14.1333 10.9333 13.3333 10.3333C13 10.7833 12.6666 11.2333 12.3333 11.675ZM16 1.66667C15.6666 1.225 15.3333 0.775002 15 0.333336C14.175 0.950002 13.1333 1.73334 12.3333 2.33334C12.6666 2.775 13 3.225 13.3333 3.66667C14.1333 3.06667 15.175 2.29167 16 1.66667ZM2.33329 4.5C1.41663 4.5 0.666626 5.25 0.666626 6.16667L0.666626 7.83333C0.666626 8.75 1.41663 9.5 2.33329 9.5H3.16663L3.16663 12.8333H4.83329L4.83329 9.5H5.66663L9.83329 12L9.83329 2L5.66663 4.5L2.33329 4.5ZM11.9166 7C11.9166 5.89167 11.4333 4.89167 10.6666 4.20834L10.6666 9.78333C11.4333 9.10834 11.9166 8.10834 11.9166 7Z" 
            fill="#DEDEDE"
          />
        </Svg>
      </WheelButton>
      <WheelButton
        style={{
          ...styles.wheelButtonSecondary,
          position: "absolute",
          top: -15,
          right: 38 + styles.wheelButtonSecondary.width
        }}
      >
        <Svg 
          width="18" 
          height="12" 
          viewBox="0 0 18 12" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path 
            d="M6.50829 7.66667H0.666626V9.33334H6.50829V11.8333L9.83329 8.5L6.50829 5.16667V7.66667ZM11.4916 6.83334V4.33333H17.3333V2.66667H11.4916V0.166668L8.16663 3.5L11.4916 6.83334Z" 
            fill="#DEDEDE"
          />
        </Svg>
      </WheelButton>
      <WheelButton
        style={{
          ...styles.wheelButtonSecondary,
          position: "absolute",
          bottom: -24,
          right: -28
        }}
      >
        <Svg 
          width="10" 
          height="16" 
          viewBox="0 0 10 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path 
            d="M4.02024 15.3535H3.1869L4.02024 9.5202H1.10357C0.620236 9.5202 0.628569 9.25353 0.786903 8.9702C0.945236 8.68686 0.82857 8.90353 0.845236 8.8702C1.92024 6.9702 3.5369 4.13686 5.6869 0.353531L6.52024 0.353531L5.6869 6.18686H8.60357C9.01191 6.18686 9.07024 6.46186 8.99524 6.61186L8.93691 6.73686C5.65357 12.4785 4.02024 15.3535 4.02024 15.3535Z" 
            fill="#DEDEDE"
          />
        </Svg>
      </WheelButton>
      <WheelButton
        style={styles.wheelButtonPrimary}
      >
        <Svg 
          width="18" 
          height="30" 
          viewBox="0 0 18 30" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path 
          d="M7.33332 30H5.66665L7.33332 18.3333H1.49999C0.533319 18.3333 0.549986 17.8 0.866652 17.2333C1.18332 16.6667 0.949986 17.1 0.983319 17.0333C3.13332 13.2333 6.36665 7.56667 10.6667 7.62939e-06L12.3333 7.62939e-06L10.6667 11.6667H16.5C17.3167 11.6667 17.4333 12.2167 17.2833 12.5167L17.1667 12.7667C10.6 24.25 7.33332 30 7.33332 30Z" 
          fill="#DEDEDE"
        />
        </Svg>
      </WheelButton>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    position: "absolute",
    bottom: 30,
    right: 36,
  },
  wheelButtonPrimary: {
    justifyContent: "center",
    alignItems: "center",
    width: 65,
    height: 65,
    borderRadius: 65,
    backgroundColor: "#ED5B27"
  },
  wheelButtonSecondary: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#AB2B43"
  },
  thunderSvg: {
    width: 3,
    height: 8,
  }
});