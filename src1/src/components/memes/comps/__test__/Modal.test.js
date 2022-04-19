import React from "react";
import { render, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import renderer from "react-test-renderer";
import Modal from "../Modal";


it("renders without problem", ()=>{
    const div = document.createElement("div");
    render(<Modal></Modal>, div)
})
