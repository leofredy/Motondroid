import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text  } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";

import WheelButton from "./WheelButton";

export default function WheelMenu({ style, changeArrow, socket }) {
  const [ignition, setIgnition] = useState(false);
  const [headLight, setHeadLight] = useState(-1);
  const [hooter, setHooter] = useState(false);
  const [arrow, setArrow] = useState(-1);
  const [focusButton, setFocusButton] = useState(false);

  const [farolDefault, setFarolDefault]   = useState(WheelFarol.options[0].children);
  const [setaDefault, setSetaDefault]     = useState(WheelArrow.options[3].children);
  const hooterDefault = useRef(WheelHooter).current;
  const cutCurrent = useRef(WheelCutCurrent).current;
  const ignitionDefault = useRef(WheelIgnition).current;

  useEffect(() => {
    socket.onmessage = eventSocketMessage;
  });

  useEffect(() => {
    if (ignition || hooter) {
      if (ignition) {
        console.log("LIGA MOTO");
      } else {
        console.log("LIGA Buzina");
      }
    } else {
      console.log("Desliga moto e buzina");
    }
  }, [ignition, hooter]);

  useEffect(() => {
    switch (headLight) {
      case 1:
        // apagarFarol
        break;
      case 2:
        socket.send("farolBaixo");
        break;
      case 3:
        socket.send("farolAlto");
        break;
    }
  }, [headLight]);

  useEffect(() => {
    changeArrow(arrow);
    switch (arrow) {
      case 1: 
        socket.send("setaDireita");
        break;
      case 2: 
        socket.send("setaEsquerda");
        break;
      case 3:
        socket.send("setaAlerta"); //implementar no servidor
        break;
      case 4:
        socket.send("setaDesliga");
        break;
    }
  }, [arrow]);

  function changeOptions(typeOption, value) {
    switch (typeOption) {
      case "ignition":
        setIgnition(!ignition);
        break;
      case "headlight":
        setHeadLight(value);
        break;
      case "hooter":
        setHooter(!hooter);
      case "cutCurrent":
        setIgnition(false);
        break;
      case "arrows":
        setArrow(value); 
        break;
    }
  }

  function handleFocusOption(focusCurrent) {
    setFocusButton(focusCurrent);
  }

  function eventSocketMessage({ data }) {
    console.log("OOOI SOCKET", data === "farolAlto");
    switch (data) {
      case "farolBaixo":
        console.log("change farol baixo")
        setFarolDefault(WheelFarol.options[2].children);
        break;
      case "farolAlto":
        console.log("ss farol alto")
        setFarolDefault(WheelFarol.options[1].children);
        break;
      case "setaDireita":
        break;
      case "setaEsquerda":
        break;
    }

  }
  return (
    <View style={style}>
      <WheelButton
        subChildren={true}
        childrenCustom={WheelFarol.options}
        changeOption={changeOptions}
        typeOption={"headlight"}
        focusOption={handleFocusOption}
        focusButton={focusButton}
        setDefaultChildren={setFarolDefault}
        defaultChildren={farolDefault}
        style={{
          ...styles.wheelButtonSecondary,
          backgroundColor: focusButton ? "#B5445A" : "#AB2B43",
          wheelContainer: {
            position: "absolute",
            top: -(16 + styles.wheelButtonSecondary.width),
            right: 0
          }
        }}
      />
      <WheelButton
        defaultChildren={hooterDefault}
        changeOption={changeOptions}
        typeOption={"hooter"}
        focusOption={handleFocusOption}
        focusButton={focusButton}
        style={{
          ...styles.wheelButtonSecondary,
          backgroundColor: focusButton ? "#B5445A" : "#AB2B43",
          wheelContainer: {
            position: "absolute",
            top: -(4 + styles.wheelButtonSecondary.width),
            right: 5 + styles.wheelButtonSecondary.width
          }
        }}
      />
  
      <WheelButton
        setDefaultChildren={setSetaDefault}
        defaultChildren={setaDefault}
        subChildren={true}
        childrenCustom={WheelArrow.options}
        changeOption={changeOptions}
        typeOption={"arrows"}
        focusOption={handleFocusOption}
        focusButton={focusButton}
        style={{
          ...styles.wheelButtonSecondary,
          backgroundColor: focusButton ? "#B5445A" : "#AB2B43",
          wheelContainer: {
            position: "absolute",
            top: -8,
            right: 38 + styles.wheelButtonSecondary.width
          }
        }}
      />
      <WheelButton
        defaultChildren={cutCurrent}
        changeOption={changeOptions}
        focusOption={handleFocusOption}
        typeOption={"cutCurrent"}
        focusButton={focusButton}
        style={{
          ...styles.wheelButtonSecondary,
          backgroundColor: focusButton ? "#B5445A" : "#AB2B43",
          wheelContainer: {
            position: "absolute",
            bottom: -30,
            right: -28
          }
        }}
      />
      <WheelButton
        defaultChildren={ignitionDefault}
        changeOption={changeOptions}
        focusOption={handleFocusOption}
        focusButton={focusButton}
        typeOption={"ignition"}
        style={{
          ...styles.wheelButtonPrimary,
          backgroundColor: focusButton ? "#F49979" : "#ED5B27"
        }}
      />
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
    backgroundColor: "#AB2B43",
  },
  thunderSvg: {
    width: 3,
    height: 8,
  }
});
const WheelFarol = {
  options: [
    {
      children: <Svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M0.232544 5.82477L6.45986 5.82477M0.232544 8.4468H6.45986M0.232544 11.0688H6.45986M0.232544 13.6909H6.45986M0.232544 15.9851H6.45986M11.3762 5.16927C13.6589 4.61709 18.765 6.18421 19.2422 10.7411C19.7195 15.2979 11.6234 16.909 11.3762 16.3129C9.27402 15.9838 8.5075 14.697 8.09863 10.7411C8.44779 7.12714 9.19945 5.60527 11.3762 5.16927Z" stroke="#DEDEDE"/>
        <Rect x="19.2126" y="20.0343" width="25" height="2" transform="rotate(-135 19.2126 20.0343)" fill="#DEDEDE"/>
      </Svg>,
      styles: {
        ...styles.wheelButtonSecondary,
        position: "absolute",
        top: -68,
        right: 16,
      }
    },
    {
      children: <Svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M0.232544 1.82477L6.45986 1.82477M0.232544 4.4468L6.45986 4.4468M0.232544 7.06883L6.45986 7.06883M0.232544 9.69086H6.45986M0.232544 11.9851H6.45986M11.3762 1.16927C13.6589 0.61709 18.765 2.18421 19.2422 6.74107C19.7195 11.2979 11.6234 12.909 11.3762 12.3129C9.27402 11.9838 8.5075 10.697 8.09863 6.74107C8.44779 3.12714 9.19945 1.60527 11.3762 1.16927Z" stroke="#DEDEDE"/>
      </Svg>,
      styles: {
        ...styles.wheelButtonSecondary,
        position: "absolute",
        top: -54,
        right: -26
      }
    },
    {
      children: <Svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M1.31634 4.26579L4.1634 3.00043L7.01046 1.73507M1.31634 9.64357L7.3268 6.48017M1.31634 12.1743L7.3268 9.01089M1.31634 14.705L7.3268 11.5416M1 7.11285L7.3268 3.94945M12.3882 1.10236C14.5915 0.569408 19.5198 2.08195 19.9804 6.48014C20.4411 10.8783 12.6269 12.4333 12.3882 11.8579C10.3593 11.5403 9.61947 10.2983 9.22484 6.48014C9.56184 2.99205 10.2873 1.52318 12.3882 1.10236Z" stroke="#DEDEDE"/>
      </Svg>,
      styles: {
        ...styles.wheelButtonSecondary,
        position: "absolute",
        top: -32,
        right: -66
      }
    } 
  ]
}


