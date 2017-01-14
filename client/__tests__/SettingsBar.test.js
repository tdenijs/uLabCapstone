import React from 'react';
import { shallow } from 'enzyme';
import SettingsBar from '../src/components/SettingsBar';

it('SettingsBar renders without crashing', () => {
    shallow(<SettingsBar />);
});
