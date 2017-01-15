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

  it('Settings button shows SettingsBar when clicked', () => {
    const settingsButton = app.find('.settingsButton').first();
    settingsButton.simulate('click');
    expect(app.state().settingsBarVisible).toEqual(true);
  });

  it('SpeechBar is visible', () => {
    const speechBar = app.find('SpeechBar').first();
    expect(speechBar).toBeDefined();
  });
});