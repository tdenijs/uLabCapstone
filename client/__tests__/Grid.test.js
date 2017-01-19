import React from 'react';
import { shallow, mount } from 'enzyme';
import Grid from '../src/components/Grid';

it('Grid component shallow renders without crashing', () => {
    shallow(<Grid />);
});