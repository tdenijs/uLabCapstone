import React from 'react';
import { shallow } from 'enzyme';
import Column from '../src/components/Column';

it('Column component shallow renders without crashing', () => {
    let add = jest.fn();
    shallow(<Column add={add}/>);
});