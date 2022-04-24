import React from "react";

import "./styles/UserProfile.css";

function EditBio(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button
          className="save-btn"
          onClick={() => {
            props.setTrigger(false);
            props.clickHandler(true);
          }}
        >
          Save
        </button>
        <button
          className="cancel-btn"
          onClick={() => {
            props.setTrigger(false);
            props.clickHandler(false);
          }}
        >
          Cancel
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default EditBio;
