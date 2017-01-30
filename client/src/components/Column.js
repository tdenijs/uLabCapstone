import React, {Component} from 'react';
import Word from './Word'

class Column extends Component {
  render() {
    return (
      <div className="Column">
        {
          this.props.words.map(({id, word, src, alt}) => {
            return (
              <Word key={id} id={id} text={word} src={src} alt={alt} add={this.props.add}/>
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
