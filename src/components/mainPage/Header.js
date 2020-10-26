import React from "react";

import { motion } from "framer-motion";
import { HeaderStyle } from "../../styles/Layout";

import HowToPlayPic from "../../pic/HowToPlayPic.jpg";
import { Button, Popup, Grid, Card, Image, Rating } from "semantic-ui-react";

function Header(props) {
  const containerStyle = {
    position: "fixed",
    right: 0,
    top: -50,
    width: "200px",
    height: "auto",
  };

  const containerStyle2 = {
    position: "absolute",
   
    top: -100,
    height: "auto",
  };

  const contextRef = React.useRef();
  return (
    <HeaderStyle>
        <Popup
 flowing
position="top right"
        trigger={<Image   style={containerStyle}src={HowToPlayPic} avatar />}
        style={containerStyle2}
      >

      {/* <Popup
        trigger={<Image src={HowToPlayPic} style={containerStyle} />}
        position="top"
        flowing
   
        // style={containerStyle2}
        hoverable
        wide
        context={contextRef}
      > */}
        <Grid centered divided columns={3}>
          <Grid.Column textAlign="center">
            <p>
              <Button color="blue" size="mini">
                1
              </Button>
            </p>
            <p>Pick game category and game variant</p>
          </Grid.Column>

          <Grid.Column textAlign="center">
            <p>
              <Button color="blue" size="mini">
                2
              </Button>
            </p>
            <p>Place your phone on your forehead</p>
          </Grid.Column>

          <Grid.Column textAlign="center">
            <p>
              <Button color="blue" size="mini">
                3
              </Button>
            </p>
            <p>
              Did u guess codeword? Tilt your phone forward or click "CORRECT"
              button
            </p>
            <p>Do you want to skip current codeword? Click "SKIP" button</p>
          </Grid.Column>
        </Grid>
      </Popup>
      <strong ref={contextRef} style={containerStyle}></strong>
    </HeaderStyle>
  );
}

export default Header;
