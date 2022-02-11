import React from 'react'
import './Sidebar.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'; //dropdown icon
function Sidebar() {
  return (
    <div className="Sidebar">
        <h2>Hello World</h2>

        <div className="sidebar_Top">
            <h3>Discussion Board</h3>
            <ExpandMoreIcon />

        </div>
    </div>
  );
}

export default Sidebar