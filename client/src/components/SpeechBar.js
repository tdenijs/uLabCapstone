import React, {Component} from 'react';
import {ButtonGroup} from 'react-bootstrap';
import Word from './Word'

class SpeechBar extends Component {
  constructor(props) {
    super(props);

    this.messageString = this.messageString.bind(this);
    this.speakMessage = this.speakMessage.bind(this);
    this.renderMessageWindow = this.renderMessageWindow.bind(this);
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
    // return this.props.message.join(' ');
  }


  speakMessage(e) {
    e.preventDefault();

    var msg = new SpeechSynthesisUtterance();

    console.log(this.messageString());

    if (this.props.message.length >= 1) {
      msg.text = this.messageString();
    }
    else {
      msg.text = "The message window is empty."
    }

    window.speechSynthesis.speak(msg);
  }


  renderMessageWindow() {   // trying to output the images
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
        <ButtonGroup>
          <button id="playButton" onClick={this.speakMessage}> Play</button>

          {this.renderMessageWindow()}

          <button id="backspaceButton" onClick={this.props.handleBackButton}>BackSpace</button>
          <button id="clearButton" onClick={this.props.handleClearMessageButton}>Clear</button>
        </ButtonGroup>
      </div>
    );
  }
}


SpeechBar.propTypes = {
  message: React.PropTypes.array,
  handleClearMessageButton: React.PropTypes.func,
  handleBackButton: React.PropTypes.func,
};


export default SpeechBar;
