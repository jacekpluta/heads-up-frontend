import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

import { HeaderStyle } from "../../styles/Layout";
import { MuteSoundContext } from "../../contex/MuteSoundContext";

import buttonClick from "../../sounds/buttonClick.mp3";
import UIfx from "uifx";
//SOUDS
const clickSound = new UIfx(buttonClick, {
  volume: 1,
  throttleMs: 100,
});

function Header() {
  const { muteSound, setMuteSound } = useContext(MuteSoundContext);

  const handleMuteSound = () => {
    if (!muteSound) {
      clickSound.play();
    }
    setMuteSound(!muteSound);
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
            float: "left",
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
          style={{
            float: "left",
            marginLeft: "2%",
            marginTop: "33px",
            backgroundColor: "#1b85ff",
            borderColor: " #1b63ff",
            borderStyle: "ridge",
            borderRadius: "15px",
            borderWidth: "4px",
            padding: "3px",
          }}
        />
      )}
    </HeaderStyle>
  );
}

export default Header;
