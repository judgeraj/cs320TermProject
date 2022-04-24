import React from "react";
import { Edit } from "@material-ui/icons";

import "./styles/GoogleProfile.css";
import "./styles/UserProfile.css";

function GoogleProfile(props) {
  // edit their google profile or add background picture
  const editButtonHandler = () => {
    //console.log("Click happened");
  };

  return (
    <div className="info">
      <div className="info-main">
        <img src={props.userInfo.photoURL} alt="Google User"></img>
        <h2>{props.userInfo.displayName}</h2>
        <p>{props.userInfo.email}</p>
        <div className="edit">
          <Edit onClick={editButtonHandler()} />
        </div>
      </div>
    </div>
  );
}

export default GoogleProfile;
