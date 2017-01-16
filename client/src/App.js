import React, { Component } from 'react';
// import { Navbar, Jumbotron, Button } from 'react-bootstrap';
// import logo from './logo.svg';
import './App.css';
import SpeechBar from './components/SpeechBar.js';
import Word from './components/Word.js';
import SettingsBar from './components/SettingsBar';


class App extends Component {
    constructor(props) {
        super(props);

        this.grid = this.grid.bind(this);
        this.settingsToggle = this.settingsToggle.bind(this);

        this.state = {
            selectedLanguage: "English",
            settingsBarVisible: false,
            settingsLocked: false,
            buttonSize: "5"
        }
    }

    grid() {
        return (
            <div id="grid">
                <div id="coreVocabulary">
                    <div id="type" >
                        <div id="wordButton" style={{ margin: "auto", width: "100px", border: "solid", color: "blue" }}>
                            <Word />
                        </div>
                    </div>
                </div>
            </div>

        );
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

    render() {
        // Render the SettingsBar only if the settingsBarVisible state variable is true
        let settingsBar = this.state.settingsBarVisible
            ? <SettingsBar selectedLanguage={this.state.selectedLanguage} updateLanguage={this.updateLanguage.bind(this)}
                           settingsLocked={this.state.settingsLocked} lockToggle={this.lockToggle.bind(this)}
                           buttonSize={this.state.buttonSize} resizeButton={this.resizeButton.bind(this)}/>
            : null;

        return (
            <div className="App">
                <SpeechBar />
                <div id="settings" style={{ margin: "auto", border: "solid", color: "red" }}>
                    <button className="settingsButton" onClick={this.settingsToggle}>Settings</button>
                    <div>{settingsBar}</div>
                    <p> Global Button Size: {this.state.buttonSize} </p>
                    <p> Global Language: {this.state.selectedLanguage} </p>
                </div>
                {this.grid()}
            </div>

        );
    }
}

export default App;
