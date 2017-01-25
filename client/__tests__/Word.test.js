import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Word from '../src/components/Word.js';

it('word renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Word />, div);
});

// describe("Test suite for mounted Word", () => {
//     let word;
//     let add;
//
//     beforeEach(() => {
//         add = jest.fn();
//         word = mount(<Word text="love" symbol="love" add={add} />);
//     });
//
//     // SpeechSynthesisUtterance breaks this
//     it('Word calls addWordToSpeechBar function when the word is clicked', () => {
//         word.find('button').simulate('click');
//         expect(add).toBeCalled();
//     });
// });