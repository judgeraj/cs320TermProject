import React, { useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion/dist/framer-motion';
import { FaPizzaSlice } from "react-icons/fa";

const ImageGrid = ({ setSelectedImg }) => {

    const { docs } = useFirestore('images');
    console.log(docs);

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return(
        <div className="img-grid">
        { docs && docs.map(doc => (
            <motion.div className="img-wrap" key={doc.id}
                layout
                whileHover={{ opacity: 1}}
                onClick={() => setSelectedImg(doc.url)}
            > 
            
                
                <motion.img src={doc.url} alt="uploaded pic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                />
                
            </motion.div>
            
        ))}
    
        

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
    )
}

export default ImageGrid;