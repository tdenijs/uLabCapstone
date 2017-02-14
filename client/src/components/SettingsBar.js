import React, {Component} from 'react';
import {Row, Col, } from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import WordEditor from './WordEditor.js';
// DropdownButton, MenuItem


class SettingsBar extends Component {
  constructor(props) {
    super(props);

    var voices = speechSynthesis.getVoices();
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);

    this.state = {
	    selectedVoice: voices[0] && voices[0].value,
	    voices,
	    showModal: false,

    }
  }

  // MODAL SETTINGS
   close(){
        this.setState({showModal: false});
   }
   open(){
        this.setState({showModal: true});
   }


  render() {
    // Disable the dropdown menu if the settingsLocked prop is true
    let disabled = this.props.settingsLocked ? 'disabled' : '';

    // Check the checkbox if the settingsLocked prop is true
    let checked = this.props.settingsLocked ? 'checked' : '';

    return (
      <div className="SettingsBar">
	<Row>
          <Col xs={12} md={4}>
            <form className="VoiceForm">
              <label className="VoiceLabel">Voice</label>
              <select className="VoiceMenu" defaultValue={this.state.selectedVoice} disabled={disabled}
                      onChange={(e) => {this.setState({selectedVoice: e.target.value});
		      		this.props.updateVoice(e)}} >
                {
                    this.state.voices.map((voice) => {
			return <option key={voice.name} value={voice && voice.value}>{voice.name}</option>
		    })
 		}/
              </select>
            </form>


          </Col>
          <Col xs={12} md={4}>
            <form className="ButtonSizeForm">
              <label className="ButtonSizeLabel">Button Size</label>
              <output className="ButtonSizeOutput">{this.props.buttonSize}</output>
              <input className="ButtonSizeSlider" type="range"
                     value={this.props.buttonSize} onChange={this.props.resizeButton}
                     min="0" max="10" disabled={disabled} style={{margin: "auto", width: "200px"}}/>
            </form>
          </Col>

          <Col xs={12} md={4}>
            <input type="checkbox" className="LockCheck" onChange={this.props.lockToggle} checked={checked}/>
            Lock Setting
          </Col>

        </Row>
	<Row>
	  <Col xs={12} md={6}>
	    <button className="AddButton" onClick={this.open} disabled={disabled}>Add Button</button>

	    <Modal
	        contentLabel="Modal"
                aria-labelledby='modal-label'
                show={this.state.showModal}
                onHide={this.close}>

	        <WordEditor/>

	    </Modal>

	  </Col>
	  <Col xs={12} md={6}>
	    <button className="EditorButton" onClick={this.props.enableEditorMode} disabled={disabled}>Editor Mode</button>
	  </Col>
	</Row>
      </div>
    );
  }
}


SettingsBar.propTypes = {
  resizeButton: React.PropTypes.func,
  updateVoice: React.PropTypes.func,
  lockToggle: React.PropTypes.func,
  enableEditorMode: React.PropTypes.func,
};

export default SettingsBar;







