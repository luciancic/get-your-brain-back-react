import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeSettings } from "../actions/settingsActions";
import M from 'materialize-css';

class SettingsSelect extends Component {
    constructor(props) {
        super(props);
        this.handleSettingChange = this.handleSettingChange.bind(this);
        console.log('Constructing')
    }
    
    componentDidMount() {
        const elems = document.querySelectorAll('select');
        this.selectElemsInstances = M.FormSelect.init(elems, {});
        console.log('Post-mount')
    }

    handleSettingChange(e) {
        this.props.changeSettings({ [e.target.name]: Number(e.target.value) });
    }

    shouldComponentUpdate(nextProps) {
        console.log('Checking')
        console.log('nextProps', nextProps)
        return true
    }

    renderOptions(name, options) {
        return options.map(option => {
            // Adjust inner text of duration but keep in milliseconds everywhere else
            let innerText = option;
            if (name === 'duration') {
                innerText = (option / 1000).toPrecision(2).toString() + ' sec';
            }
            return <option value={option} key={option}>{innerText}</option>
        })
    }

    render() {
        let { name, options, settings } = this.props;
        
        console.log('Rendering, settings:', options)
        
        const selected = settings[name];
        return <div  className='input-field'>
            <select style={{ borderColor: 'black' }} name={name} defaultValue={selected} onChange={this.handleSettingChange}>
                { this.renderOptions(name, options) }
            </select>
        </div>
    }
}

function mapStateToProps({ settings}) { return { settings } }

export default connect ( mapStateToProps, { changeSettings })(SettingsSelect)