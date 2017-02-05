import React from 'react';
import { shallow, mount } from 'enzyme';
import SettingsBar from '../src/components/SettingsBar';
import speechSynthesis from '../src/mocks';

it('SettingsBar renders without crashing', () => {
    shallow(<SettingsBar />);
});

describe("Test suite for mounted SettingsBar", () => {
    let bar;
    let onChange;

    beforeEach(() => {
        onChange = jest.fn();
        bar = mount(<SettingsBar selectedVoice="Default" updateVoice={onChange}
                    settingsLocked={false} lockToggle={onChange}
                    buttonSize="5" resizeButton={onChange}/>);
    });

    it('SettingsBar calls updateVoice function when the drop down menu changes', () => {
        bar.find('.VoiceMenu').simulate('change');
        expect(onChange).toBeCalled();
    });

    it('SettingsBar calls lockToggle function when the lock checkbox is clicked', () => {
        bar.find('.LockCheck').first().simulate('change');
        expect(onChange).toBeCalled();
    });

    it('SettingsBar calls reSize function when the button size slider is changed', () => {
        bar.find('.ButtonSizeSlider').first().simulate('change');
        expect(onChange).toBeCalled();
    });
});
