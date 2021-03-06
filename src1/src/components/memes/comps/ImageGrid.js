import React, { useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';
import { FaPizzaSlice } from "react-icons/fa";
import './memes.css';

const ImageGrid = ({ setSelectedImg }) => {

    const { docs } = useFirestore('images');
    
    const [rating, setRating] = useState(null);
    const [rating1, setRating1] = useState(null);
    const [hover, setHover] = useState(null);
  

    return(
        <div className="polariod">
        { docs && docs.map(doc => (
            <motion.div className="img-wrap3" key={doc.id}
                layout
                whileHover={{ opacity: 1}}
                onClick={() => setSelectedImg(doc.url)}
            > 
            
                <motion.img src={doc.url} alt="uploaded pic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                />

                <br></br>
                <div className='container2'>
                <ratings>
            
                    {[...Array(5)].map((pizza, i) => {
                    const ratingValue = i + 1;
                

                    return (
                    <label>
                    <input
                    type="radio" 
                    name = "rating"
                    value = {ratingValue}
                    onClick={ () => setRating(ratingValue)}
                    onMouseEnter
                    />
                    <FaPizzaSlice 
                    className ="pizza"
                    color = {ratingValue <= (hover || rating) ? "#cc0000" : "#e4e5e9"} 
                    size={23} 
                    onMouseEnter = {() => setHover(ratingValue)}
                    onMouseLeave = {() => setHover(null)}
                    />
                    </label>
                    );
                    })}
        
                </ratings>
                </div>
        
            
            </motion.div>

        ))}
    
        </div>
    )
}

export default ImageGrid;