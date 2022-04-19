import React from "react";
import { render, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import renderer from "react-test-renderer";
import MouseMove from "../MouseMove";


it("renders without problem", ()=>{
    const div = document.createElement("div");
    render(<MouseMove></MouseMove>, div)
})

it("render button without problem", ()=> {
    const {getByTestId} = render(<MouseMove></MouseMove>)
    expect(getByTestId('mmove')).toHaveTextContent("Are you online?")

})




