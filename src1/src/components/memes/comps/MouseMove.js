import React, { Component } from "react";
import './memes.css';

class MouseMove extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseMoving: false,
    };

    this.setMouseMove = this.setMouseMove.bind(this);
  }

  setMouseMove(e) {
    e.preventDefault();
    this.setState({ mouseMoving: true });

    let timeout;
    (() => {
      clearTimeout(timeout);
      timeout = setTimeout(() => this.setState({ mouseMoving: false }), 3000);
    })();
  }

  render() {
    const scrollButtonStyle = {
      visibility: this.state.mouseMoving ? "visible" : "hidden",
      //color: "green",
      backgroundColor: "green",
    };

    return (
      <div data-testid="mmove" onMouseMove={(e) => this.setMouseMove(e)}>
        <h1>Are you online?</h1>
        <button style={scrollButtonStyle}>You are online</button>
        &nbsp;&nbsp;&nbsp;
        <button style={scrollButtonStyle}>You are online</button>
        &nbsp;&nbsp;&nbsp;
        <button style={scrollButtonStyle}>You are online</button>
      </div>
    );
  }
}

export default MouseMove;
