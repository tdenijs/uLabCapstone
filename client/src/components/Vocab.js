/*******************************************************************
 * Copyright (c) 2016 Portland State University CS Capstone Team
 *
 * Authors: Siggy Hinds, Jiaqi Luo, Christopher Monk, Tristan de Nijs,
 *                 Simone Talla Silatchom, Carson Volker, Anton Zipper
 *
 * This file is part of uLabCapstone, distributed under the MIT
 * open source licence. For full terms see the LICENSE.md file
 * included in the root of this project.
 *
 *******************************************************************/

import React, {Component} from 'react';
import Column from './Column'
import _ from 'lodash';

class Vocab extends Component {
  render() {
    // Make sure the cols are in the right order
    let sortedCols = _.sortBy(this.props.cols, 'order');

    return (
      <div className="Grid" style={{ height: this.props.maxHeight, border: '6px solid orange', overflow: 'scroll'}}>
        {
          sortedCols.map(({id, title, words}) => {
            return (<Column key={_.uniqueId()} col_id={id} title={title} words={words} add={this.props.add}
                            selectedVoice={this.props.selectedVoice} editorToggle={this.props.editorToggle}
                            removeFromGrid={this.props.removeFromGrid}
              />);
          })
        }
      </div>
    );
  }
}

Vocab.propTypes = {
  cols: React.PropTypes.array,
  add: React.PropTypes.func,
};

Vocab.defaultProps = {
  cols: [{
    id: "0",
    title: "test",
    words: [{id: "1", word:"love", symbol_path:"", alt:""}]
  }],
};

export default Vocab;
