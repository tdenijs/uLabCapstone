import React from 'react';
import { shallow, mount } from 'enzyme';
import SettingsBar from '../src/components/SettingsBar';

it('SettingsBar renders without crashing', () => {
    shallow(<SettingsBar />);
});

describe("Test suite for mounted SettingsBar", () => {
    let bar;
    let onChange;

    beforeEach(() => {
        onChange = jest.fn();
        bar = mount(<SettingsBar selectedLanguage="English" updateLanguage={onChange}
                    settingsLocked={false} lockToggle={onChange}/>);
    });

    it('SettingsBar calls updateLanguage function when the drop down menu changes', () => {
        bar.find('select').simulate('change');
        expect(onChange).toBeCalled();
    });

    it('SettingsBar calls lockToggle function when the lock checkbox is clicked', () => {
        bar.find('input').simulate('change');
        expect(onChange).toBeCalled();
    });
});
