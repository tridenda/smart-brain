import { useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { connect } from "react-redux";

import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import Rank from "../components/Rank/Rank";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import "./App.css";

import { setImageLinkInput } from "../actions";

const mapStateToProps = (state) => {
  return { imageLinkInput: state.imageLinkInput };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onImageLinkInputChange: (event) => {
      dispatch(setImageLinkInput(event.target.value));
    },
  };
};

const particlesInit = async (main) => {
  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  // starting from v2 you can add only the features you need reducing the bundle size
  await loadFull(main);
};

// This option is for customize animation background
const options = {
  background: {
    color: {
      value: "#000",
    },
    opacity: 0.3,
  },
  particles: {
    links: {
      distance: 150,
      enable: true,
      triangles: {
        enable: false,
        opacity: 0.05,
      },
    },
    move: {
      enable: true,
      speed: 2,
    },
    size: {
      value: 2,
    },
    shape: {
      type: "circle",
    },
  },
};

const App = ({ imageLinkInput, onImageLinkInputChange }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });
  const [isSignedIn, setIsSignedIn] = useState(false);

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
      leftCol: clarifaiFace.left_col * width,
    };
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const onPictureSubmit = () => {
    setImageUrl(imageLinkInput);
    fetch("https://trd2022-smartbrain-api.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: imageLinkInput,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://trd2022-smartbrain-api.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((respone) => respone.json())
            .then((count) => {
              setUser(Object.assign(user, { entries: count }));
            });
        }

        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setImageUrl("");
      setBox({});
      setRoute("");
      setUser({
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      });
    } else if (route === "home") {
      setIsSignedIn(true);
    }

    setRoute(route);
  };

  return (
    <div className="App">
      <Particles className="particles" init={particlesInit} options={options} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onImageLinkInputChange={onImageLinkInputChange}
            onPictureSubmit={onPictureSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </>
      ) : route === "signin" ? (
        <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <SignUp onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
