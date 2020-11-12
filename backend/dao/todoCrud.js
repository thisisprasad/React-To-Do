/**
 * Fetches next Id for a todo item
 * */
function fetchNextTodoId() {
	var TodoIdModel = require('../models/TodoId.model');
	// var updateId = new TodoIdModel();
	return new Promise(function (resolve, reject) {
		TodoIdModel.find({}, function (err, results) {
			if (err) throw err;
			var currId = results[0].taskId;
			console.log("currId: " + currId);
			//update record and resolve(asynchronously)
			var conditions = { _id: results[0]._id };
			var update = { $inc: { taskId: 1 } };
			var options = { multi: true, useFindAndModify: true, new: false };
			TodoIdModel.updateOne(conditions, update, options).then(function (resolvedMessage) {
				console.log("Id updated...");
				resolve(currId);
			});
		});
	});
}

/**
 * Fetches all todos from the DB.
 */
function fetchAllTodos() {
	var TodoModel = require("../models/TodoList.model")
	return new Promise(function (resolve, reject) {
		var conditions = {deleted: false};
		TodoModel.find(conditions, function (err, results) {
			if(err) throw err;
			resolve(results);
		});
	});
}

function updateTodo(updatedTodo) {
	var TodoModel = require('../models/TodoList.model');
	return new Promise(function (resolve, reject) {
		var conditions = { taskId: updatedTodo.taskId };
		var update = { $set: updatedTodo };
		var options = { multi: false };
		TodoModel.updateOne(conditions, update, options, function (err, rowsAffected) {
			if (rowsAffected.n == 1) {
				resolve("Todo updated successfully...");
			} else {
				reject("Failed to update todo...");
			}
		});
	});
}

function deleteTodo(todoId) {
	var TodoModel = require('../models/TodoList.model');
	return new Promise(function (resolve, reject) {
		var conditions = { taskId: todoId };
		var update = { $set: { deleted: true } };
		var options = { multi: false };
		TodoModel.updateOne(conditions, update, options, function (err, rowsAffected) {
			if (err) throw err;
			if (rowsAffected.n == 1) {
				resolve("Todo deleted...");
			} else {
				reject("Problem deleting Todo...");
			}
		});
	});
}

module.exports = {
	fetchNextId: fetchNextTodoId,
	fetchAllTodos: fetchAllTodos,
	update: updateTodo,
	delete: deleteTodo
};