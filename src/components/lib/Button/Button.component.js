import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<button id={this.props.id} value={this.props.value} 
			class={"todo-button" + (this.props.class ? " " + this.props.class : "")} 
			onClick={this.props.onClick ? this.props.onClick : null}>{this.props.displayText}</button>
		)
	}
}

export default Button;