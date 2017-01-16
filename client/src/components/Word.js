import React, { Component } from 'react';

class Word extends Component {

    constructor(props) {
        super(props)

        this.speak = this.speak.bind(this);

        this.state = {
            text: "Love",
            symbol: "Symbol"
        }
    }

    speak (){
      var word = new SpeechSynthesisUtterance(this.state.text);
      window.speechSynthesis.speak(word);
    }

    clicked (){
        alert("this is just a test");
    }
    render() {
       return (
           <div>
               <div>
                  {this.state.symbol}
               </div>
                <br/>
                <button onClick={this.speak}>{this.state.text}</button>
            </div>
       );
    }

}

export default Word;
