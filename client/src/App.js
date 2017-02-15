import React, {Component} from 'react';
import './css/App.css';
import './css/SpeechBar.css';
import './css/SettingsBar.css';
import './css/font-color.css';
import './css/Grid-Column-Word.css';
import SpeechBar from './components/SpeechBar.js';
import SettingsBar from './components/SettingsBar';
import Grid from './components/Grid';
import _ from 'lodash';
import $ from 'jquery';



class App extends Component {
  constructor(props) {
    super(props);

    this.settingsToggle = this.settingsToggle.bind(this);
    this.handleClearMessage = this.handleClearMessage.bind(this);
    this.updateVoice = this.updateVoice.bind(this);
    this.lockToggle = this.lockToggle.bind(this);
    this.resizeButton = this.resizeButton.bind(this);
    this.enableEditorMode = this.enableEditorMode.bind(this);
    this.addWordToSpeechBar = this.addWordToSpeechBar.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.getWords = this.getWords.bind(this);
    this.appendToCols = this.appendToCols.bind(this);
    this.getCoreVocabTitles = this.getCoreVocabTitles.bind(this);

    this.state = {
      selectedVoice: "Default",
      settingsBarVisible: false,
      settingsLocked: false,
      editorToggle: false,
      buttonSize: "5",
      colArray: [],
      messageArray: [],
      coreListTitles: [],
    }
  }

  componentWillMount() {
    this.getCoreVocabTitles();
  }

  componentDidMount() {
    this.getWords();

    console.log('Component Mounted:');
    console.log('CoreListTitles: ', this.state.coreListTitles);
  }

  // Initializes wordArrays with JSON data from API call
  getWords() {
    let nextCol;
    let titles = [
      {title: 'pronoun', order: 1},
      {title: 'noun', order: 2},
      {title: 'verb', order: 3},
      {title: 'adjective', order: 4},
      {title: 'adverb', order: 5},
      {title: 'preposition', order: 6},
      {title: 'exclamation', order: 7}];

    titles.forEach(({title, order}) => {
      $.getJSON('http://localhost:3001/api/lists/title/' + title)
        .then((data) => {
          nextCol = {
            order: order,
            title: title,
            words: data
          };
          this.setState(this.appendToCols(nextCol));
        });
    });
  }


  // Retrieves the titles of the core vocabulary from the database
  // and updates the state variable "coreListTitles"
  getCoreVocabTitles() {
    let coreVocabId = '1';
    let listTitles = [];

    $.getJSON('http://localhost:3001/api/grids/id/' + coreVocabId)
      .then((data) => {
        _.forEach(data, function (value) {
          listTitles.push(value.list_title);
        });
        console.log('Retrieved Core Vocab titles: ', listTitles);
      })

    this.setState({ coreListTitles: listTitles });

    console.log('list titles ', listTitles);
  }

  // Updates the colArray with the next column
  appendToCols(nextCol) {
    return ((prevState) => {
      return {...prevState, colArray: [...prevState.colArray, nextCol]}
    });
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
  handleClearMessage() {
    this.setState({messageArray: []});
  }


  // Callback function passed to the SettingsBar to update the App's selectedVoice state variable
  updateVoice(e) {
    this.setState({selectedVoice: e.target.value});
  }


  // Toggles the settingsBarVisible state variable when the settingsButton is clicked
  settingsToggle() {
    this.setState({settingsBarVisible: !(this.state.settingsBarVisible)});
  }

  //Enables editorToggle state variable when the Editor Mode button is clicked in SettingsBar
  enableEditorMode() {
    this.setState({editorToggle: !(this.state.editorToggle)});
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
  }



  render() {

    //Get the Browser's voices loaded before anything. Allows synching
    //of SettingsBar voices
    speechSynthesis.getVoices();

    // Render the SettingsBar only if the settingsBarVisible state variable is true
    let settingsBar = this.state.settingsBarVisible
      ? <SettingsBar selectedVoice={this.state.selectedVoice} updateVoice={this.updateVoice}
                     settingsLocked={this.state.settingsLocked} lockToggle={this.lockToggle}
                     editorToggle={this.state.editorToggled} enableEditorMode={this.enableEditorMode}
                     buttonSize={this.state.buttonSize} resizeButton={this.resizeButton}/>
      : null;
    let editing = this.state.editorToggle
      ? "True"
      : "False";

    return (
      <div className="App">

        <div>
          <form className="ExampleDropDown">
            <label className="VoiceLabel">List_Title</label>
            <select className="ourSelect" defaultValue="select">
              {
                this.state.coreListTitles.map((title) => {
                  return <option key={title} value={title}>{title}</option>
                })
              }
            </select>
          </form>
        </div>


        <SpeechBar
          message={this.state.messageArray}
          handleClearMessage={this.handleClearMessage}
          selectedVoice={this.state.selectedVoice}
          handleBackButton={this.handleBackButton}
          settingsToggle={this.settingsToggle}/>
        <div className="Settings" style={{margin: "auto"}}>
          {settingsBar}
          <p> Global Button Size: {this.state.buttonSize} </p>
          <p> Global Voice: {this.state.selectedVoice} </p>
          <p> Editor Mode Enabled: {editing} </p>
        </div>

        <Grid cols={this.state.colArray} add={this.addWordToSpeechBar}
              selectedVoice={this.state.selectedVoice}/>
      </div>
    );
  }
}

export default App;
