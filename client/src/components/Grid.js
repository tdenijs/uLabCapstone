import React, {Component} from 'react';
import Column from './Column'

class Grid extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style={{ margin: "auto", border: "solid", color: "purple" }}>
                <Column words={this.props.words} add={this.props.add}/>
            </div>
        );
    }
}

Grid.propTypes = {
    words: React.PropTypes.array,
    add: React.PropTypes.func,
};

export default Grid;