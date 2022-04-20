// Image.js - 17 lines
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function Image(props){
    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
        const reader = new FileReader(); // create a file reader object
        reader.readAsDataURL(props.blob); // turns blob into acceptable parameter for src
        reader.onloadend = function (){
            setImageSrc(reader.result);
        }
    }, [props.blob]);

    return (
        <img 
            style={{width: 150, height: "auto"}}
            src={imageSrc}
            alt={props.fileName}
        />
    );
}

export default Image
