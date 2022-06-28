import React, { Component } from "react";
import "./ImageLinkForm.css";

class ImageLinkForm extends Component {
  render() {
    return (
      <>
        <p className="f3">
          {
            "This Magin Brain will detect faces in your pictures. Give it a try!"
          }
        </p>
        <div className="center">
          <div className="form center pa4 br3 shadow-5">
            <input className="f4 pa2 w-70" type="text" />
            <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">
              Detect
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ImageLinkForm;
