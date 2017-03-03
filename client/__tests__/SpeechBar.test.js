/*******************************************************************
 * Copyright (c) 2016 Portland State University CS Capstone Team
 *
 * Authors: Siggy Hinds, Jiaqi Luo, Christopher Monk, Tristan de Nijs,
 *                 Simone Talla Silatchom, Carson Volker, Anton Zipper
 *
 * This file is part of uLabCapstone, distributed under the MIT
 * open source licence. For full terms see the LICENSE.md file
 * included in the root of this project.
 *
 *******************************************************************/

import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import SpeechBar from '../src/components/SpeechBar.js';
import speechSynthesis from '../src/mocks';

it('SpeechBar renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SpeechBar message={["hello", "friend"]} />, div);
});

describe("Test suite for mounted SpeechBar", () => {
    let bar;
    let onChange;

    beforeEach(() => {
        onChange = jest.fn();
        bar = mount(<SpeechBar message={['love']} handleClearMessage={onChange} handleBackButton={onChange} settingsToggle={onChange}/>);
    });

    it('SpeechBar calls handleClearMessage function when the clear button is clicked', () => {
        bar.find('.ClearButton').first().simulate('click');
        expect(onChange).toBeCalled();
    });

    it('SpeechBar calls handleBackButton when the button is clicked', () => {
	bar.find('.BackspaceButton').first().simulate('click');
        expect(onChange).toBeCalled();
    })
;
    it('SpeechBar calls settingsToggle when the button is clicked', () => {
	bar.find('.SettingsButton').first().simulate('click');
        expect(onChange).toBeCalled();
    });
});
