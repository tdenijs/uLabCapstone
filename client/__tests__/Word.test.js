import React from 'react';
import ReactDOM from 'react-dom';
import Word from '../src/components/Word.js';

it('word renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Word />, div);
});