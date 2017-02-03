import React, {Component} from 'react';
import {Row, Col, } from 'react-bootstrap';
// DropdownButton, MenuItem

class SettingsBar extends Component {
  constructor(props) {
    super(props);

    var voices = speechSynthesis.getVoices();

    this.state = {
	selectedVoice: voices[0] && voices[0].value,
	voices, 
    }
  }



  render() {

    // Disable the dropdown menu if the settingsLocked prop is true
    let disabled = this.props.settingsLocked ? 'disabled' : '';

    // Check the checkbox if the settingsLocked prop is true
    let checked = this.props.settingsLocked ? 'checked' : '';

    return (
      <div id="settingsBar">
        <Row>

          <Col xs={12} md={4}>
            <form id="option">
              <label id="voiceLabel">Voice</label>
              <select id="voice" defaultValue={this.state.selectedVoice} disabled={disabled}
                      onChange={(e) => {this.setState({selectedVoice: e.target.value}); 
		      		this.props.updateVoice(e)}} > 
                {
                    this.state.voices.map((voice) => {
			return <option key={voice.name} value={voice && voice.value}>{voice.name}</option>
		    })
 		}
              </select>
            </form>


          </Col>

          <Col xs={12} md={4}>
            <form id="buttonSizeForm">
              <label id="buttonSizeLabel">Button Size</label>
              <output id="buttonSizeOutput">{this.props.buttonSize}</output>
              <input id="buttonSizeSlider" type="range"
                     value={this.props.buttonSize} onChange={this.props.resizeButton}
                     min="0" max="10" disabled={disabled} style={{margin: "auto", width: "200px"}}/>
            </form>
          </Col>

          <Col xs={12} md={4}>
            <input type="checkbox" id="lockCheck" onChange={this.props.lockToggle} checked={checked}/>
            Lock Settings
          </Col>

        </Row>
      </div>
    );
  }
}


SettingsBar.propTypes = {
  lockToggle: React.PropTypes.func,
  resizeButton: React.PropTypes.func,
  updateVoice: React.PropTypes.func,
};

export default SettingsBar;







