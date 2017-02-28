/***************************************************************
 * Copyright (c) 2016 Universal Design Lab. All rights reserved.
 *
 * This file is part of uLabCapstone, distibuted under the MIT
 * open source licence. For full terms see the LICENSE.md file
 * included in the root of this project.
 **************************************************************/

import React, {Component} from 'react';
import {Modal, Glyphicon} from 'react-bootstrap';
import WordEditor from './WordEditor.js';



class SettingsBar extends Component {
  constructor(props) {
    super(props);

    this.renderLock = this.renderLock.bind(this);

    var voices = speechSynthesis.getVoices();

    this.state = {
      selectedVoice: voices[0] && voices[0].value,
      voices,
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


  renderLock() {
    // Check the checkbox if the settingsLocked prop is true
    // let checked = this.props.settingsLocked ? 'checked' : '';

    // <input type="checkbox" className="LockCheck" onChange={this.props.lockToggle} checked={checked}/>
    console.log("settings is locked: ", this.props.settingsLocked);

    let lock = this.props.settingsLocked
      ? <span><Glyphicon className="Locked" glyph="glyphicon glyphicon-lock" aria-hidden="true"/> Unlock </span>
      : <span><Glyphicon className="Unlocked" glyph="glyphicon glyphicon-lock" aria-hidden="true"/>Lock..</span>;

    return(
      <div className={"LockSetting" + (this.props.settingsLocked ? '-locked' : '')} onClick={this.props.lockToggle}>

        <span className="Lock">{lock}</span>

      </div>
    );
  }

  render() {
    // Disable the dropdown menu if the settingsLocked prop is true
    let disabled = this.props.settingsLocked ? 'disabled' : '';

    return (
      <div className="SettingsBar">

        {/* Voice Options */}
        <form className="VoiceForm">
          <label className={"VoiceLabel" + (this.props.settingsLocked ? '-locked' : '')}>Voice</label>
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

        {/* Add Button */}
        <button className={"AddButton" + (this.props.settingsLocked ? '-locked' : '')} onClick={this.props.open} disabled={disabled}>Add New Word</button>
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

        {/* Editor Button, allows you to delete words */}
        <button className={"EditorButton"+ (this.props.settingsLocked ? '-locked' : '')} onClick={this.props.enableEditorMode} disabled={disabled}>Delete a Word
        </button>

          { this.renderLock() }

      </div>
    );
  }
}

// <div className={"btn-group pull-right " + (this.props.showBulkActions ? 'show' : 'hidden')}>



SettingsBar.propTypes = {
  updateVoice: React.PropTypes.func,
  lockToggle: React.PropTypes.func,
  enableEditorMode: React.PropTypes.func,
  open: React.PropTypes.func,
  close: React.PropTypes.func,
  handleAddNewWord: React.PropTypes.func,


};

export default SettingsBar;
