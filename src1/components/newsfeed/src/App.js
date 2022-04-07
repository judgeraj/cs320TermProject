import React, { Component } from 'react'
import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
    return (
        <> 
            <Router>
                <Sidebar />
                <switch>
                    <Route path='/' />
                </switch>
            </Router>
       </>
    );
}

export default App;