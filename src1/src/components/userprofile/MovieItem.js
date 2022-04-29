import React from "react";

import "./styles/Movies.css";

function MovieItem(props) {
  return (
    <>
      <div className="movie-title">{props.title}</div>
      {/* <div>&emsp;&emsp;&emsp;{props.liked ? "Liked" : "DisLiked"}</div> */}
    </>
  );
}

export default MovieItem;
