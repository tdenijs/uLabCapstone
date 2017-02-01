import React, {Component} from 'react';
import Word from './Word'
import _ from 'lodash';

class Column extends Component {
  render() {
    return (
      <div className="Column">
        {this.props.title}
        {
          this.props.words.map(({id, word, symbol_path, alt}) => {
            return (
              <Word key={_.uniqueId()} id={id} text={word} src={symbol_path} alt={alt} add={this.props.add}/>
            );
          })
        }
        <br/>
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
