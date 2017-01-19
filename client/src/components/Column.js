import React, {Component} from 'react';
import Word from './Word'

import React, {Component} from 'react';
import Word from './Word'

class Column extends Component {
    render() {
        return (
            <div>
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

Column.defaultProps = {
    words: []
};

export default Column;