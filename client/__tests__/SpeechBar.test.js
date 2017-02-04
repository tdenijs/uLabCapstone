import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import SpeechBar from '../src/components/SpeechBar.js';
import speechSynthesis from '../src/mocks';

// global.speechSynthesis = {
//     getVoices: () => {
//         return [{ name: "Google UK English Male" }, { name: "Google UK English Female" }];
//     }
// };

it('SpeechBar renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SpeechBar message={["hello", "friend"]} />, div);
});

describe("Test suite for mounted SpeechBar", () => {
    let bar;
    let onChange;

    beforeEach(() => {
        onChange = jest.fn();
        bar = mount(<SpeechBar message={[]} handleClearMessage={onChange}/>);
    });

    it('SpeechBar calls handleClearMessage function when the clear button is clicked', () => {
        bar.find('#clearButton').first().simulate('click');
        expect(onChange).toBeCalled();
    });
});
