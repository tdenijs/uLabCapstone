import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../src/App';
import speechSynthesis from '../src/mocks';

// global.speechSynthesis = {
//   getVoices: () => {
//     return [{ name: "Google UK English Male" }, { name: "Google UK English Female" }];
//   }
// };

it('App component shallow renders without crashing', () => {
  shallow(<App />);
});

describe('Test suite for mounted App', () => {
  let app;

  beforeEach(() => {
    app = mount(<App />);
  });

  it('Default is the default voice', () => {
    expect(app.state().selectedVoice).toEqual('Default');
  });

  it('SettingsBar is initially hidden', () => {
    expect(app.state().settingsBarVisible).toEqual(false);
  });

  it('SettingsBar is initially unlocked', () => {
    expect(app.state().settingsLocked).toEqual(false);
  });

  it('Settings button shows SettingsBar when clicked', () => {
    const settingsButton = app.find('#settingsButton').first();
    settingsButton.simulate('click');
    expect(app.state().settingsBarVisible).toEqual(true);
  });

  it('SpeechBar is visible', () => {
    const speechBar = app.find('SpeechBar').first();
    expect(speechBar).toBeDefined();
  });

  it('SettingsBar remains locked after opening then locking then closing and reopening', () => {
    // Open the SettingsBar
    const settingsButton = app.find('#settingsButton').first();
    settingsButton.simulate('click');

    // Check the checkbox
    const lockCheck = app.find('#lockCheck').first();
    lockCheck.simulate('change');

    expect(app.state().settingsLocked).toEqual(true);

    // Close the SettingsBar and reopen it
    settingsButton.simulate('click');
    settingsButton.simulate('click');

    expect(app.state().settingsLocked).toEqual(true);
  });

  it('Clear button results in empty speechBarMessage', () => {
    const clearButton = app.find('#clearButton').first();
    clearButton.simulate('click');
    expect(app.state().messageArray).toEqual([]);
  });
});
