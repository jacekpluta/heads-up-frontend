import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faVolumeUp,
//   faQuestionCircle,
// } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { HeaderStyle } from "../../styles/Layout";
// import { MuteSoundContext } from "../../contex/MuteSoundContext";

// import { clickSound } from "../Sounds";
// import HowToPlay from "./HowToPlay";
import HowToPlayPic from "../../pic/HowToPlayPic.jpg";
import { Button, Popup, Grid , Card, Image, Rating } from "semantic-ui-react";

function Header(props) {
  // const { muteSound, setMuteSound } = useContext(MuteSoundContext);
  // const [showHowToPlay, setShowHowToPlay] = useState(false);
  // const handleMuteSound = () => {
  //   if (!muteSound) {
  //     clickSound.play();
  //   }
  //   setMuteSound(!muteSound);
  // };

  // const volumeButtonStyle = {
  //   float: "top-left",
  //   marginLeft: "2%",
  //   marginTop: "33px",
  //   backgroundColor: "#1b85ff",
  //   borderColor: " #1b63ff",
  //   borderStyle: "ridge",
  //   borderRadius: "15px",
  //   borderWidth: "4px",
  //   padding: "3px",
  // };

  const containerStyle = {
    position: "absolute",
    right: 0,
    width: "90px",
    top: "100px",
  };
  
  const containerStyle2 = {
       right: 0,
    top: "60px",
  };

  const contextRef = React.useRef();
  return (
    <HeaderStyle>
      <Popup
        trigger={

          <Image  src={HowToPlayPic} style={containerStyle}   />
       

          // <motion.img
          //   whileHover={{ scale: 1.2 }}
          //   whileTap={{
          //     scale: 0.95,
          //   }}
          //   src={HowToPlayPic}
          //   alt="How To Play"
          //   style={containerStyle}
   
          // />
        }
        position="top right"
        flowing
        style={containerStyle2}
        hoverable
        wide
        context={contextRef}
      >
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
