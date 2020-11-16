import React, { Component } from 'react';
import * as config from '../config/componentConfig';
import './TodoList.css';
import * as AjaxUtility from '../../common/AjaxUtil';
import Table from '../lib/Table/Table.component';
import TextBox from '../lib/TextBox/TextBox.component';
import Button from '../lib/Button/Button.component';
import Dropdown from '../lib/Dropdown/Dropdown.component';
import Constants from '../../Constants';

class TodoList extends Component {
	state = {
		listCount: 0,
		todoList: [],
		newTodo: {
			priorityList: []
		}
	}

	constructor(props) {
		super(props);

		this.updateTodoList = this.updateTodoList.bind(this);
		this.addTodoItem = this.addTodoItem.bind(this);
		this.fetchTodoItems = this.fetchTodoItems.bind(this);
		this.utils = require("./util/utils");
		this.ajaxUtility = AjaxUtility;

		this.newTodotextInput = React.createRef();
		this.newTodoPriorityInput = React.createRef();
	}

	componentDidMount() {
		var that = this;
		this.fetchTodoItems().then(function (data) {
			that.setState({
				"listCount": data.length,
				"todoList": data
			});
		});

		config.getTaskPriorityConfigLists().then(function (resolveData, reject) {
			that.setState({
				"newTodo": {
					"priorityList": resolveData
				}
			});
		});
	}

	updateTodoList(todoList) {
		var that = this;
		that.fetchTodoItems().then(function (data) {
			that.setState({
				"listCount": data.length,
				"todoList": data
			});
		});
	}

	/**
	 * fetches the todo items from server
	 * Returns a promise
	 */
	fetchTodoItems() {
		var that = this;
		return AjaxUtility.ajax({
			url: this.utils.urls.BASE_URL + this.utils.urls.FETCH_ALL_TODO,
			async: true,
			cache: false
		});
	}

	getColumnHeaders() {
		return config.getComponentConfig().columns;
	}

	addTodoItem(e) {
		var todoText = this.newTodotextInput.current.value();
		alert("todotext: " + todoText);
		var todoPriority = this.newTodoPriorityInput.current.value();
		//	ajax request to add item in DB.
		var promise = AjaxUtility.ajax({
			url: this.utils.urls.BASE_URL + this.utils.urls.ADD_TODO,
			async: true,
			cache: false,
			type: Constants.HTTP_POST,
			"Content-Type": "application/json",
			data: {
				"title": todoText,
				"priority": todoPriority
			}
		});
		var that = this;
		promise.then(function (data) {
			if (data.status == Constants.URL_STATUS.SUCCESS) {
				console.log("todo inserted in DB...");
				that.updateTodoList();
				that.clearInput();
			}
		});
	}

	clearInput() {
		this.newTodotextInput.current.value = "";
	}

	render() {
		this.columnHeaders = this.getColumnHeaders();
		var that = this;
		return (

			<div className="todo-app">
				<div id="new-todo-app">
					<div id="todo-input" class="row">
						<label>Todo item:</label>
						<TextBox type='text' id='input-id' ref={this.newTodotextInput} />
					</div>
					<div class="row">
						<label>Priority:</label>
						<Dropdown options={this.state.newTodo.priorityList} ref={this.newTodoPriorityInput} />
					</div>
					<Button id="add-todo-button" value="Add" displayText="Add Item..." onClick={this.addTodoItem} />
				</div>

				<hr></hr>

				<div id="todo-table">
					<Table
						data={this.state.todoList}
						headers={this.columnHeaders}
					/>
				</div>
			</div>
		)
	}
}

export default TodoList;