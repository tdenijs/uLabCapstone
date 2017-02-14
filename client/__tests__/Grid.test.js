import React from 'react';
import { mount, shallow } from 'enzyme';
import Grid from '../src/components/Grid';

it('Grid component shallow renders without crashing', () => {
    let add = jest.fn();
    shallow(<Grid add={add}/>);
});

describe("Test suite for mounted Grid", () => {
    let grid;
    let add;

    beforeEach(() => {
        add = jest.fn();
        grid = mount(<Grid cols={
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

    it('The grid columns display in the correct order', () => {
        // Get each column
        const col1 = grid.find('Column').at(0);
        const col2 = grid.find('Column').at(1);
        const col3 = grid.find('Column').at(2);
        const col4 = grid.find('Column').at(3);
        const col5 = grid.find('Column').at(4);
        const col6 = grid.find('Column').at(5);
        const col7 = grid.find('Column').at(6);

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