const WheelArrow = {
  options: [
    {
      children: <Svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M6.50829 2.66668H0.666626V4.33334H6.50829V6.83334L9.83329 3.50001L6.50829 0.166676V2.66668Z" fill="#DEDEDE"/>
      </Svg>,
      styles: {
        ...styles.wheelButtonSecondary,
        position: "absolute",
        top: -(styles.wheelButtonSecondary.width + 40),
        right: 4
      }
    },
    {
      children: <Svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M3.49163 6.83334V4.33334H9.33329V2.66668H3.49163V0.166676L0.166626 3.50001L3.49163 6.83334Z" fill="#DEDEDE"/>
      </Svg>,
      styles: {
        ...styles.wheelButtonSecondary,
        position: "absolute",
        top: -(styles.wheelButtonSecondary.width + 8),
        right: -30
      }
    },
    {
      children: <Svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M6.50829 7.66668H0.666626V9.33334H6.50829V11.8333L9.83329 8.50001L6.50829 5.16668V7.66668ZM11.4916 6.83334V4.33334H17.3333V2.66668H11.4916V0.166676L8.16663 3.50001L11.4916 6.83334Z" fill="#DEDEDE"/>
      </Svg>,
      styles: {
        ...styles.wheelButtonSecondary,
        position: "absolute",
        top: -8,
        right: -(styles.wheelButtonSecondary.width + 10)
      }
    },
    {
      children: <Svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M6.50829 7.66668H0.666626V9.33334H6.00704H6.50829V9.96321V11.8333L9.83329 8.50001L8.62535 7.28904L8.08396 6.7463L6.50829 5.16668V7.66668ZM11.4916 6.83334V4.33334H17.3333V2.66668H12.2847H11.4916V2.50166V0.166676L8.16663 3.50001L9.56483 4.90171L10.0947 5.43296L11.4916 6.83334Z" fill="#DEDEDE"/>
        <Path d="M8.08396 6.7463L8.62535 7.28904L10.0947 5.43296L9.56483 4.90171L8.75 5.91667L8.08396 6.7463Z" fill="#DEDEDE"/>
        <Path d="M11.4916 2.66668H12.2847L14 0.5L13.5 0L11.4916 2.50166V2.66668Z" fill="#DEDEDE"/>
        <Path d="M6.50829 9.33334H6.00704L4 11.8333L4.5 12.5L6.50829 9.96321V9.33334Z" fill="#DEDEDE"/>
      </Svg>,
      styles: {
        ...styles.wheelButtonSecondary,
        position: "absolute",
        top: 36,
        right: -(styles.wheelButtonSecondary.width + 26)
      }
    } 
  ]
}

