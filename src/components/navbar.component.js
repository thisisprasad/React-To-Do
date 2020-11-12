import React, { Component } from 'react';
import './navbar.component.css'

class NavigationBar extends Component {

	state = {
		leftOptions: [],
		rightOptions: []
	}

	constructor(props) {
		super(props);
		this.state = {
			leftOptions: props.options.leftOptions,
			rightOptions: props.options.rightOptions
		};
		console.log("state: " + JSON.stringify(this.state));
	}

	render() {
		return (
			<div id="todo-navbar">
				<ul className="navbar">
					{this.state.leftOptions.map(option => (
						<li className="navbar-li navbar-left-option">{option.name}</li>
					))}

					{this.state.rightOptions.map(option => (
						<li className="navbar-li navbar-right-option" >{option.name}</li>
					))}
				</ul>
			</div>
		);
	}
}

export default NavigationBar;