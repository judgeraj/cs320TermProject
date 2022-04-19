import React from "react";
import { render, cleanup } from "@testing-library/react";
import Button from "./button";
import '@testing-library/jest-dom/extend-expect';
import renderer from "react-test-renderer";

afterEach(cleanup);

it("render without crashing", ()=> {
    const div=document.createElement("div");
    render(<Button label="click me"></Button>, div)

})


it("render button correctly", ()=> {
    const {getByTestId} = render(<Button label="Are you online?"></Button>)
    expect(getByTestId('button')).toHaveTextContent("Are you online?") 

})

it("render button correctly with new name", ()=> {
    const {getByTestId} = render(<Button label="save"></Button>)
    expect(getByTestId('button')).toHaveTextContent("save") 

})

it("matches snapshot", () => {
    const tree = renderer.create(<Button label="save"></Button>).toJSON();
    expect(tree).toMatchSnapshot();
})
