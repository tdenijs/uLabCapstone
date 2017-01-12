import React, {Component} from 'react';


class SpeechBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "message placeholder...",
                    //this is the message appearing in the message window
                    //TODO change to diff data structure (array)
        }

    }

    render() {
        return (
            <div>
                <button>Play</button>
                <div id="messageWindow">{this.state.message} </div>
                <button>Back</button>
                <button>Clear</button>
            </div>

        );
    }
}

export default SpeechBar;