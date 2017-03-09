/*******************************************************************
 * Copyright (c) 2016 Portland State University CS Capstone Team
 *
 * Authors: Siggy Hinds, Jiaqi Luo, Christopher Monk, Tristan de Nijs,
 *          Simone Talla Silatchom, Carson Volker, Anton Zipper
 *
 * This file is part of uLabCapstone, distributed under the MIT
 * open source license. For full terms see the LICENSE.md file
 * included in the root of this project.
 *
 * This component exists for the purpose of creating a column of
 * Word components.
 *******************************************************************/

import React, {Component} from 'react';
import Word from './Word'
import _ from 'lodash';


class Column extends Component {
  /* Different columns will have different colors depending on the part of speech
     or their title.  */

  constructor(props) {
    super(props);
    this.getBackgroundColor = this.getBackgroundColor.bind(this);
  }


  /**
   * getBackgroundColor: returns a hex color dependent on the title
   * @returns {string}
   */
  getBackgroundColor() {
    var color = "grey";  // default color

    switch(this.props.title) {
      case "pronoun":
        color = "#FFA05B"; // orange
        break;
      case "noun":
        color = "#F0D24C"; // yellow
        break;
      case "verb":
        color = "#F98CA6"; // pink
        break;
      case "adjective":
        color = "#449EA8 "; // blue
        break;
      case "adverb":
        color = "#449EA8 "; // blue
        break;
      case "preposition":
        color = "#87D23B";  // bright green
        break;
      case "exclamation":
        color = "#FFA05B"; // orange
        break;
      case "question":
        color = "#FFA05B"; // orange
        break;
      default:
        break;
    }

    console.log("COL. COLOR: " + this.props.title + " " + color);

    return color;
  }


  /**
   * Basic React render function, renders the component.
   */
  render() {

    let colColor = this.getBackgroundColor();

    return (
      <div className="Column" style={{'background-color': colColor }}>
        <div className="ColumnTitle">{this.props.title}</div>
        <div className="WordContainer">
          {
            this.props.words.map(({word_id, word, symbol_path, alt}) => {
              return (
                <Word key={_.uniqueId()} id={word_id} text={word} src={symbol_path}
                      alt={alt} add={this.props.add} selectedVoice={this.props.selectedVoice}
	              selectedVoiceRate={this.props.selectedVoiceRate} selectedVoicePitch={this.props.selectedVoicePitch}
                      editorToggle={this.props.editorToggle}
                      col_id={this.props.col_id} removeFromGrid={this.props.removeFromGrid}/>
              );
            })
          }
        </div>
      </div>
    );
  }
}

Column.propTypes = {
  words: React.PropTypes.array,
  add: React.PropTypes.func,
};

Column.defaultProps = {
  words: [{id: "1", word: "love", symbol_path: "", alt: ""}]
};

export default Column;
