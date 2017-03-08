/*******************************************************************
 * Copyright (c) 2016 Portland State University CS Capstone Team
 *
 * Authors: Siggy Hinds, Jiaqi Luo, Christopher Monk, Tristan de Nijs,
 *          Simone Talla Silatchom, Carson Volker, Anton Zipper
 *
 * This file is part of uLabCapstone, distributed under the MIT
 * open source license. For full terms see the LICENSE.md file
 * included in the root of this project.
 *******************************************************************/

import React, {Component} from 'react';
import Column from './Column'
import _ from 'lodash';

class Vocab extends Component {
  /**
   * Basic React render function, renders the component.
   */
  render() {

    console.log('from vocab: cols -- ', this.props.cols )

    // Make sure the cols are in the right order
    let sortedCols = _.sortBy(this.props.cols, 'order');


    return (
      <div className="VocabContainer" style={{height: this.props.maxHeight}}>
        {
          sortedCols.map(({id, title, words}) => {
            return (<Column key={_.uniqueId()} col_id={id} title={title} words={words} add={this.props.add}
                            selectedVoice={this.props.selectedVoice} editorToggle={this.props.editorToggle}
                            removeFromGrid={this.props.removeFromGrid}
                            maxHeight={this.props.maxHeight}
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
    words: [{id: "1", word:"love", src:"img/blank.png", alt:""}]
  }],
};

export default Vocab;
