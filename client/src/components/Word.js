/*******************************************************************
 * Copyright (c) 2016 Portland State University CS Capstone Team
 *
 * Authors: Siggy Hinds, Jiaqi Luo, Christopher Monk, Tristan de Nijs,
 *          Simone Talla Silatchom, Carson Volker, Anton Zipper
 *
 * This file is part of uLabCapstone, distributed under the MIT
 * open source license. For full terms see the LICENSE.md file
 * included in the root of this project.
 *******************************************************************
 * This is the Word component. It functions as a button for the rest
 * of the application. It has a picture and text. Upon being clicked,
 * the SpeechSynthesis will speak the text and the App will place the
 * word and picture into the SpeechBar component.
 * Words also get a deletion button if EditorMode is enabled in the
 * parent application, which allows them to delete the Word from it's
 * respective list, as well as the database.
 *******************************************************************/


import React, {Component} from 'react';
import { Glyphicon } from 'react-bootstrap';

class Word extends Component {
  /**
   * Constructor
   * @param props : The parent (see ../App.js)
   */
  constructor(props) {
    super(props);

    this.speak = this.speak.bind(this);
  }


  /**
   * speak()
   * Speaks this word's text and adds that word to the SpeechBar (See ./SpeechBar.js)
   */
  speak() {
    // Add text of the Word to speechBar
    var word = {
      id: this.props.id,
      word: this.props.text,
      src: this.props.src,
      alt: this.props.alt
    };

    this.props.add(word);

    // Speak the text of the Word
    var spokenWord = new SpeechSynthesisUtterance(this.props.text);

    var voices = speechSynthesis.getVoices();
    console.log("selected voice: ", this.props.selectedVoice );
    var chosenVoice = this.props.selectedVoice;
    //Divide the pitch and rate by 10 because we use 1 to 20, but
    //rate and pitch require 0.1 to 2.0 (easier to visualize 1 to 20)
    spokenWord.rate = this.props.selectedVoiceRate / 10;
    spokenWord.pitch = this.props.selectedVoicePitch / 10;

    for (var i = 0; i < voices.length; i++) {
      if (voices[i].name === chosenVoice) {
        spokenWord.voice = voices[i];
        break;
      }
    }
    speechSynthesis.speak(spokenWord);
  }

  // <Glyphicon glyph="glyphicon glyphicon-remove-sign" aria-label="Clear Message Button"/>

  /**
   * Basic React render function, renders the component.
   */
  render() {
      // Only show the delete button on a word if editorToggle is true
      let deleteButton = this.props.editorToggle ?
          <div className="DeleteButton" onClick={() => this.props.removeFromGrid(this.props.text, this.props.id, this.props.col_id)}>
            <Glyphicon glyph="glyphicon glyphicon-remove-sign" aria-label="delete word"/>
          </div>
          : null;

      return (
        <div className="Word">
            {deleteButton}
            <div className="WordSymbol" onClick={this.speak}>
                <img src={this.props.src} data-pin-nopin="true" alt={this.props.alt}/>
            </div>
            <div className="WordText" onClick={this.speak}>{this.props.text}</div>
        </div>
      );
  }


}

Word.propTypes = {
  add: React.PropTypes.func,
};

Word.defaultProps = {
  id: "1",
  word: "love",
  src: "img/blank.png",
  alt: ""
};

export default Word;
