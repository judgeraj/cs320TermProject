import React from "react";
import "./Header.css";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link, useNavigate } from "react-router-dom";

function Header({ backButton }) {
  const history = useNavigate();
  return (
    <div className="movieheader">
      {backButton /*if there's a back button do the first icon else do the second icon*/ ? (
        <IconButton onClick={() => history.replace(backButton)}>
          {" "}
          {/*returns browser history*/}
          <ArrowBackIosIcon className="movieheader__icon" fontSize="large" />
        </IconButton>
      ) : (
        <IconButton>
          <PersonIcon className="header__icon" fontSize="large" />
        </IconButton>
      )}
      <Link to="/">
        <img
          className="movieheader__logo"
          src="https://encrypted-tbn0.gstatic.com/
                images?q=tbn:ANd9GcTEm4VZR2_hPhWE5aJITIDJvmkHqao_Eg1V6A&usqp=CAU"
          alt="karo logo"
        />
      </Link>
      <Link to="/friends">
        <IconButton>
          <GroupIcon className="header__icon" fontSize="large" />
        </IconButton>
      </Link>
    </div>
  );
}
export default Header;
