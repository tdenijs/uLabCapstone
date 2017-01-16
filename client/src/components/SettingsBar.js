import React, {Component} from 'react';

class SettingsBar extends Component {
    render() {
        // Disable the dropdown menu if the settingsLocked prop is true
        let disabled = this.props.settingsLocked ? 'disabled' : null;

        // Check the checkbox if the settingsLocked prop is true
        let checked = this.props.settingsLocked ? 'checked' : null;

        return (
            <div>
                <select defaultValue={this.props.selectedLanguage} onChange={this.props.updateLanguage}
                        disabled={disabled}>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                </select>
                <p>
                    <input type="checkbox" onClick={this.props.lockToggle} checked={checked}/>
                    Lock Settings
                </p>
            </div>
        );
    }
}

SettingsBar.propTypes = {
    updateLanguage: React.PropTypes.func,
    lockToggle: React.PropTypes.func,
};

export default SettingsBar;

