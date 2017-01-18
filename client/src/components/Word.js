import React, { Component } from 'react';

class Word extends Component {

    constructor(props) {
        super(props)

        this.speak = this.speak.bind(this);
        this.clicked = this.clicked.bind(this);

    }

    speak (){
      var word = new SpeechSynthesisUtterance(this.props.wordtext);
      window.speechSynthesis.speak(word);
    }

    clicked (){
        alert("this is just a test");
    }
    render() {
       return (
           <div>
               <div>
                  {this.props.wordsymbol}
               </div>
                <br/>
                <button onClick={this.speak}>{this.props.wordtext}</button>
            </div>
       );
    }

}

export default Word;
