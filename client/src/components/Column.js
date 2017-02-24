import React, {Component} from 'react';
import Word from './Word'
import _ from 'lodash';

class Column extends Component {
  render() {
    return (
      <div className="Column">
        <div className="ColumnTitle">{this.props.title}</div>
        {
          this.props.words.map(({word_id, word, symbol_path, alt}) => {
            return (
              <Word key={_.uniqueId()} id={word_id} text={word} src={symbol_path} alt={alt} add={this.props.add}
                    selectedVoice={this.props.selectedVoice} editorToggle={this.props.editorToggle}
                    columnId={this.props.id} removeFromGrid={this.props.removeFromGrid} />
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
  words: [{id: "1", word:"love", symbol_path:"", alt:""}]
};

export default Column;
