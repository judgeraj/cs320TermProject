import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import database from "./../firebase/firebase";

function HomePage() {
  const user = useSelector(selectUser);
  useEffect(() => {
    addUser();
  }, []);

  const addUser = () => {
    const userName = database.collection("users").doc(user.displayName);
    userName.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        userName.onSnapshot((doc) => {
          // do stuff with the data
        });
      } else {
        userName.set({
          photo: user.photo,
        });
      }
    });
  };
  return (
    <>
      <h3>Homepage... what should go here?</h3>
    </>
  );
}

export default HomePage;
