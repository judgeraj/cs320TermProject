import React, { useState, useEffect } from "react";
import { Edit } from "@material-ui/icons";

import EditBio from "./EditBio";
import database from "../../firebase/firebase";

import "./styles/Bio.css";
import "./styles/UserProfile.css";
import { getContrastRatio } from "@material-ui/core";

function Bio(props) {
  // const [bioInfo, setBioInfo] = useState({
  //   about: "I love sunshine and popsicles",
  // });
  const [bioInfo, setBioInfo] = useState({});
  const [updatedBioInfo, setUpdatedBioInfo] = useState(bioInfo);
  const [showEditBio, setShowEditBio] = useState(false);

  const getBio = () => {
    console.log(`getBio: keys = ${Object.keys(bioInfo).length}`);
    if (Object.keys(bioInfo).length === 0) {
      console.log("bio is empty");
      const newBioInfo = {
        name: props.user.displayName,
        about: "",
      };
      database.collection("bios").add(newBioInfo);
      setBioInfo(newBioInfo);
    }
  };

  useEffect(() => {
    let bioFound = false;
    database.collection("bios").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(`doc.data().name = ${doc.data().name}`);
        if (doc.data().name === props.user.displayName) {
          bioFound = true;
          setBioInfo(doc.data());
          console.log(doc.data().name, props.user.displayName);
        }
      });
    });
    if (!bioFound) {
      getBio();
    }
  }, []);

  //getBio();

  function updateBioAbout(event) {
    setUpdatedBioInfo({ ...bioInfo, about: event.target.value });
  }

  function updateBio(saveUpdatedBio) {
    if (saveUpdatedBio) {
      setBioInfo(updatedBioInfo);
      database.collection("bios").onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          if (doc.data().name === props.user.displayName) {
            database.collection("bios").doc(doc.id).update({
              about: updatedBioInfo.about,
            });
          }
        });
      });
    } else {
      setUpdatedBioInfo(bioInfo);
    }
  }

  return (
    <div className="info">
      <div className="info-bio">
        <h3>About</h3>
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
    </div>
  );
}

export default Bio;
