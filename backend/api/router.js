/**
 * Initializes the rest api endpoints for the entire application.
 */
var router = {

	/**
	 * This method should be called initially.
	 */
	createEndpoints: function (port) {
		const express = require('express');
		const cors = require('cors');
		const controller = express();
		const todoOps = require('../services/todoOps');
		const Constants = require('../config/Constants');
		const bodyParser = require('body-parser');

		controller.use(cors());
		controller.use(express.json());
		controller.use(bodyParser.urlencoded({
			extended: true
		}));
		controller.use(bodyParser.json());

		console.log("initializing routers...");
		controller.get('/', function (req, res) {
			res.send("recieved request...");
		});

		/**
		 * A get REST API for fetching all the todos
		 */
		controller.get('/fetchAll', (request, response) => {
			todoOps.fetchAllTodos(request.body).then(function (resolvedTodos) {
				console.log("Fetch successful...");
				response.status(200).send(resolvedTodos);
			});
		});

		/**
		 * api for adding a todo item into DB.
		 */
		controller.post('/add', (request, response) => {
			todoOps.addTodo(request.body).then(function (resolvedResponse) {
				console.log("item stored in DB...");
				response.status(200).send({
					"message": "Task saved successfully",
					"status": Constants.STATUS.SUCCESS
				});
			}).catch(function (rejectedResponse) {
				console.log("problem storing in DB...");
				response.status(500).send({
					"message": "item creation failure",
					"status": 0
				});
			});
		});

		controller.post('/update', (request, response) => {
			todoOps.updateTodo(request.body).then(function (resolvedResponse) {
				console.log(resolvedResponse);
				response.status(200).send({
					"message": "Updation successful",
					"status": Constants.STATUS.SUCCESS
				});
			}).catch(function (rejectedResponse) {
				console.log(rejectedResponse);
				response.status(500).send({
					"message": "todo updation failure",
					"status": 0
				});
			});
		});

		controller.post('/delete', (request, response) => {
			todoOps.deleteTodo(request.body).then(function (resolvedResponse) {
				console.log(resolvedResponse);
				response.status(200).send({
					"message": "Task Todo deleted sucessfully...",
					"status": Constants.STATUS.SUCCESS
				});
			}).catch(function (rejectedResponse) {
				console.log(rejectedResponse);
				response.status(500).send({
					"message": "Error deleting",
					"status": Constants.STATUS.FAIL
				});
			});
		});

		controller.listen(port, function () {
			console.log(`controller running at port: ${port}`);
			console.log(`controller URL: http://localhost:${port}`);
		});
	}
};

module.exports = router;