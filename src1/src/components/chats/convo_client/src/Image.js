// Image.js - 16 lines + 2 doc comments
import React from "react";
import {useState} from "react";
import {useEffect} from "react";

/* taking in the properties specified, a file reader is used to reformat
   the blob and return the image. */
function Image(props){
    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
        const reader = new FileReader(); // create a file reader object
        reader.readAsDataURL(props.blob); // turns blob into acceptable parameter for src
        reader.onloadend = function (){
            setImageSrc(reader.result);
        }
    }, [props.blob]);

    return ( // return the formatted image
        <img 
            style={{width: 150, height: "auto"}}
            src={imageSrc}
            alt={props.fileName}
        />
    );
}

export default Image
