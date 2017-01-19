import React, {Component} from 'react';


class SpeechBar extends Component {
    constructor(props) {
        super(props);

        this.messageString = this.messageString.bind(this);
        this.speakMessage = this.speakMessage.bind(this);
    }



    //reduces the message array into one string (improves interpretation of speech)
    messageString() {
        if(this.props.message.length >= 1)
            return this.props.message.join(' ');
    }



    speakMessage(e) {
        e.preventDefault();

        var msg = new SpeechSynthesisUtterance();

        console.log(this.props.message);

        if (this.props.message.length >= 1) { msg.text = this.messageString(); }
        else { msg.text= "The message window is empty." }

        window.speechSynthesis.speak(msg);
    }



    render() {

        return (
            <div id="speechBar" style={{ margin: "auto", border: "solid", color: "green" }}>
                <button onClick={this.speakMessage} > Play </button>
                <div id="messageWindow">{ this.messageString() } </div>
                <button onClick={this.props.handleBackButton}> Back</button>
                <button onClick={this.props.handleClearMessage} >Clear</button>
            </div>

        );
    }
}


SpeechBar.propTypes = {
  handleClearMessage: React.PropTypes.func,
  handleBackButton: React.PropTypes.func,
};


export default SpeechBar;
