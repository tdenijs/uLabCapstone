import React from 'react';
import { shallow, mount } from 'enzyme';
import SettingsBar from '../src/components/SettingsBar';

it('SettingsBar renders without crashing', () => {
    shallow(<SettingsBar />);
});

describe("Test suite for mounted SettingsBar", () => {
    let bar;
    let onUpdate;

    beforeEach(() => {
        onUpdate = jest.fn();
        bar = mount(<SettingsBar selectedLanguage="English" updateLanguage={onUpdate} />);
    });

    it('SettingsBar calls updateLanguage function when the drop down menu changes', () => {
        bar.find('select').simulate('change');
        expect(onUpdate).toBeCalled();
    });
});