const WheelHooter = (
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
);
const WheelCutCurrent = (
<Svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <Path fill-rule="evenodd" clip-rule="evenodd" d="M3.1869 15.3535H4.02024C4.02024 15.3535 5.65357 12.4785 8.93691 6.73686L8.99524 6.61186C9.07024 6.46186 9.01191 6.18686 8.60357 6.18686H6.17424L3.62375 9.5202H4.02024L3.1869 15.3535ZM5.74648 5.76986L6.52024 0.353531L5.6869 0.353531C4.80824 1.89971 4.01865 3.28721 3.31871 4.51719C2.30597 6.29684 1.4809 7.74669 0.845236 8.8702C0.82857 8.90353 0.945236 8.68686 0.786903 8.9702C0.628569 9.25353 0.620236 9.5202 1.10357 9.5202H2.90418L5.74648 5.76986Z" fill="#DEDEDE"/>
  <Path d="M3.62375 9.5202L6.17424 6.18686H5.6869L5.74648 5.76986L2.90418 9.5202H3.62375Z" fill="#DEDEDE"/>
  <Path d="M8.99524 2.5L8.60357 2L5.74648 5.76986L5.6869 6.18686H6.17424L8.99524 2.5Z" fill="#DEDEDE"/>
  <Path d="M0.786903 12.3139L1.10357 12.8139L3.62375 9.5202H2.90418L0.786903 12.3139Z" fill="#DEDEDE"/>
</Svg>
);
const WheelIgnition = (
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
);