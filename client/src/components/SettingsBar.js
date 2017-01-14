import React, {Component} from 'react';

class SettingsBar extends Component {
    render() {

        return (
            <div>
                <select defaultValue={this.props.selectedLanguage} onChange={this.props.updateLanguage} >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                </select>
                <p>
                    <input type="checkbox" />
                    Lock Settings
                </p>
            </div>
        );
    }
}

SettingsBar.propTypes = {
    updateLanguage: React.PropTypes.func,
};

export default SettingsBar;

