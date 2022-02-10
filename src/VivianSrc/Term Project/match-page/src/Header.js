import React from "react";
import "./Header.css";
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import IconButton from '@material-ui/core/IconButton';

function Header() {
    return (
        //BEM
        <div className="header">
            <IconButton>
                <PersonIcon className="header__icon" fontSize="large"/>
            </IconButton>
            
            <img
                className="header__logo"
                src="https://encrypted-tbn0.gstatic.com/
                images?q=tbn:ANd9GcTEm4VZR2_hPhWE5aJITIDJvmkHqao_Eg1V6A&usqp=CAU" 
                alt ="karo logo"
            />
            <IconButton>
                <GroupIcon className="header__icon" fontSize="large"/>
            </IconButton>
            
        </div>
    )
}

export default Header;