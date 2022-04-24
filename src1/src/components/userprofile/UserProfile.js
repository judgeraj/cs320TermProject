import React, { useState, useEffect } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

import GoogleProfile from "./GoogleProfile";
import Bio from "./Bio";
//import Activity from "./Activity";

function UserProfile() {
  // const [googleInfo, setGoogleInfo] = useState({});

  const user = useSelector(selectUser);

  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setGoogleInfo(user);
  //     }
  //   });
  // }, [googleInfo]);

  return (
    <div>
      <GoogleProfile user={user} />
      <Bio user={user} />
      {/* <Activity user={user} /> */}
    </div>
  );
}

export default UserProfile;
