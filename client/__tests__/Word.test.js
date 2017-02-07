import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Word from '../src/components/Word.js';
import { speechSynthesis, SpeechSynthesisUtterance } from '../src/mocks';

it('word renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Word />, div);
});

describe("Test suite for mounted Word", () => {
    let word;
    let add;

    beforeEach(() => {
        add = jest.fn();
        word = mount(<Word id='1' word="love" src="" alt="" add={add} />);
    });

    it('Word calls addWordToSpeechBar function when the word is clicked', () => {
        word.find('.Word').simulate('click');
        expect(add).toBeCalled();
    });
});