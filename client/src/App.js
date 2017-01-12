import React, { Component } from 'react';
// import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import SpeechBar from './components/SpeechBar.js';
import Word from './components/Word.js';


class App extends Component {
    constructor(props) {
        super(props)

        this.grid = this.grid.bind(this);

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
          {this.grid()}
      </div>

  );
  }
}

export default App;
