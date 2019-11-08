import React, { Component } from "react";
import Box from "./Box";

class Main extends Component {
  render() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
      <div className="Main">
        {numbers.map(key => {
          return <Box key={key}></Box>;
        })}
      </div>
    );
  }
}

export default Main;
