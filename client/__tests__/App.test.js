import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../src/App';

it('App component shallow renders without crashing', () => {
  shallow(<App />);
});

describe('Test suite for mounted App', () => {
  let app;

  beforeEach(() => {
    app = mount(<App />);
  });

  it('English is the default language', () => {
    expect(app.state().selectedLanguage).toEqual('English');
  });

  it('SettingsBar is initially hidden', () => {
    expect(app.state().settingsBarVisible).toEqual(false);
  });

  it('SettingsBar is initially unlocked', () => {
    expect(app.state().settingsLocked).toEqual(false);
  });

  it('Settings button shows SettingsBar when clicked', () => {
    const settingsButton = app.find('.settingsButton').first();
    settingsButton.simulate('click');
    expect(app.state().settingsBarVisible).toEqual(true);
  });

  it('SpeechBar is visible', () => {
    const speechBar = app.find('SpeechBar').first();
    expect(speechBar).toBeDefined();
  });

  it('SettingsBar remains locked after opening then locking then closing and reopening', () => {
    // Open the SettingsBar
    const settingsButton = app.find('.settingsButton').first();
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
    const clearButton = app.find('button').at(2);
    clearButton.simulate('click');
    expect(app.state().speechBarMessage).toEqual([]);
  });

  // // SpeechSynthesisUtterance breaks this
  // it('Clicking on a word adds its text to the SpeechBar', () => {
  //   // Clear the window
  //   const clearButton = app.find('button').at(2);
  //   clearButton.simulate('click');
  //
  //   // Click a word button
  //   const wordButton = app.find('.WordButton').first();
  //   wordButton.simulate('click');
  //   expect(app.state().speechBarMessage).toContain("I");
  // });
});