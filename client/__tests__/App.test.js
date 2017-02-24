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

  it('Editor Mode is initially off', () => {
    expect(app.state().editorToggle).toEqual(false);
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
    // start with words in the message array
    app.setState({messageArray: [
        {id: "1", word:"infinite", symbol_path:"", alt:""},
        {id: "2", word:"love", symbol_path:"", alt:""}
      ]
    });

    const clearButton = app.find('.ClearButton').first();
    clearButton.simulate('click');
    expect(app.state().messageArray).toEqual([]);
  });

  it('Backspace button results in one less in speechBarMessage', () => {
    // start with words in the message array
    app.setState({messageArray: [
        {id: "1", word:"infinite", symbol_path:"", alt:""},
        {id: "2", word:"love", symbol_path:"", alt:""}
      ]
    });

    const backspaceButton = app.find('.BackspaceButton').first();
    backspaceButton.simulate('click');
    expect(app.state().messageArray).toEqual([{id: "1", word:"infinite", symbol_path:"", alt:""}]);
  });

  it('Clicking on a word adds it to the messageArray', () => {
    // give app a word to test
    app.setState({colArray: [{
      title: "test",
      id: "1",
      words: [{word_id: "1", word:"love", symbol_path:"", alt:""}]
    }]});

    // Clear the window
    const clearButton = app.find('.ClearButton').first();
    clearButton.simulate('click');

    // Click a word button
    const wordButton = app.find('.WordText').first();
    wordButton.simulate('click');

    expect(app.state().messageArray[0].word).toContain('love');
  });

  it('Enabling editor mode then clicking a DeleteButton deletes that word from the grid', () => {
    // give app a word to test
    app.setState({colArray: [{
      title: "test",
      id: "1",
      words: [{word_id: "1", word:"love", symbol_path:"", alt:""}]
    }]});

    // Enable EditorMode
    const settingsButton = app.find('.SettingsButton').first();
    settingsButton.simulate('click');
    const editorModeButton = app.find('.EditorButton').first();
    editorModeButton.simulate('click');

    // Click the DeleteButton
    const deleteButton = app.find('.DeleteButton').first();
    deleteButton.simulate('click');

    // Expect the word to be deleted
    expect(app.state().colArray[0].words).toEqual([]);
  });
});
