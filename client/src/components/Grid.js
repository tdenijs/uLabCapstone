import React, {Component} from 'react';
import Column from './Column'
import _ from 'lodash';

class Grid extends Component {
  render() {
    // Make sure the cols are in the right order
    let sortedCols = _.sortBy(this.props.cols, 'title');

    return (
      <div id="grid">
        {
          sortedCols.map(({title, words}) => {
            return (<Column key={_.uniqueId()} title={title} words={words} add={this.props.add}/>);
          })
        }
      </div>
    );
  }
}

Grid.propTypes = {
  cols: React.PropTypes.array,
  add: React.PropTypes.func,
};

Grid.defaultProps = {
  cols: [{
    title: "test",
    words: [{id: "1", word:"love", symbol_path:"", alt:""}]
  }],
};

export default Grid;
