import React, { Component } from "react";
import GameModule from "./GameModule";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function eventDivOnClick(e) {
  e.preventDefault();
  console.log("Clicked");
}

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      startSecondCounter: false
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
      <Router>
        <div className="Box" onClick={eventDivOnClick}>
          <Link to="/GameModule">Start</Link>

          <Switch>
            <Route path="/GameModule">
              <GameModule />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
//{this.state.showComponent ? <GameModule /> : null}
export default Box;
