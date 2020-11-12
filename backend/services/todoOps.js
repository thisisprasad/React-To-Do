/**
 * Fetches all the todos
 */
function fetchAllTodos() {
	var todoDao = require("../dao/todoCrud");
	return todoDao.fetchAllTodos();
}

/**
 * Service layer for adding todo item in database.
 * 
 * @param {title, priority} todo 
 */
function addTodo(todo) {
	const constants = require("../config/Constants");
	var TodoModel = require('../models/TodoList.model');
	var todoDao = require("../dao/todoCrud");
	return new Promise(function (resolve, reject) {
		todoDao.fetchNextId().then(function (resolveData) {
			console.log("resolveData: " + JSON.stringify(resolveData));
			var todoModel = new TodoModel({
				taskId: resolveData,
				title: todo.title,
				priority: todo.priority
			});
			return todoModel.save().then(function (resolvedResponse) {
				console.log("saved in DB. Service layer.")
				resolve("Item stored in DB");
			}).catch(function (rejectedResponse) {
				console.log("Could NOT save task in DB...");
				reject("Could NOT save task in DB...");
			});
		});
	});
}

/**
 * Updates the Todo.
 * @param {Todo containing updated values for the given Id} updatedTodo 
 */
function updateTodo(updatedTodo) {
	var todoDao = require('../dao/todoCrud');
	return todoDao.update(updatedTodo);
}

/**
 * Deletes a particular todo.
 * @param {Id of todo to be deleted} todoId 
 */
function deleteTodo(todo) {
	var todoDao = require('../dao/todoCrud');
	return todoDao.delete(todo.taskId);
}

module.exports = {
	fetchAllTodos: fetchAllTodos,
	addTodo: addTodo,
	updateTodo: updateTodo,
	deleteTodo: deleteTodo
};