import React, { Component } from "react";
import Tilt from "react-parallax-tilt";

import brain from "./brain.png";
import "./Logo.css";

class Logo extends Component {
  render() {
    return (
      <div className="center ma4 mt0">
        <Tilt className="Tilt br2 shadow-2">
          <div className="Tilt-inner pa3">
            <img src={brain} alt="brain" />
          </div>
        </Tilt>
      </div>
    );
  }
}

export default Logo;
