import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../firebase/config";
import Title from './Title';
import UploadForm from './UploadForm';
import ImageGrid from './ImageGrid';
import Modal from './Modal';
import MouseMove from './MouseMove';
import WriteText from "./CommentText";
import './memes.css';


const Main = () => {

    const [selectedImg, setSelectedImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="App">
      <Title/>
      <UploadForm />
      <ImageGrid setSelectedImg={ setSelectedImg } />
      { selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
      <br></br>
        <MouseMove />
      <br></br>
        <WriteText />
    </div>
  );
};

export default Main;