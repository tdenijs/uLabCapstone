import React, { Component } from 'react';
// import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import SpeechBar from './components/SpeechBar.js';
import Word from './components/Word.js';
import SettingsBar from './components/SettingsBar';


class App extends Component {
    constructor(props) {
        super(props)

        this.grid = this.grid.bind(this);
        this.settingsToggle = this.settingsToggle.bind(this);

        this.state = {
            selectedLanguage: "English",
            settingsBarVisible: false,
            wordtext: "Love",
            wordsymbol: "Symbol"
        }
    }

    grid() {
        return (
            <div id="grid">
                <div id="coreVocabulary">
                    <div id="type" >
                        <div id="wordButton" style={{ margin: "auto", width: "100px", border: "solid", color: "blue" }}>
                            <Word wordtext={this.state.wordtext} wordsymbol={this.state.wordsymbol}/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    updateLanguage(e) {
        this.setState({selectedLanguage: e.target.value});
    }

    settingsToggle() {
        this.setState({settingsBarVisible: !(this.state.settingsBarVisible)});
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <p className="App-intro">
                    You can find the API server at localhost:3001.
                </p>
                <SpeechBar />
                <button className="settingsButton" onClick={this.settingsToggle}>Settings</button>
                <div>
                    {
                        this.state.settingsBarVisible
                            ? <SettingsBar selectedLanguage={this.state.selectedLanguage} updateLanguage={this.updateLanguage.bind(this)} />
                            : null
                    }
                </div>
                <p> Global Language: {this.state.selectedLanguage} </p>
                {this.grid()}
            </div>

        );
    }
}

export default App;
