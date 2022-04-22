import React from "react";

import "./styles/GoogleProfile.css";

function GoogleProfile(props) {
  return (
    <div className="info">
      <div className="main">
        <h1>{props.userInfo.displayName}</h1>
        <p>{props.userInfo.email}</p>
      </div>
      <img
        src={props.userInfo.photoURL}
        alt="Google User"
        className="img img-center"
      ></img>
    </div>
  );
}

export default GoogleProfile;
