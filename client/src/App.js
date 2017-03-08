/*******************************************************************
 * Copyright (c) 2016 Portland State University CS Capstone Team
 *
 * Authors: Siggy Hinds, Jiaqi Luo, Christopher Monk, Tristan de Nijs,
 *          Simone Talla Silatchom, Carson Volker, Anton Zipper
 *
 * This file is part of uLabCapstone, distributed under the MIT
 * open source license. For full terms see the LICENSE.md file
 * included in the root of this project.
 *******************************************************************/

import React, {Component} from 'react';
import './css/App.css';
import './css/SpeechBar.css';
import './css/SettingsBar.css';
import './css/font-color.css';
import './css/Grid-Column-Word.css';
import SpeechBar from './components/SpeechBar.js';
import SettingsBar from './components/SettingsBar';
import Vocab from './components/Vocab';
import _ from 'lodash';
import $ from 'jquery';
import {Button, Modal, Grid, Row, Col} from 'react-bootstrap';


class App extends Component {
  constructor(props) {
    super(props);

    this.settingsToggle = this.settingsToggle.bind(this);
    this.handleClearMessage = this.handleClearMessage.bind(this);
    this.updateVoice = this.updateVoice.bind(this);
    this.lockToggle = this.lockToggle.bind(this);
    this.enableEditorMode = this.enableEditorMode.bind(this);
    this.addWordToSpeechBar = this.addWordToSpeechBar.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.getWords = this.getWords.bind(this);
    this.getFringeWords = this.getFringeWords.bind(this);
    this.appendToCols = this.appendToCols.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.getCoreVocabTitles = this.getCoreVocabTitles.bind(this);
    this.getFringeVocabTitles = this.getFringeVocabTitles.bind(this);
    this.removeFromGrid = this.removeFromGrid.bind(this);
    this.handleAddNewWord = this.handleAddNewWord.bind(this);
    this.handleAddNewImage = this.handleAddNewImage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.renderRemoveWordModal = this.renderRemoveWordModal.bind(this);
    this.callDeleteApi = this.callDeleteApi.bind(this);
    this.renderSettingsBar = this.renderSettingsBar.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this)

