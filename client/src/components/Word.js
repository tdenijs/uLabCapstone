import React, { Component } from 'react';

class Word extends Component {

    constructor(props) {
        super(props);

        this.speak = this.speak.bind(this);
        this.clicked = this.clicked.bind(this);

    }

    speak (){
      var word = new SpeechSynthesisUtterance(this.props.text);
      window.speechSynthesis.speak(word);
        this.props.add(this.props.text);
    }

    clicked (){
        alert("this is just a test");
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
