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

  it('The vocab columns display in the correct order', () => {
    // give app some cols to test
    app.setState({colArray: [
        {
          order: 1,
          title: "pronoun",
          words: [{id: "1", word:"love", symbol_path:"", alt:""}]},
        {
          order: 2,
          title: "noun",
          words: [{id: "1", word:"love", symbol_path:"", alt:""}]},
        {
          order: 3,
          title: "verb",
          words: [{id: "1", word:"love", symbol_path:"", alt:""}]},
        {
          order: 4,
          title: "adjective",
          words: [{id: "1", word:"love", symbol_path:"", alt:""}]},
        {
          order: 5,
          title: "adverb",
          words: [{id: "1", word:"love", symbol_path:"", alt:""}]},
        {
          order: 6,
          title: "preposition",
          words: [{id: "1", word:"love", symbol_path:"", alt:""}]},
        {
          order: 7,
          title: "exclamation",
          words: [{id: "1", word:"love", symbol_path:"", alt:""}]},
    ]});

    // Get each column
    const col1 = app.find('Column').at(0);
    const col2 = app.find('Column').at(1);
    const col3 = app.find('Column').at(2);
    const col4 = app.find('Column').at(3);
    const col5 = app.find('Column').at(4);
    const col6 = app.find('Column').at(5);
    const col7 = app.find('Column').at(6);

    // Expect each column to have the correct title
    expect(col1.props().title).toEqual('pronoun');
    expect(col2.props().title).toEqual('noun');
    expect(col3.props().title).toEqual('verb');
    expect(col4.props().title).toEqual('adjective');
    expect(col5.props().title).toEqual('adverb');
    expect(col6.props().title).toEqual('preposition');
    expect(col7.props().title).toEqual('exclamation');
  })
});
