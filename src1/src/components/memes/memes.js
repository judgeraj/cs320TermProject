import React, { useState } from 'react';
import Title from './comps/Title';
import UploadForm from './comps/UploadForm';
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal';
import MouseMove from './comps/MouseMove';
import Button from './comps/button/button';
import WriteText from './comps/WriteText';

function Memes() {

  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="MemesApp">
      <Title/>
      <UploadForm />
      <br></br>
      <ImageGrid setSelectedImg={ setSelectedImg } />
      { selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
      
      <br></br>
        <WriteText />
      <br></br>
        <MouseMove />
    </div>
  );
}

export default Memes;