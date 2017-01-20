import React, { Component } from 'react';

class Word extends Component {

    constructor(props) {
        super(props);

        this.speak = this.speak.bind(this);
    }

    speak (){
        // Add text of the Word to speechBar
        this.props.add(this.props.text);

        // Speak the text of the Word
        var spokenWord = new SpeechSynthesisUtterance(this.props.text);
        window.speechSynthesis.speak(spokenWord);
    }

    render() {
       return (
           <div className="Word" style={{ margin: "auto", width: "100px", border: "solid", color: "blue" }}>
               <div>
                  {this.props.symbol}
               </div>
                <br/>
                <button className="WordButton" onClick={this.speak}>{this.props.text}</button>
            </div>
       );
    }

}

Word.propTypes = {
    add: React.PropTypes.func,
};

export default Word;
