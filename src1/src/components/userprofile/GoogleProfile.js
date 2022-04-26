import React from "react";
import { Edit } from "@material-ui/icons";

import "./styles/GoogleProfile.css";
import "./styles/UserProfile.css";

function GoogleProfile(props) {
  // edit their google profile or add background picture
  const editButtonHandler = () => {
    console.log("Clicked, edit the user's google profile");
  };

  return (
    <div className="info-main">
      <img src={props.user.photo} alt="Google User"></img>
      <h1>{props.user.displayName}</h1>
      {/* <p>{props.user.email}</p> */}
      <div className="edit">
        <Edit onClick={editButtonHandler} />
      </div>
    </div>
  );
}

export default GoogleProfile;
