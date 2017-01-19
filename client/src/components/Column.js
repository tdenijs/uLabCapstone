import React, {Component} from 'react';
import Word from './Word'

class Column extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ margin: "auto", border: "solid", width: "300px", color: "pink" }}>
                {
                    this.props.words.map(({id, word, symbol}) => {
                        return (
                            <Word key={id} text={word} symbol={symbol} add={this.props.add}/>
                        );
                    })
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