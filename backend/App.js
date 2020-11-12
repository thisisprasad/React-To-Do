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


// var mongo = require('mongodb').MongoClient;
// var mongoose = require('mongoose');

// const TodoModel = require('./models/TodoList.model');

// var url = "mongodb://localhost:27017/production"; 

// mongoose.connect(url, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// });
// mongoose.Promise = global.Promise;

// var db = mongoose.connection;

// db.on('error', function (err) {
// 	console.log("Mongoose default connection error: " + err);
// });

// db.on('connected', function () {
// 	console.log("Connected to mongoDB...");
// });

// var todoItem = new TodoModel({
// 	title: 'mongoose todo',
// 	priority: 5
// });

// todoItem.save(function (err, saveTodo) {
// 	if (err) {
// 		console.log("error: " + err);
// 	} else {
// 		console.log("result: " + saveTodo);
// 	}
// });

// // mongo.connect(url, {
// // 	useNewUrlParser: true,
// // 	useUnifiedTopology: true
// // }, function (err, db) {
// // 	if (err) {
// // 		console.log("error connecting to mongodb database");
// // 	} else {
// // 		console.log("connected to production successfully");
// // 	}

// // 	var todo = new TodoModel({
// // 		'title': 'a todo item',
// // 		priority: 5
// // 	});

// // 	console.log("saving");
// // 	todo.save(function (err) {
// // 		if (err) {
// // 			console.log("Problem saving model in DB.");
// // 			console.log(err);
// // 		}
// // 		console.log("else mein gaya kya?");
// // 	});
// // 	console.log("Done with save");
// // });