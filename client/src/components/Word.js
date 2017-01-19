import React, { Component } from 'react';

class Word extends Component {

    constructor(props) {
        super(props);

        this.speak = this.speak.bind(this);

    }

    speak (){
        var word = new SpeechSynthesisUtterance(this.props.text);
        window.speechSynthesis.speak(word);

        // Add word to speech window
        this.props.add(this.props.text);
    }

    render() {
       return (
           <div style={{ margin: "auto", width: "100px", border: "solid", color: "purple" }}>
               <div>
                  {this.props.symbol}
               </div>
                <br/>
                <button onClick={this.speak}>{this.props.text}</button>
            </div>
       );
    }

}

Word.propTypes = {
    add: React.PropTypes.func,
};

export default Word;
