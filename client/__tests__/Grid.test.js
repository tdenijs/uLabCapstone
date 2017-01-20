import React from 'react';
import { shallow } from 'enzyme';
import Grid from '../src/components/Grid';

it('Grid component shallow renders without crashing', () => {
    let add = jest.fn();
    shallow(<Grid add={add}/>);
});