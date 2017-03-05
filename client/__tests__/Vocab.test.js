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
import { mount, shallow } from 'enzyme';
import Vocab from '../src/components/Vocab';

it('Vocab component shallow renders without crashing', () => {
    let add = jest.fn();
    shallow(<Vocab add={add}/>);
});

describe("Test suite for mounted Vocab", () => {
    let vocab;
    let add;

    beforeEach(() => {
        add = jest.fn();
      vocab = mount(<Vocab cols={
            [
                {
                    order: 1,
                    title: "pronoun",
                    words: [{id: "1", word:"love", symbol_path:"", alt:""}]},
                {
                    order: 2,
                    title: "noun",
                    words: [{id: "1", word:"love", symbol_path:"", alt:""}]},
                {
                    order: 3,
                    title: "verb",
                    words: [{id: "1", word:"love", symbol_path:"", alt:""}]},
                {
                    order: 4,
                    title: "adjective",
                    words: [{id: "1", word:"love", symbol_path:"", alt:""}]},
                {
                    order: 5,
                    title: "adverb",
                    words: [{id: "1", word:"love", symbol_path:"", alt:""}]},
                {
                    order: 6,
                    title: "preposition",
                    words: [{id: "1", word:"love", symbol_path:"", alt:""}]},
                {
                    order: 7,
                    title: "exclamation",
                    words: [{id: "1", word:"love", symbol_path:"", alt:""}]},
            ]
        } add={add} selectedVoice="Default" />);
    });

    it('The vocab columns display in the correct order', () => {
        // Get each column
        const col1 = vocab.find('Column').at(0);
        const col2 = vocab.find('Column').at(1);
        const col3 = vocab.find('Column').at(2);
        const col4 = vocab.find('Column').at(3);
        const col5 = vocab.find('Column').at(4);
        const col6 = vocab.find('Column').at(5);
        const col7 = vocab.find('Column').at(6);

        // Expect each column to have the correct title
        expect(col1.props().title).toEqual('pronoun');
        expect(col2.props().title).toEqual('noun');
        expect(col3.props().title).toEqual('verb');
        expect(col4.props().title).toEqual('adjective');
        expect(col5.props().title).toEqual('adverb');
        expect(col6.props().title).toEqual('preposition');
        expect(col7.props().title).toEqual('exclamation');
    });
});
