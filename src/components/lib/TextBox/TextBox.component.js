import React, { Component } from 'react';
import './style.css'

class TextBox extends Component {
	state = {
		val: '',
		type: 'text',
		enabled: true
	}

	constructor(props) {
		super(props);

		this.inputValue = React.createRef();
		// this.value = this.value.bind(this);
	}

	/**
	 * @deprecated
	 * returns a markup string DOM to be rendered.
	 * @param {string representation of element's HTML} markupString 
	 */
	createMarkup(markupString) {
		return {
			"__html": markupString
		};
	}

	/**
	 * Returns the value of the text box
	 */
	value() {
		return this.inputValue.current.value;
	}

	render() {
		return (
			<input type={this.state.type}
				id={this.props.id ? this.props.id : ""}
				class={"textbox-component" + (this.props.class ? this.props.class : "")}
				{...this.props.enabled===false ? " disabled " : ""}
				ref={this.inputValue}
			/>
		);
	}
}

export default TextBox;