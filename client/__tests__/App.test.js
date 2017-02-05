import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../src/App';
import speechSynthesis from '../src/mocks';

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
    const settingsButton = app.find('.SettingsButton').first();
    settingsButton.simulate('click');
    expect(app.state().settingsBarVisible).toEqual(true);
  });

  it('SpeechBar is visible', () => {
    const speechBar = app.find('SpeechBar').first();
    expect(speechBar).toBeDefined();
  });

  it('SettingsBar remains locked after opening then locking then closing and reopening', () => {
    // Open the SettingsBar
    const settingsButton = app.find('.SettingsButton').first();
    settingsButton.simulate('click');

    // Check the checkbox
    const lockCheck = app.find('.LockCheck').first();
    lockCheck.simulate('change');

    expect(app.state().settingsLocked).toEqual(true);

    // Close the SettingsBar and reopen it
    settingsButton.simulate('click');
    settingsButton.simulate('click');

    expect(app.state().settingsLocked).toEqual(true);
  });

  it('Clear button results in empty speechBarMessage', () => {
    const clearButton = app.find('.ClearButton').first();
    clearButton.simulate('click');
    expect(app.state().messageArray).toEqual([]);
  });

  it('Clicking on a word adds it to the messageArray', () => {
    // give app a word to test
    app.setState({colArray: [{
      title: "test",
      words: [{id: "1", word:"love", symbol_path:"", alt:""}]
    }]});

    // Clear the window
    const clearButton = app.find('.ClearButton').first();
    clearButton.simulate('click');

    // Click a word button
    const wordButton = app.find('.Word').first();
    wordButton.simulate('click');

    expect(app.state().messageArray[0].word).toContain('love');
  });
});
