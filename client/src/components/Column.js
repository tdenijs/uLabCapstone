import React, {Component} from 'react';
import Word from './Word'

class Column extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ margin: "auto", border: "solid", color: "pink" }}>
                {
                    this.props.words.map((id, word, symbol) =>
                        <Word key={id} wordText={word} wordSymbol={symbol} add={this.props.add}/>
                    )
                }
            </div>
        );
    }
}

Column.propTypes = {
    words: React.PropTypes.array,
    add: React.PropTypes.func,
};

export default Column;