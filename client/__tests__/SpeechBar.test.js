import React from 'react';
import ReactDOM from 'react-dom';
import SpeechBar from '../src/components/SpeechBar.js';

it('SpeechBar renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SpeechBar message={["hello", "friend"]} />, div);
});
