import React, {Component} from 'react';
import Column from './Column'
import _ from 'lodash';

class Grid extends Component {
    render() {
        return(
            <div id="grid">
                {
                    this.props.cols.map(({title, words}) => {
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
    cols: [],
};

export default Grid;