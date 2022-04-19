import React from "react";
import { render, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import renderer from "react-test-renderer";
import MouseMove from "../MouseMove";
import Title from "../Title";

describe('Checks the title component', () => {
    
    it('checks the value of the Title component', () => {
        const { getByText } = render(<Title />);
        const titleValue = getByText('Karo')
        expect(titleValue).toHaveTextContent('Karo')
    })

    it('checks the value of the Title component', () => {
        const { getByText } = render(<Title />);
        const titleValue = getByText('Meme Review')
        expect(titleValue).toHaveTextContent('Meme Review')
    })

})