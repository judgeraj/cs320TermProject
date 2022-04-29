import React, { useState, useEffect } from "react";
import { Edit } from "@material-ui/icons";
import { DialogContent, getContrastRatio } from "@material-ui/core";

import EditBio from "./EditBio";
import database from "../../firebase/firebase";

import "./styles/Bio.css";
import "./styles/UserProfile.css";

function Bio(props) {
  // const [bioInfo, setBioInfo] = useState({
  //   about: "I love sunshine and popsicles",
  // });
  const [bioInfo, setBioInfo] = useState({});
  const [updatedBioInfo, setUpdatedBioInfo] = useState({});
  const [showEditBio, setShowEditBio] = useState(false);

  /*
   * Refactored to use a promise instead of a callback to
   * get the database snapshot
  useEffect(() => {
    console.log("inside useEffect");
    database.collection("bios").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(
          `looping through docs: doc.data().name = ${doc.data().name}`
        );
        if (doc.data().name === props.user.displayName) {
          setBioInfo((bioInfo) => ({
            ...bioInfo,
            name: doc.data().name,
            about: doc.data().about,
          }));
          console.log(doc.data().name, props.user.displayName);
        }
      });
    });
  }, [props.user.displayName]);
  */

  useEffect(() => {
    async function fetchBio() {
      console.log("inside useEffect");
      const biosRef = database.collection("bios");
      const biosSnapshot = await biosRef.get();
      biosSnapshot.forEach((doc) => {
        console.log(`doc.data().name = ${doc.data().name}`);
        if (doc.data().name === props.user.displayName) {
          setBioInfo(doc.data());
          setUpdatedBioInfo(doc.data());
        }
      });
    }
    fetchBio();
  }, []);

  function updateBioAbout(event) {
    setUpdatedBioInfo({ ...bioInfo, about: event.target.value });
  }

  function updateBio(saveUpdatedBio) {
    if (saveUpdatedBio) {
      /* debugging updating and saving to the database
      console.log("before updatihng bioinfo");
      console.log(bioInfo.about);
      console.log(updatedBioInfo.about);
      */
      setBioInfo(updatedBioInfo);
      /*
      console.log("aftter updating bioinfo");
      console.log(bioInfo.about);
      console.log(updatedBioInfo.about);
      */

      /* refactored, instead of checking if the document needs
       * to be added or updated, just merge the updated fields in
      if (Object.keys(bioInfo).length === 0) {
        console.log("bio is empty");
        const newBioInfo = {
          name: props.user.displayName,
          about: "",
        };
        database.collection("bios").add(newBioInfo);
        setBioInfo((bioInfo) => ({
          ...bioInfo,
          name: newBioInfo.name,
          about: newBioInfo.about,
        }));
      }
      */
      console.log("saving the updated bio");
      console.log(
        `name: ${props.user.displayName}  => about: ${bioInfo.about}`
      );
      database.collection("bios").doc(props.user.displayName).set(
        {
          name: props.user.displayName,
          about: updatedBioInfo.about,
        },
        { merge: true }
      );
    } else {
      setUpdatedBioInfo(bioInfo);
    }
  }

  return (
    <div className="info-bio">
      <h3>About</h3>
      <hr />
      <p>{bioInfo.about}</p>
      <div className="edit">
        <Edit
          onClick={() => {
            setShowEditBio(true);
          }}
        />
      </div>
      <EditBio
        trigger={showEditBio}
        setTrigger={setShowEditBio}
        clickHandler={updateBio}
      >
        <h3>Edit Bio</h3>
        <form>
          <textarea
            type="text"
            onChange={updateBioAbout}
            value={updatedBioInfo.about}
            rows="8"
          ></textarea>
        </form>
      </EditBio>
    </div>
  );
}

export default Bio;
