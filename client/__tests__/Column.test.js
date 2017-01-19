import React from 'react';
import { shallow, mount } from 'enzyme';
import Column from '../src/components/Column';

it('Grid component shallow renders without crashing', () => {
    shallow(<Column />);
});