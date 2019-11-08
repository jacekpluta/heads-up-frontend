import React, { Component } from "react";
import GameModule from "./GameModule";

function eventDivOnClick(e) {
  e.preventDefault();
  console.log("Clicked");
}

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false
    };
    this.eventDivOnClick = this.eventDivOnClick.bind(this);
  }

  eventDivOnClick(e) {
    e.preventDefault();
    this.setState({
      showComponent: true
    });
    console.log("Clicked");
  }

  render() {
    return (
      <div className="Box" onClick={eventDivOnClick}>
        {this.state.showComponent ? <GameModule /> : null}
      </div>
    );
  }
}

export default Box;