    this.state = {
      selectedVoice: "Default",
      settingsBarVisible: false,
      settingsLocked: false,
      editorToggle: false,
      buttonSize: "5",
      colArray: [], // core vocab
      fringeColArray: [], // fringe vocab
      messageArray: [],
      coreListTitles: [],
      fringeListTitles: [],
      showModal: false,
      showDeleteModal: false,
      deleteWordText: "",
      deleteWordId: "0",
      deleteColId: "0",

      // maxWidth: 768,        // arbitrary default maxWidth for update dimensions function
      // maxHeight: 920,
    }

  }




  /**
   * This function is run before component mounts. 
   * Gets the vocab and fringe titles.
   */
  componentWillMount() {
    this.getCoreVocabTitles();
    this.getFringeVocabTitles();

    //this.updateDimensions();     // update dimensions when mounting
    window.addEventListener("resize", this.updateDimensions());    // add event listener for update dimensions
  }

  /**
   * This function is run when the component has mounted.
   * Gets the vocab and fringe words
   */
  componentDidMount() {
    this.getWords(); // get words for main core vocabulary
    this.getFringeWords(); // get words for fringe vocabulary

    console.log('Component Mounted:');
    console.log('CoreListTitles: ', this.state.coreListTitles);
  }
  


  /**
   * Calculate & Update state of new dimensions
   *
   * Some important device dimensions
   * ipad portrait  { w = 768px h = 920px }
   * ipad landscape { w = 1010px h = 660px }
   * iphone portrait  { w = 310px h = 352}
   * iphone landscape { w = 468px h = 202}
   * reasonable desktop screen resolution { w=1280px h=800px }
   *
   */
  updateDimensions() {
    console.log("updateDimensions called: width:", window.innerWidth, " height: ", window.innerHeight);

    if(window.innerHeight < 202 ) {
      this.setState({maxHeight: 200});
      //this.setState({maxVocabHeight: })

    }
    if(window.innerHeight < 352 ) {
      this.setState({maxHeight: 340});

    }
    if(window.innerHeight < 660 ) {
      this.setState({maxHeight: 650});

    }
    if(window.innerHeight < 800 ) {
      this.setState({maxHeight: 790});

    }
    else {  // 900
      this.setState({maxHeight: 850});
    }


    console.log('Dimensions: width- ', this.state.maxWidth,
      '  height- ', this.state.maxWidth);
  }



  /**
   * getFringeWords()
   * makes api call to database to pull the list of words from the "FringeVocabGrid"
   * updates state fringeColArray
   * */
  getFringeWords() {
    let fringelist = [];
    let title = "goodnight moon"

    this.setState({fringeColArray: []});  // getWords() will be called when a new word is added,
    // so need to clear the fringeColArray before retrieving words from ap

      $.getJSON('http://localhost:3001/api/lists/title/' + title)
        .then((data) => {
          fringelist = {
            order: 1,
            id: 8,
            title: title,
            words: data
          };
          this.setState({fringeColArray: [fringelist]});
        });

    console.log("GetFringe: fringelist: ", fringelist);
    console.log("GetFringe: fringeColArray: ", this.state.fringeColArray);
  }

  /**
   * getWords()
   * makes api call, Initializes wordArrays with JSON data from API call
   * calls appendToCols to add additional lists of words
   * */
  getWords() {
    let nextCol;
    let titles = [
      {title: 'pronoun', id: "6", order: "1"},
      {title: 'noun', id: "4", order: "2"},
      {title: 'verb', id: "7", order: "3"},
      {title: 'adjective', id: "1", order: "4"},
      {title: 'adverb', id: "2", order: "5"},
      {title: 'preposition', id: "5", order: "6"},
      {title: 'exclamation', id: "3", order: "7"}];

    this.setState({colArray: []});  // getWords() will be called when a new word is added,
                                    // clear the colArray before retrieving words from api

    titles.forEach(({title, id, order}) => {
      $.getJSON('http://localhost:3001/api/lists/title/' + title)
        .then((data) => {
          nextCol = {
            order: order,
            id: id,
            title: title,
            words: data
          };
          this.setState(this.appendToCols(nextCol));
        });
    });
  }


  /**
   * getCoreVocabTitles()   Retrieves the titles of the core vocabulary from the database
   * and updates the state variable "coreListTitles"
   */
  getCoreVocabTitles() {
    let coreVocabId = '1';  // list_id for coreVocab list
    let listTitles = [];

    $.getJSON('http://localhost:3001/api/grids/id/' + coreVocabId)
      .then((data) => {
        _.forEach(data, function (value) {
          listTitles.push(value.list_title);
        });
      })

    this.setState({coreListTitles: listTitles});
  }

  /**
   * getFringeVocabTitles()   Retrieves the titles of the fringe vocabulary from the database
   * and updates the state variable "fringeListTitles"
   */
  getFringeVocabTitles() {
    let fringeVocabId = '2';  // list_id for fringeVocab list
    let listTitles = [];

    $.getJSON('http://localhost:3001/api/grids/id/' + fringeVocabId)
      .then((data) => {
        _.forEach(data, function (value) {
          listTitles.push(value.list_title);
        });
      })

    this.setState({fringeListTitles: listTitles});
  }

  /**
   * Adds a new column to the colArray
   * @param nextCol : the next column to add to the colArray.
   */
  appendToCols(nextCol) {
    return ((prevState) => {
      return {...prevState, colArray: [...prevState.colArray, nextCol]}
    });
  }


  /**
   * Callback function passed to the SpeechBar back button removed last item in message
   */
  handleBackButton() {
    if (this.state.messageArray !== []) {
      this.state.messageArray.splice(this.state.messageArray.length - 1, 1);
      this.setState({messageArray: this.state.messageArray});
      console.log(this.state.messageArray)
    }
  }


  /**
   * Callback function passed to the SpeechBar clear the speechBarMessage when the clear button is clicked
   */
  handleClearMessage() {
    this.setState({messageArray: []});
  }

  /**
   * updateVoice(e)
   * Callback function passed to the SettingsBar to update the App's selectedVoice state variable
   * @param e : The voice being passed in.
   */
  updateVoice(e) {
    this.setState({selectedVoice: e.target.value});
  }


  /**
   * settingsToggle()
   * Toggles the settingsBarVisible state variable when the settingsButton is clicked
   */
  settingsToggle() {
    this.setState({settingsBarVisible: !(this.state.settingsBarVisible)});
  }

  /**
   * Enables editorToggle state variable when the Editor Mode button is clicked in SettingsBar
   */
  enableEditorMode() {
    this.setState({editorToggle: !(this.state.editorToggle)});
  }

  /**
   * Callback function passed to the SettingsBar to update the App's settingsLocked state variable
   */
  lockToggle() {
    console.log("settings lockToggle called")
    this.setState({settingsLocked: !(this.state.settingsLocked)});
  }


  // // Callback function passed to the SettingsBar to update the App's buttonSize state variable
  // resizeButton(e) {
  //   this.setState({buttonSize: e.target.value});
  // }

  /**
   * Closes the modal for delete confirmation
   */
  close() {
    this.setState({showModal: false});
  }

  /**
   * Opens the modal for delete confirmation
   */
  open() {
    this.setState({showModal: true});
  }


  /**
   * Callback function passed to the Word Component to add a word to the speechBarMessage
   * @param word : The word to be passed into the Speech Bar (See components/SpeechBar.js)
   */
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

  /**
   * settingsToggle()
   * Toggles the settingsBarVisible state variable when the settingsButton is clicked
   */
  openDeleteModal() {
    this.setState({showDeleteModal: true});
  }

  /**
   * settingsToggle()
   * Toggles the settingsBarVisible state variable when the settingsButton is clicked
   */
  closeDeleteModal() {
    this.setState({showDeleteModal: false});
  }

  /**
   * handleDelete(word_text, word_id, col_id)
   * Callback function passed to Word component to remove that word from the grid.
   * Updates state related to the delete confirmation modal and opens the modal.
   * @param word_text : the text we need to delete
   * @param word_id : the id of the word we are deleting
   * @param col_id : the id of the column from which the word is being deleted
   */
  handleDelete(word_text, word_id, col_id) {
    this.setState({deleteWordText: word_text});
    this.setState({deleteWordId: word_id});
    this.setState({deleteColId: col_id});
    this.openDeleteModal();
  }

  /**
   * handleDeleteConfirm()
   * Updates the app's state, call's the backend API to delete from the database,
   * and closes the delete confirmation modal.
   */
  handleDeleteConfirm() {
    this.removeFromGrid(this.state.deleteWordId, this.state.deleteColId);
    this.callDeleteApi(this.state.deleteWordId, this.state.deleteColId);
    this.closeDeleteModal();
  }

  /**
   * removeFromGrid(word_id, col_id)
   * Updates the local state to remove the desired word from the desired column.
   * @param word_id : the id of the word that we are deleting
   * @param col_id : the id of the column from which the word is being deleted
   */
  removeFromGrid(word_id, col_id) {
    console.log("wordId: " + word_id + " columnId: " + col_id);

    let col = 0;
    let newCols = 0;

    if(col_id > 7) {
      col = this.state.fringeColArray.filter((el) => {
        return el.id === col_id;
      });
      newCols = this.state.fringeColArray.filter((el) => {
        return el.id !== col_id;
      });
    }else {
      // Get the column to remove from
      col = this.state.colArray.filter((el) => {
        return el.id === col_id;
      });

      // Get a new set of columns that has the column we want to alter removed
      newCols = this.state.colArray.filter((el) => {
        return el.id !== col_id;
      });
    }


    // Pull the column from the filter results
    col = col[0];


    // Get the new array of words with the desired word removed
    let newWords = col.words.filter((el) => {
      return el.word_id !== word_id;
    });

    // Assemble the new column with the filtered words
    let newCol = {
      ...col,
      words: newWords,
    };

    // Update the state and add the updated column back on
    if(col_id > 7) {
      this.setState({
        fringeColArray: [
          ...newCols, newCol
        ]
      });
    }else{
      this.setState({
        colArray: [
          ...newCols, newCol
        ]
      });
    }
  }


  /**
   * handleAddNewImage()
   * {API POST CALL}
   * Callback function passed to the WordEditor Component to add a image through POST api call
   * @param formData : The data collection that needs to be added into the database
   */
  handleAddNewImage(formData) {
    $.ajax({
      contentType: false,
      processData: false,
      method: 'POST',
      url: 'http://localhost:3001/api/imgupload',
      data: formData
    })
  }




  /**
   * callDeleteApi(word_id, list_id)
   * {API DELETE CALL}
   * Called by handleDeleteConfirm to remove the specified word from the specified list in the database
   * @param word_id : the id of the word that we are deleting
   * @param col_id : the id of the column from which the word is being deleted
   */
  callDeleteApi(word_id, list_id) {
    let address = 'http://localhost:3001/api/words/list_id/' + list_id + '/word_id/' + word_id;
    fetch(address, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        word_id: word_id,
        list_id: list_id,
      })
    });
  }


  /**
   * handleAddNewWord()
   * {API POST CALL}
   * Callback function passed to the WordEditor Component to add a word through POST api call
   * @param wordText : The text of the word that is being added
   * @param selectedTitle : The title of the list that the word is being added to
   * @param selectedVocabulary : The name of the vocabulary that the word is being added to
   * @param fileSelected : The image file that is being passed in
   */
  handleAddNewWord(wordText, selectedTitle, selectedVocabulary, fileSelected) {
    var newPath = fileSelected ?
    'img/' + wordText + '.png'
      : 'img/blank.png'
    fetch('http://localhost:3001/api/words/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      //ContentType:
      body: JSON.stringify({
        name: wordText,
        path: newPath,
        text: wordText + 'symbol',
        list: selectedTitle,
        grid: selectedVocabulary + ' vocabulary'
      })
    }).then(() => {this.getWords(); this.getFringeWords()});
    //then... call getWords() to reload words
  }


  /**
   * renderRemoveWordModal
   * Renders the modal that appears to confirm deleting a button
   */
  renderRemoveWordModal() {
    return (
      <Modal show={this.state.showDeleteModal} onHide={this.closeDeleteModal}>
        <Modal.Body>
          <p>Are you sure you want to delete "{this.state.deleteWordText}"?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleDeleteConfirm}>Yes</Button>
          <Button onClick={this.closeDeleteModal}>No</Button>
        </Modal.Footer>
      </Modal>
    )
  }


  /**
   * renderSettingsBar()
   * a helper function that returns the SettingsBar component
   * */
  renderSettingsBar() {
    return (
      <SettingsBar selectedVoice={this.state.selectedVoice} updateVoice={this.updateVoice}
                   settingsLocked={this.state.settingsLocked} lockToggle={this.lockToggle}
                   editorToggle={this.state.editorToggled} enableEditorMode={this.enableEditorMode}
                   buttonSize={this.state.buttonSize} resizeButton={this.resizeButton}
                   open={this.open} close={this.close} showModal={this.state.showModal}
                   coreListTitles={this.state.coreListTitles} handleAddNewWord={this.handleAddNewWord}
                   handleAddNewImage={this.handleAddNewImage}
                   fringeListTitles={this.state.fringeListTitles}/>
    )
  }

  /**
   * Basic React render function, renders the component.
   */
  render() {

    //Get the Browser's voices loaded before anything. Allows syncing
    //of SettingsBar voices
    speechSynthesis.getVoices();

    // Render the SettingsBar only if the settingsBarVisible state variable is true
    let settingsBar = this.state.settingsBarVisible
      ? this.renderSettingsBar()
      : null;


    // fix below when the function to detect the window height works...
    // <Grid className="LayoutGrid" fluid="true" style={{ height: this.state.maxHeight }} >


    return (
      <div className="App">

        <Grid className="LayoutGrid">
          <Row className="SpeechSettingsRow">
            <SpeechBar
              message={this.state.messageArray}
              handleClearMessage={this.handleClearMessage}
              selectedVoice={this.state.selectedVoice}
              handleBackButton={this.handleBackButton}
              settingsToggle={this.settingsToggle}/>

            <div className="Settings">
              {settingsBar}
            </div>
          </Row>

          <Row className="FringeVocabRow"  >

            <Col xs={8} md={4} className="FringeCol">
              <Vocab cols={this.state.fringeColArray} add={this.addWordToSpeechBar}
                     selectedVoice={this.state.selectedVoice} editorToggle={this.state.editorToggle}
                     removeFromGrid={this.handleDelete}/>
            </Col>

            <Col xs={12} md={8} className="VocabCol">
              <Vocab
                     cols={this.state.colArray} add={this.addWordToSpeechBar}
                     selectedVoice={this.state.selectedVoice} editorToggle={this.state.editorToggle}
                     removeFromGrid={this.handleDelete}/>
            </Col>

            {this.renderRemoveWordModal()}

          </Row>

        </Grid>
      </div>


    );
  }
}

export default App;
