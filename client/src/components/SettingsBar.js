/***************************************************************
 * Copyright (c) 2016 Universal Design Lab. All rights reserved.
 *
 * This file is part of uLabCapstone, distibuted under the MIT
 * open source licence. For full terms see the LICENSE.md file
 * included in the root of this project.
 **************************************************************/

import React, {Component} from 'react';
import {Row, Col,} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import WordEditor from './WordEditor.js';
// DropdownButton, MenuItem


class SettingsBar extends Component {
  constructor(props) {
    super(props);


    var voices = speechSynthesis.getVoices();

    this.state = {
      selectedVoice: voices[0] && voices[0].value,
      voices,
      //showModal: false,

    }
  }

  // <Col xs={12} md={4}>
  // <form className="ButtonSizeForm">
  // <label className="ButtonSizeLabel">Button Size</label>
  // <output className="ButtonSizeOutput">{this.props.buttonSize}</output>
  // <input className="ButtonSizeSlider" type="range"
  // value={this.props.buttonSize} onChange={this.props.resizeButton}
  // min="0" max="10" disabled={disabled} style={{margin: "auto", width: "200px"}}/>
  // </form>
  // </Col>


  render() {
    // Disable the dropdown menu if the settingsLocked prop is true
    let disabled = this.props.settingsLocked ? 'disabled' : '';

    // Check the checkbox if the settingsLocked prop is true
    let checked = this.props.settingsLocked ? 'checked' : '';

    return (
      <div className="SettingsBar">
        <Row>

          {/* Voice Options */}
          <Col xs={12} md={3}>
            <form className="VoiceForm">
              <label className="VoiceLabel">Voice</label>
              <select className="VoiceMenu" defaultValue={this.state.selectedVoice} disabled={disabled}
                      onChange={(e) => {
                        this.setState({selectedVoice: e.target.value});
                        this.props.updateVoice(e)
                      }}>
                {
                  this.state.voices.map((voice) => {
                    return <option key={voice.name} value={voice && voice.value}>{voice.name}</option>
                  })
                }
              </select>
            </form>
          </Col>

          {/* Add Button */}
          <Col xs={4} md={3}>
            <button className="AddButton" onClick={this.props.open} disabled={disabled}>Add New Word</button>
            <Modal
              contentLabel="Modal"
              aria-labelledby='modal-label'
              show={this.props.showModal}
              onHide={this.props.close}>
              <WordEditor
                coreListTitles={this.props.coreListTitles}
                close={this.props.close}
                handleAddNewWord={this.props.handleAddNewWord}/>
            </Modal>
          </Col>

          {/* Editor Button, allows you to delete words */}
          <Col xs={4} md={3}>
            <button className="EditorButton" onClick={this.props.enableEditorMode} disabled={disabled}>Delete a Word
            </button>
          </Col>

          {/* Lock Settings */}
          <Col xs={4} md={3}>
            <input type="checkbox" className="LockCheck" onChange={this.props.lockToggle} checked={checked}/>
            Lock Setting
          </Col>

        </Row>
      </div>
    );
  }
}


SettingsBar.propTypes = {
  updateVoice: React.PropTypes.func,
  lockToggle: React.PropTypes.func,
  enableEditorMode: React.PropTypes.func,
  open: React.PropTypes.func,
  close: React.PropTypes.func,
  handleAddNewWord: React.PropTypes.func,
};

export default SettingsBar;
