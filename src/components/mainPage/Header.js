import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { HeaderStyle } from "../../styles/Layout";
import { MuteSoundContext } from "../../contex/MuteSoundContext";
import Button from "@material-ui/core/Button";

import buttonClick from "../../sounds/buttonClick.mp3";
import UIfx from "uifx";
//SOUDS
const clickSound = new UIfx(buttonClick, {
  volume: 1,
  throttleMs: 100,
});

function Header() {
  const { muteSound, setMuteSound } = useContext(MuteSoundContext);
  let history = useHistory();

  const handleLogin = () => {
    clickSound.play();
    setTimeout(() => {
      history.push("/login");
    }, 200);
  };

  const handleMuteSound = () => {
    if (!muteSound) {
      clickSound.play();
    }
    setMuteSound(!muteSound);
  };

  const handlePlayersCategories = () => {
    clickSound.play();
    setTimeout(() => {
      history.push("/playersCategories");
    }, 200);
  };

  const buttonStyle = {
    float: "right",
    marginLeft: "5px",
  };

  const volumeButtonStyle = {
    float: "top-left",
    marginLeft: "2%",
    marginTop: "33px",
    backgroundColor: "#1b85ff",
    borderColor: " #1b63ff",
    borderStyle: "ridge",
    borderRadius: "15px",
    borderWidth: "4px",
    padding: "3px",
  };
  return (
    <HeaderStyle>
      {!muteSound ? (
        <FontAwesomeIcon
          onClick={handleMuteSound}
          icon={faVolumeMute}
          size="2x"
          color="white"
          style={{
            float: "bottom-left",
            marginLeft: "10px",
            marginTop: "10px",
            backgroundColor: "#1b85ff",
            borderColor: " #1b63ff",
            borderStyle: "ridge",
            borderRadius: "15px",
            borderWidth: "4px",
            padding: "3px",
          }}
        />
      ) : (
        <FontAwesomeIcon
          onClick={handleMuteSound}
          icon={faVolumeUp}
          size="2x"
          color="white"
          style={volumeButtonStyle}
        />
      )}
      <Button
        size="small"
        variant="contained"
        style={buttonStyle}
        color="primary"
        onClick={handlePlayersCategories}
      >
        All Players Categories
      </Button>

      <Button
        size="small"
        style={buttonStyle}
        variant="contained"
        color="secondary"
        onClick={handleLogin}
      >
        Your Categories
      </Button>
    </HeaderStyle>
  );
}

export default Header;
