import React from 'react';
import { useEffect } from 'react';
import useStorage from '../hooks/useStorage';
import './memes.css';

const ProgressBar = ({ file, setFile }) => {
    const { url, progress } = useStorage(file);
    console.log(progress, url);

    useEffect( () => {
        if(url) {
            setFile(url);
        }
    }, [url, setFile])

    
    return (
        <div className="progress-bar" style={{ width: progress + '%'}}></div>

    )

}

export default ProgressBar;