import React, {Component} from 'react';
import Column from './Column'

import React, {Component} from 'react';
import Column from './Column'

class Grid extends Component {
    render() {
        return(
            <div>
                <Column words={this.props.words} add={this.props.add}/>
            </div>
        );
    }
}

Grid.propTypes = {
    words: React.PropTypes.array,
    add: React.PropTypes.func,
};

Grid.defaultProps = {
    words: [],
};

export default Grid;