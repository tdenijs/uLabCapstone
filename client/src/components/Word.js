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
import { Glyphicon } from 'react-bootstrap';

class Word extends Component {

  constructor(props) {
    super(props);

    this.speak = this.speak.bind(this);
  }

  speak() {
    // Add text of the Word to speechBar
    var word = {
      id: this.props.id,
      word: this.props.text,
      src: this.props.src,
      alt: this.props.alt
    };

    this.props.add(word);

    // speechSynthesis.getVoices().forEach(function (voice) {
    //   console.log(voice.name, voice.default ? voice.default : '');
    // });

    // Speak the text of the Word
    var spokenWord = new SpeechSynthesisUtterance(this.props.text);

    var voices = speechSynthesis.getVoices();
    console.log("selected voice: ", this.props.selectedVoice );
    var chosenVoice = this.props.selectedVoice;

    for (var i = 0; i < voices.length; i++) {
      if (voices[i].name === chosenVoice) {
        spokenWord.voice = voices[i];
        break;
      }
    }
    speechSynthesis.speak(spokenWord);
  }

  // <Glyphicon glyph="glyphicon glyphicon-remove-sign" aria-label="Clear Message Button"/>

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
