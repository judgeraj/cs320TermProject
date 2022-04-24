import React from "react";

function MovieItem(props) {
  return (
    <tr>
      <td className="movie-title">{props.title}</td>
      <td>&emsp;&emsp;&emsp;{props.liked ? "Liked" : "DisLiked"}</td>
    </tr>
  );
}

export default MovieItem;
