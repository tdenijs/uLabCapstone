import React, {Component} from 'react';
import {ButtonToolbar, Button, Glyphicon } from 'react-bootstrap';
import Word from './Word'

class SpeechBar extends Component {
  constructor(props) {
    super(props);

    this.messageString = this.messageString.bind(this);
    this.speakMessage = this.speakMessage.bind(this);
    this.renderMessageWindow = this.renderMessageWindow.bind(this);

    this.state = {
      btnSize: "large",
    }

  }


  //reduces the message array into one string (improves interpretation of speech)
  messageString() {
    if (this.props.message.length >= 1) {
      var text = ""
      for (let item of this.props.message) {
        text += item.word + " ";
      }
    }
    return text;
  }


  speakMessage(e) {
    e.preventDefault();
    var voices = speechSynthesis.getVoices();
    var selectedVoice = this.props.selectedVoice;
    var msg = new SpeechSynthesisUtterance();
    for(var i = 0; i < voices.length; i++) {
	if(voices[i].name === selectedVoice) {
		msg.voice = voices[i];
		break;
	}
    }

    if (this.props.message.length >= 1) {
      msg.text = this.messageString();
    }
    else {
      msg.text = "The message window is empty."
    }

    window.speechSynthesis.speak(msg);
  }


  renderMessageWindow() {
    return (
      <div className="MessageWindow" >
        {
          this.props.message.map(({id, word, src, alt}) => {
              return ( <Word key={id} id={id} text={word} src={src} alt={alt}/> );
            }
          )}
      </div>
    )
  }


  render() {

    return (
      <div id="speechBar">

        <ButtonToolbar bsSize={this.state.btnSize}>
          <Button id="playButton" bsStyle="success" onClick={this.speakMessage}><Glyphicon glyph="glyphicon glyphicon-play" aria-label="Play Button"/> </Button>
          {this.renderMessageWindow()}
          <Button id="backspaceButton" bsStyle="primary" onClick={this.props.handleBackButton}><Glyphicon glyph="glyphicon glyphicon-step-backward" aria-label="Backspace Button"/> </Button>
          <Button id="clearButton" bsStyle="warning" onClick={this.props.handleClearMessage}><Glyphicon glyph="glyphicon glyphicon-remove-sign" aria-label="Clear Message Button"/> </Button>
          <Button id="settingsButton" bsStyle="info" onClick={this.props.settingsToggle}><Glyphicon glyph="glyphicon glyphicon-cog" aria-label="Open Settings Button"/> </Button>

        </ButtonToolbar>
      </div>
    );
  }
}


SpeechBar.propTypes = {
  message: React.PropTypes.array,
  handleClearMessage: React.PropTypes.func,
  handleBackButton: React.PropTypes.func,
  selectedVoice: React.PropTypes.string,
  settingsToggle: React.PropTypes.func,
};


export default SpeechBar;
