import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

class SettingsBar extends Component {


  render() {
    // Disable the dropdown menu if the settingsLocked prop is true
    let disabled = this.props.settingsLocked ? 'disabled' : '';

    // Check the checkbox if the settingsLocked prop is true
    let checked = this.props.settingsLocked ? 'checked' : '';

    return (
      <div id="settingsBar">
        <Row>
          <Col xs={12} md={4}>
            <form id="langForm">
              <label id="langLabel">Language: </label>
              <select id="langMenu" defaultValue={this.props.selectedLanguage}
                      onChange={this.props.updateLanguage} disabled={disabled}>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
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
  updateLanguage: React.PropTypes.func,
  lockToggle: React.PropTypes.func,
  resizeButton: React.PropTypes.func,
};

export default SettingsBar;

