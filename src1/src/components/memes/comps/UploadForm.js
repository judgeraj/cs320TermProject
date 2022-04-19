import React from 'react';
import { useState } from 'react';
import ProgressBar from './ProgressBar';
import './memes.css';

const UploadForm = () => {
    //file is an useState hook to save the file
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const types = ['image/png', 'image/jpeg'];

    const changeHandler = (e) => {
        //console.log('changed');
        //this is the file user selected, 1st file only
        let selected = e.target.files[0];
        
        if (selected && types.includes(selected.type)) {
            setFile(selected);   //store selected in file 
            setError("");
        } else {
            setFile(null);   //user selected wrong type of file
            setError('Please select an image file (png or jpeg)');
        }   
    }
    
    return(
        <form>
            <input type="file" onChange={changeHandler} />
            <div className="output">
                { error && <div role="alert" className="error">{ error }</div>}
                { file && <div>{ file.name }</div> }
                { file && <ProgressBar file={file} setFile={setFile} /> }
            </div>
        </form>
    )
}

export default UploadForm;