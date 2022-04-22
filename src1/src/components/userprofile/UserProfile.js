import React, { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import GoogleProfile from "./GoogleProfile";
import Bio from "./Bio";

// need function to get bio from database

function UserProfile() {
  const [userInfo, setUserInfo] = useState(0);
  
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserInfo(user);
    }
  });

  console.log(userInfo);
  // call database for bio thru function above
  const userBio = {};

  return (
    <div>
      <GoogleProfile userInfo={userInfo} />
      <Bio userBio={userBio} /> {/*pass bio from func call above down to Bio*/}
    </div>
  );
}

export default UserProfile;
