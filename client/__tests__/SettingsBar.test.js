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
                    settingsLocked={false} enableEditorMode={onChange} lockToggle={onChange}
                    buttonSize="5" resizeButton={onChange}/>);
    });

    it('SettingsBar calls updateVoice function when the drop down menu changes', () => {
        bar.find('.VoiceMenu').simulate('change');
        expect(onChange).toBeCalled();
    });

    it('SettingsBar calls lockToggle function when the lock checkbox is clicked', () => {
        bar.find('.LockSetting').first().simulate('click');
        expect(onChange).toBeCalled();
    });

    //
    // it('SettingsBar calls reSize function when the button size slider is changed', () => {
    //     bar.find('.ButtonSizeSlider').first().simulate('change');
    //     expect(onChange).toBeCalled();
    // });

    it('SettingsBar calls enableEditorMode when the button is clicked', () => {
	bar.find('.EditorButton').first().simulate('click');
        expect(onChange).toBeCalled();
    });
});
