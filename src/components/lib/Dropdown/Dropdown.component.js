import React, { Component } from 'react';
import './Dropdown.css';

class Dropdown extends Component {

	constructor(props) {
		super(props);
		this.inputOption = React.createRef();
	}

	value() {
		return this.inputOption.current.value;
	}

	render() {
		return (
			<select class="todo-dropdown" ref={this.inputOption}>
				{this.props.options.map(option => (
					<option value={option.priority}>{option.label}</option>
				))}
			</select>
		)
	}
}

export default Dropdown;