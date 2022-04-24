import React, { useState, useEffect } from "react";
import { Edit } from "@material-ui/icons";

import EditBio from "./EditBio";
import database from "../../firebase/firebase";

import "./styles/Bio.css";
import "./styles/UserProfile.css";

function Bio(props) {
  // const [bioInfo, setBioInfo] = useState({
  //   about: "I love sunshine and popsicles",
  // });
  const [bioInfo, setBioInfo] = useState({});
  const [updatedBioInfo, setUpdatedBioInfo] = useState(bioInfo);
  const [showEditBio, setShowEditBio] = useState(false);

  const getBio = () => {
    database.collection("bios").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.data().uid === props.uid) {
          setBioInfo(doc.data());
        }
      });
    });
    if (Object.keys(bioInfo).length === 0) {
      const newBioInfo = {
        uid: props.uid,
        about: "",
      };
      database.collection("bios").add(newBioInfo);
      setBioInfo(newBioInfo);
    }
  };

  getBio();

  function updateBioAbout(event) {
    setUpdatedBioInfo({ ...bioInfo, about: event.target.value });
  }

  function updateBio(saveUpdatedBio) {
    if (saveUpdatedBio) {
      setBioInfo(updatedBioInfo);
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
