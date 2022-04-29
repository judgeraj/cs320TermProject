import React, { useState, useEffect } from "react";
import { Class } from "@material-ui/icons";

// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

import Friends from "./Friends";
import GoogleProfile from "./GoogleProfile";
import Bio from "./Bio";
import Activity from "./Activity";
import Suggestions from "./Suggestions";

function UserProfile() {
  // const [googleInfo, setGoogleInfo] = useState({});

  const user = useSelector(selectUser);

  /*
   * Refactored: instead use the user object stored in redux
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setGoogleInfo(user);
      }
    });
  }, [googleInfo]);
  */

  return (
    <div className="profile-table">
      <div className="profile-friends-col">
        <Friends user={user} />
      </div>
      <div className="profile-main-col">
        <GoogleProfile user={user} />
        <Bio user={user} />
        <Activity user={user} />
      </div>
      <div className="profile-suggestions-col">
        <Suggestions user={user} />
      </div>
    </div>
  );
}

export default UserProfile;
