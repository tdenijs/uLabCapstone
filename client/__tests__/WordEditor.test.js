import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import WordEditor from '../src/components/WordEditor.js';

it('WordEditor renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WordEditor />, div);
});

