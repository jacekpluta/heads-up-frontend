import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

import { HeaderStyle } from "../../styles/Layout";

function Header(props) {
  const { handleMuteSounds, muteSounds } = props;

  return (
    <HeaderStyle>
      {!muteSounds ? (
        <FontAwesomeIcon
          onClick={handleMuteSounds}
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
          onClick={handleMuteSounds}
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
