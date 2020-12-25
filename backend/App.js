const router = require('./api/router');

const express = require('express');
const server = express();
const controller = express.Router();
const PORT = 9090;
const TodoApp = require('./loaders/TodoApp');

initApp();

/**
 * Initialization/Startup routine 
 */
function initApp() {
	var todoApp = new TodoApp();
	router.createEndpoints(todoApp.appConfig.port);	
}
