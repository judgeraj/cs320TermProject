import React, { useState, useEffect } from "react";
import "./SwipeButtons.css";

const StreamButtons= () => {
    return (
        <div className="streamButtons"> 
            <button class="buttonIcons">
                <img
                    className="netflix"
                    src="https://cdn.iphoneincanada.ca/wp-content/uploads/2016/06/netflix-logo-branding.png" 
                    alt ="netflix logo"
                    />
            </button>
            <button class="buttonIcons">
                <img
                    className="hulu"
                    src="https://download.logo.wine/logo/Hulu/Hulu-Logo.wine.png" 
                    alt ="hulu logo"
                    />  
            </button>
            <button class="buttonIcons"> 
                <img
                    className="disney"
                    src="http://assets.stickpng.com/images/6128ffaee3a15c00041a8e41.png" 
                    alt ="disney logo"
                    />
            </button>
            <button class="buttonIcons">
                <img
                    className="amazon"
                    src="https://i.pinimg.com/originals/87/70/5a/87705a2ddfc57918abcc7bdb574aec94.png" 
                    alt ="amazon logo"
                    />
            </button>
            <button class="buttonIcons">
                <img
                className="hbo"
                src="https://cdn-icons-png.flaticon.com/512/5968/5968668.png" 
                alt ="hbo logo"
            />
            </button>
     </div>
    );
};
export default StreamButtons
