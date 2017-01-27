import React, { Component } from 'react';
import './App.css';
import SpeechBar from './components/SpeechBar.js';
import SettingsBar from './components/SettingsBar';
import Grid from './components/Grid';


class App extends Component {
    constructor(props) {
        super(props);

        this.settingsToggle = this.settingsToggle.bind(this);
        this.handleClearMessage = this.handleClearMessage.bind(this);
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
            wordArray: [
                {id: 1, word: "I", src: "img/I.png", alt:"I image"},
                {id: 2, word: "see", src: "img/see.png", alt:"see image"},
                {id: 3, word: "happy", src: "img/happy.png", alt:"happy image"},
                {id: 4, word: "colors", src: "img/colors.png", alt:"scary image"},
                {id: 5, word: "scary", src: "img/scary.png", alt:"colors image"}
            ],

            speechBarMessage: ['I', 'see', 'happy', 'colors', 'scary' ], // array: message appearing in the SpeechBar message window
            messageImgs: ["img/I.png", "img/see.png", "img/happy.png", "img/colors.png", "img/scary.png", ]

        }
    }

    // Callback function passed to the SpeechBar back button removed last item in message
    handleBackButton() {
      if(this.state.speechBarMessage !== [] ) {
        this.state.speechBarMessage.splice(this.state.speechBarMessage.length - 1, 1);
        this.setState({speechBarMessage: this.state.speechBarMessage});
        console.log(this.state.speechBarMessage)
      }
    }

    // Callback function passed to the SpeechBar clear the speechBarMessage when the clear button is clicked
    handleClearMessage() {
      this.setState({speechBarMessage: []});
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
    addWordToSpeechBar(text) {
        this.setState({
            speechBarMessage: [
                ...this.state.speechBarMessage,
                text
            ]
        });
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
                    message={this.state.speechBarMessage}
                    messageImgs={this.state.messageImgs}
                    handleClearMessage={this.handleClearMessage}
                    handleBackButton={this.handleBackButton}/>

                <div id="settings" style={{ margin: "auto"}}>
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
