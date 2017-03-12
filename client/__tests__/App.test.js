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
import { shallow, mount, ReactWrapper } from 'enzyme';
import App from '../src/App';
import ReactTestUtils from 'react-addons-test-utils'
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

  it('Clicking EditorButton results in DeleteButton being defined', () => {
    // give app a word to test
    app.setState({colArray: [{
      title: "test",
      id: "1",
      words: [{word_id: "1", word:"love", symbol_path:"", alt:""}]
    }]});

    // Open settings and click EditorButton
    const settingsButton = app.find('.SettingsButton').first();
    settingsButton.simulate('click');
    const editorModeButton = app.find('.EditorButton').first();
    editorModeButton.simulate('click');

    const deleteButton = app.find('.DeleteButon').first();
    expect(deleteButton).toBeDefined();
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
    const lockCheck = app.find('.LockSetting').first();
    lockCheck.simulate('click');

    expect(app.state().settingsLocked).toEqual(true);

    // Close the SettingsBar and reopen it
    settingsButton.simulate('click');
    settingsButton.simulate('click');

    expect(app.state().settingsLocked).toEqual(true);
  });

  it('Selecting a voice from the voice menu updates the selectedVoice state', () => {
    // Open the SettingsBar
    const settingsButton = app.find('.SettingsButton').first();
    settingsButton.simulate('click');

    // Select a voice found in the speechSynthesis mock
    app.find('.VoiceMenu').simulate('change', {target: { value : 'Google UK English Female'}});

    // Expect the selectedVoice state to match
    expect(app.state().selectedVoice).toEqual('Google UK English Female');
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

  it('Enabling editor mode then clicking a DeleteButton deletes that word from the grid if confirmed', () => {
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

    // Click the "Yes" option on the DeleteModal
    // Pulls the modal out of the DOM and gets the first button
    const deleteConfirmButton = document.body.getElementsByClassName("Modal")[0].getElementsByClassName("btn btn-default")[0];
    ReactTestUtils.Simulate.click(deleteConfirmButton);

    // Expect the word to be deleted
    expect(app.state().colArray[0].words).toEqual([]);
  });

  it("Enabling editor mode then clicking a DeleteButton doesn't deletes that word from the grid if canceled", () => {
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

    // Click the "No" option on the DeleteModal
    // Pulls the modal out of the DOM and gets the first button
    const deleteCancelButton = document.body.getElementsByClassName("Modal")[0].getElementsByClassName("btn btn-default")[1];
    ReactTestUtils.Simulate.click(deleteCancelButton);

    // Expect the word to be deleted
    expect(app.state().colArray[0].words).toEqual([{word_id: "1", word:"love", symbol_path:"", alt:""}]);
  });

  it("If EditorMode is enabled and the SettingsBar becomes locked, EditorMode becomes disabled", () => {
      // Enable EditorMode
      const settingsButton = app.find('.SettingsButton').first();
      settingsButton.simulate('click');
      const editorModeButton = app.find('.EditorButton').first();
      editorModeButton.simulate('click');

      // Expect EditorMode to be enabled
      expect(app.state().editorToggle).toEqual(true);

      // Lock the SettingsBar
      const lockSetting = app.find('.LockSetting').first();
      lockSetting.simulate('click');

      // Expect EditorMode to be disabled
      expect(app.state().editorToggle).toEqual(false);
  });

  it("If EditorMode is disabled, the EditorButton's text is 'Delete a Word'", () => {
      // Open the SettingsBar
      const settingsButton = app.find('.SettingsButton').first();
      settingsButton.simulate('click');

      // Expect the text on the EditorButton to be appropriate
      const editorModeButton = app.find('.EditorButton').first();
      expect(editorModeButton.text()).toBe('Delete a Word');
  });

  it("If EditorMode is enabled, the EditorButton's text is 'Finish Deleting'", () => {
      // Enable EditorMode
      const settingsButton = app.find('.SettingsButton').first();
      settingsButton.simulate('click');
      const editorModeButton = app.find('.EditorButton').first();
      editorModeButton.simulate('click');

      // Expect the text on the EditorButton to be appropriate
      expect(editorModeButton.text()).toBe('Finish Deleting');
  });
});
