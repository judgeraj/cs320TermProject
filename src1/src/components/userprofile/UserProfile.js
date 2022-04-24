import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import GoogleProfile from "./GoogleProfile";
import Bio from "./Bio";
import Activity from "./Activity";

function UserProfile() {
  const [googleInfo, setGoogleInfo] = useState({});

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setGoogleInfo(user);
      }
    });
  }, [googleInfo]);

  return (
    <div>
      <GoogleProfile userInfo={googleInfo} />
      <Bio uid={googleInfo.uid} />
      <Activity />
    </div>
  );
}

export default UserProfile;
