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
import {Row, Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import '../css/WordEditor.css';
import $ from 'jquery';


class WordEditor extends Component {
  /**
   * Constructor
   * @param props : The parent (see ../App.js)
   */
  constructor(props) {

    super(props);

    this.setWordText = this.setWordText.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
    this.updateLists = this.updateLists.bind(this);

    this.state = {
      file: '',
      imagePreviewURL: '',
      selectedVocabulary: 'core',
      selectedTitle: this.props.coreListTitles[0], //Defaults to core
      listTitles: this.props.coreListTitles, //Defaults to core
      wordText: '',
      imgUrl: '',
    };

  }

  /**
   * Handles submitting the Form
   * Takes care of sending Word Text, Image, Grid Type, List Type
   * @param e : The event being passed in.
   */
  _handleSubmit(e) {
    e.preventDefault();

    var fileSelected = this.state.file === '' ?
                       false
                     : true;
    var newFileName = '';
    // Create new file name base on user text and file type selected
    if (fileSelected) {
      switch (this.state.file.type) {
        case 'image/png':
          newFileName = this.state.wordText.concat('.png');
          break;
        case 'image/jpg':
          newFileName = this.state.wordText.concat('.jpg');
          break;
        case 'image/jpeg':
          newFileName = this.state.wordText.concat('.jpeg');
          break;
        default:
          console.log('Invalid file type');

      }
      // create from data for API POST call to /imgupload
      const formData = new FormData();
      formData.append('userfile', $('input[type=file]')[0].files[0], newFileName);

      // Uplood image via API call
      console.log("Uploading image...");
      this.props.handleAddNewImage(formData);
    }

    var voices = speechSynthesis.getVoices();
    var selectedVoice = this.props.selectedVoice;
    var msg = new SpeechSynthesisUtterance();
    //Divide the pitch and rate by 10 because we use 1 to 20, but
    //rate and pitch require 0.1 to 2.0 (easier to visualize 1 to 20)
    msg.rate = this.props.selectedVoiceRate / 10;
    msg.pitch = this.props.selectedVoicePitch / 10;
    for(var i = 0; i < voices.length; i++) {
      if(voices[i].name === selectedVoice) {
         msg.voice = voices[i];
         break;
      }
    }

    // Check for an empty string and a string with more than 25 characters
    // If they inputted no words, tell them the text box is empty.
    if(this.state.wordText.length > 25){
      msg.text = "please enter less than 25 characters"
    }
    else if (this.state.wordText.length >= 1) {
      console.log('Submit New Word: ');
      this.props.handleAddNewWord(this.state.wordText, newFileName, this.state.selectedTitle, this.state.selectedVocabulary, fileSelected);

      this.props.close(); //close modal
    }
    else {
      msg.text = "The text box is empty."
    }

    window.speechSynthesis.speak(msg); //Speak the inputted text.

    this.props.close(); //close the WordEditor
  }


  /**
   * Handles the image being changed. Sets the image preview
   * @param e : The event being passed in.
   */
  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }


  /**
   * Sets the state for wordText to be the value of the event.
   * @param e : The event being passed in, value is the text.
   */
  setWordText(e){
    this.setState({wordText: e.target.value});
  }

  /**
   * Updates listTitles to either Core's lists or Fringe's lists
   * Then sets the selectedTitle to the first item in the list
   * @param e : The event being passed in, either "core" or "fringe".
   */
  updateLists(e){
    if(e === "core") {
        this.setState({listTitles: this.props.coreListTitles});
	this.setState({selectedTitle: this.props.coreListTitles[0]});
    }
    if(e === "fringe") {
        this.setState({listTitles: this.props.fringeListTitles});
	this.setState({selectedTitle: this.props.fringeListTitles[0]});
    }
  }


  /**
   * Basic React render function, renders the component.
   */
  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} role="presentation"/>);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }


    return (
      <div className="WordEditor">
        <h1>Add New Word</h1>

        <Row >
          <Col xs={12} md={6} lg={6}>
            <div className="imgPreview"> {$imagePreview} </div>
            <div className="wordPreview">{this.state.wordText} </div>
          </Col>

          <Col xs={12} md={6} lg={6}>
            <form className="AddNewWordForm" >
              <label> New Word Text: </label>
              <input type="text" name="word_text" className="WordTextInput" placeholder="Enter text" onChange={this.setWordText}/>
              <Row>
                <Col xs={12}>
                  <label>Choose an Image: </label>
                </Col>
                <Col xs={12}>
                  <input type="file" name="newfile" className="FileInputButton"
                      onChange={(e) => this._handleImageChange(e)}
                      accept="image/jpeg, image/png, image/jpg"/>
                </Col>
              </Row>

	      <Row>
	      <label>Add to Vocabulary: </label>
	      <select className="VocabTitles" defaultValue={this.state.selectedVocabulary}
                      onChange={(e) => {this.setState({selectedVocabulary: e.target.value});
                                         this.updateLists(e.target.value)}}>
		      <option key="core" value="core">Core</option>
		      <option key="fringe" value="fringe">Fringe</option>
	      </select>
	      </Row>

              <label>Add to List: </label>

              <select className="ListTitles" defaultValue={this.state.selectedTitle}
                      onChange={(e) => {
                        this.setState({selectedTitle: e.target.value})
                      }}>
                {
                  this.state.listTitles.map((title) => {
                    return <option key={title} value={title}>{title}</option>
                  })
                }
              </select>
            </form>
          </Col>
        </Row>
        <div className="modal-footer">

          <Button className="CancelNewWord" bsStyle="danger" onClick={this.props.close}>Cancel</Button>
          <Button type="submit" className="SaveNewWord" bsStyle="primary" onClick={this._handleSubmit}>Save</Button>

        </div>


      </div>
    );

  }
}

WordEditor.propTypes = {
  close: React.PropTypes.func,
  handleAddNewWord: React.PropTypes.func,
  handleAddNewImage: React.PropTypes.func
};


export default WordEditor;
