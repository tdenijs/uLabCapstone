import React, { Component } from 'react';

class Word extends Component {

    constructor(props) {
        super(props)

        this.state = {
            text: "Love",
            symbol: "Symbol"
        }
    }

    render() {
       return (
           <div>
               {this.state.symbol}
                <br/>
                {this.state.text}
            </div>
       );
    }

}

export default Word;