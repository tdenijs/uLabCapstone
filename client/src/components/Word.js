import React, {Component} from 'react';

class Word extends Component {

  constructor(props) {
    super(props);

    this.speak = this.speak.bind(this);
  }

  speak() {
    // Add text of the Word to speechBar
    var word = {
      id: this.props.id,
      word: this.props.text,
      src: this.props.src,
      alt: this.props.alt
    };

    this.props.add(word);

    speechSynthesis.getVoices().forEach(function(voice) {
             console.log(voice.name, voice.default ? voice.default :'');
    });

    // Speak the text of the Word
    var spokenWord = new SpeechSynthesisUtterance(this.props.text);

     var voices= speechSynthesis.getVoices();
     console.log(this.props.selectedVoice);
     var chosenVoice= this.props.selectedVoice;

     for(var i = 0; i < voices.length; i++) {
     	   if(voices[i].name === chosenVoice) {
     		   spokenWord.voice = voices[i];
     		   break;
     	    }
         }
     speechSynthesis.speak(spokenWord);
  }

  render() {
    return (
      <div className="Word" onClick={this.speak}>
        <div className="WordSymbol">
          <img src={this.props.src} data-pin-nopin="true" alt={this.props.alt} />
        </div>
        <div className="WordText">{this.props.text}</div>
      </div>
    );
  }


}

Word.propTypes = {
  add: React.PropTypes.func,
};

Word.defaultProps = {
  id: "1",
  word: "love",
  src: "",
  alt: ""
};

export default Word;
