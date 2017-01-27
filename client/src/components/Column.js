import React, {Component} from 'react';
import Word from './Word'

class Column extends Component {
    render() {
        return (
            <div className="Column">
                {
                    this.props.words.map(({id, word, src}) => {
                        return (
                            <Word key={id} text={word} src={src} add={this.props.add}/>
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
