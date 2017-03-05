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
import { shallow, mount } from 'enzyme';
import WordEditor from '../src/components/WordEditor.js';
import speechSynthesis from '../src/mocks';

it('WordEditor renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WordEditor coreListTitles={["hello", "friend"]} />, div);

//    coreListTitles
});

describe("Test suite for mounted WordEditor", () => {
    let add;
    let close;
    let wordEditor;

    beforeEach(() => {
        add = jest.fn();
        close = jest.fn();
        wordEditor = mount(<WordEditor coreListTitles={["hello", "friend"]}
                            close={close} handleAddNewWord={add} />);
    });

    it('WordEditor calls handleAddNewWord function when add is confirmed', () => {
        // Add a word
        wordEditor.find('.WordTextInput').simulate('change', {target: { value : 'addedWord'}});

        // Click the save button
        const addButton = wordEditor.find('.SaveNewWord').first();
        addButton.simulate('click');
        expect(add).toBeCalled();
    });

    it('WordEditor calls close function when add is canceled', () => {
        // Add a word
        wordEditor.find('.WordTextInput').simulate('change', {target: { value : 'addedWord'}});

        // Click the cancel button
        const cancelButton = wordEditor.find('.CancelNewWord').first();
        cancelButton.simulate('click');
        expect(close).toBeCalled();
    });
});