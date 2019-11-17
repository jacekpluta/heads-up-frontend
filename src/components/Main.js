import React, { Component } from "react";
import Box from "./Box";
import gamePicTwo from "../pic/gamePicTwo.jpg";

class Main extends Component {
  render() {
    const numbers = [1];

    return (
      <div className="Main">
        {numbers.map(key => {
          return (
            <Box
              key={key}
              style={{ backgroundImage: `url(${gamePicTwo})` }}
            ></Box>
          );
        })}
      </div>
    );
  }
}

export default Main;
