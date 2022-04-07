import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./comps/Home";
import Main from "./comps/Main";
import LogIn from "./comps/LogIn";
import SignUp from "./comps/SignUp";
import { AuthProvider } from "./comps/Auth";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" component={Home} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
