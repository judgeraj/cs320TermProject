import React from "react";

function Inputform(props) {
  return (
    <form>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <input type="submit" value="submit" />
    </form>
  );
}

export default Inputform;
