import React, {Component} from 'react';


class SpeechBar extends Component {
    constructor(props) {
        super(props);

        this.messageString = this.messageString.bind(this);
        this.speakMessage = this.speakMessage.bind(this);
        this.handleBackSpace = this.handleBackSpace.bind(this);
        this.handleClear = this.handleClear.bind(this);

        this.state = {
            message: ['I', 'Love', 'you'], // array: message appearing in the message window
        }
    }



    //reduces the message array into one string (improves interpretation of speech)
    messageString() {
        if(this.state.message.length > 1)
            return this.state.message.join(' ');
    }



    speakMessage(e) {
        e.preventDefault();

        var msg = new SpeechSynthesisUtterance();

        if (this.state.message !== '') { msg.text = this.messageString(); }
        else { msg.text= "The message window is empty." }

        window.speechSynthesis.speak(msg);
    }



    handleBackSpace(e) {
        e.preventDefault();

        // var updateMsg = this.state.message.pop();
        // this.setState({ message: updateMsg });


        // if(this.state.message.length >= 0) {
        //     debugger
        //     var newMessage = this.state.message.pop()
        //     this.setState({message: newMessage});
        //     console.log('after backspace ' + this.state.message);
        // }

        this.setState(state => {
            this.state.message.pop();
            return {items: this.state.message};
        })

    }



    handleClear() {
        this.setState({message: ""});
    }



    render() {

        var text = this.messageString()

        return (
            <div id="speechBar" style={{ margin: "auto", border: "solid", color: "green" }}>
                <button onClick={this.speakMessage} > Play </button>
                <div id="messageWindow">{ text } </div>
                <button > BackSpace</button>
                <button onClick={this.handleClear} >Clear</button>
            </div>

        );
    }
}

export default SpeechBar;