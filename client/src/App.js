import React, {Component} from 'react';
import './App.css';
import SpeechBar from './components/SpeechBar.js';
import SettingsBar from './components/SettingsBar';
import Grid from './components/Grid';
import _ from 'lodash';


class App extends Component {
  constructor(props) {
    super(props);

    this.settingsToggle = this.settingsToggle.bind(this);
    this.handleClearMessageButton = this.handleClearMessageButton.bind(this);
    this.updateLanguage = this.updateLanguage.bind(this);
    this.lockToggle = this.lockToggle.bind(this);
    this.resizeButton = this.resizeButton.bind(this);
    this.addWordToSpeechBar = this.addWordToSpeechBar.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);

    this.state = {
      selectedLanguage: "English",
      settingsBarVisible: false,
      settingsLocked: false,
      buttonSize: "5",
        idCounter: 0,
      wordArray: [
        {id: _.uniqueId(), word: "I", src: "img/I.png", alt: "I image"},
        {id: _.uniqueId(), word: "see", src: "img/see.png", alt: "see image"},
        {id: _.uniqueId(), word: "happy", src: "img/happy.png", alt: "happy image"},
        {id: _.uniqueId(), word: "colors", src: "img/colors.png", alt: "scary image"},
        {id: _.uniqueId(), word: "scary", src: "img/scary.png", alt: "colors image"}
      ],

      messageArray: [
        {id: _.uniqueId(), word: "I", src: "img/I.png", alt: "I image"},
        {id: _.uniqueId(), word: "see", src: "img/see.png", alt: "see image"},
        {id: _.uniqueId(), word: "happy", src: "img/happy.png", alt: "happy image"},
        {id: _.uniqueId(), word: "colors", src: "img/colors.png", alt: "scary image"},
        {id: _.uniqueId(), word: "scary", src: "img/scary.png", alt: "colors image"}
      ],
    }
  }

  // Callback function passed to the SpeechBar back button removed last item in message
  handleBackButton() {
    if (this.state.messageArray !== []) {
      this.state.messageArray.splice(this.state.messageArray.length - 1, 1);
      this.setState({messageArray: this.state.messageArray});
      console.log(this.state.messageArray)
    }
  }


  // Callback function passed to the SpeechBar clear the speechBarMessage when the clear button is clicked
  handleClearMessageButton() {
    this.setState({messageArray: []});
  }


  // Callback function passed to the SettingsBar to update the App's selectedLanguage state variable
  updateLanguage(e) {
    this.setState({selectedLanguage: e.target.value});
  }


  // Toggles the settingsBarVisible state variable when the settingsButton is clicked
  settingsToggle() {
    this.setState({settingsBarVisible: !(this.state.settingsBarVisible)});
  }


  // Callback function passed to the SettingsBar to update the App's settingsLocked state variable
  lockToggle() {
    this.setState({settingsLocked: !(this.state.settingsLocked)});
  }


  // Callback function passed to the SettingsBar to update the App's buttonSize state variable
  resizeButton(e) {
    this.setState({buttonSize: e.target.value});
  }


  // Callback function passed to the Word Component to add a word to the speechBarMessage
  addWordToSpeechBar(word) {
    let newWord = {
        id: _.uniqueId(),
        word: word.word,
        src: word.src,
        alt: word.alt
    };

    console.log("add word: ", newWord);

    this.setState({
      messageArray: [
        ...this.state.messageArray,
        newWord
      ]
    });


    // this.setState({
    //   speechBarMessage: [
    //     ...this.state.speechBarMessage,
    //     text
    //   ]
    // });


  }

  render() {

    // Render the SettingsBar only if the settingsBarVisible state variable is true
    let settingsBar = this.state.settingsBarVisible
      ? <SettingsBar selectedLanguage={this.state.selectedLanguage} updateLanguage={this.updateLanguage}
                     settingsLocked={this.state.settingsLocked} lockToggle={this.lockToggle}
                     buttonSize={this.state.buttonSize} resizeButton={this.resizeButton}/>
      : null;

    return (
      <div className="App">
        <SpeechBar
          message={this.state.messageArray}
          handleClearMessageButton={this.handleClearMessageButton}
          handleBackButton={this.handleBackButton}/>

        <div id="settings" style={{margin: "auto"}}>
          <button id="settingsButton" onClick={this.settingsToggle}>Settings</button>
          <br/>
          <br/>
          {settingsBar}
          <p> Global Button Size: {this.state.buttonSize} </p>
          <p> Global Language: {this.state.selectedLanguage} </p>
        </div>

        <Grid words={this.state.wordArray} add={this.addWordToSpeechBar}/>

      </div>

    );
  }
}

export default App;
