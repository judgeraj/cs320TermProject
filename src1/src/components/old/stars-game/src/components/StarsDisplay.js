import React from "react";

function StarsDisplay(props) {
  const stars = Array.from({ length: props.count }, (_, i) => 1 + i);
  return (
    <>
      {stars.map((starId) => (
        <div key={starId} className="star" />
      ))}
    </>
  );
}

export default StarsDisplay;
