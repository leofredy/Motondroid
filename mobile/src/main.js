import { registerRootComponent } from "expo";
import React from "react";
import App from "./App.js";
class Main extends React.Component {
  render() {
    return (
      <App/>
    );
  }
}

registerRootComponent(Main);