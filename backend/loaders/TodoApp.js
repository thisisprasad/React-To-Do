/**
 * So an instance of this class represents the todo app actually running
 * on the server.
 * 
 * This is a Singleton class.
 */
class TodoApp {
	constructor() {
		if (this.instance instanceof TodoApp) {
			return this.instance;
		}

		this.fs = require('fs');
		this.router = require('../api/router');	//	router for routing HTTP requests.
		this.appConfig = JSON.parse(this.fs.readFileSync('./config/config.json', 'utf-8'));	//	Application Config properties.
		this.dbConnector = {};	//	Holds the connection properties for DB.

		this.init = this.init.bind(this);
		this.initializeTodoDBConnector = this.initializeTodoDBConnector.bind(this);
		this.initializeTodoIdCollection = this.initializeTodoIdCollection.bind(this);

		this.init();

		this.instance = this;
		Object.freeze(this);
	}

	/**
	 * Initializes and deploys the application.
	 * Must be called explicitly.
	 */
	init() {
		var that = this;
		this.initializeTodoDBConnector().then(function (response) {
			console.log(response);
			that.initializeTodoIdCollection().then(function (response) {
				console.log(response);
			}).catch(function (err) {
				console.log(err);
			});
		}).catch(function (err) {
			console.log(err);
		});
	}

	/**
	 * Creates a Collection which stores only one row, the next Id of a todo item.
	 * Using MongoClient module 
	 */
	initializeTodoIdCollection() {
		var that = this;
		let MongoClient = require('mongodb').MongoClient;
		let Constants = require("../config/Constants");
		var TodoIdModel = require("../models/TodoId.model");
		return new Promise(function (resolve, reject) {
			try {
				MongoClient.connect(that.dbConnector.url, {
					useNewUrlParser: true,
					useUnifiedTopology: true
				}, function (err, db) {
					if (err) {
						console.log(err);
						throw err;
					}

					var exists = false;
					// that.dbConnector.todoIdDB = db.db(that.appConfig.DBProperties.db);
					that.dbConnector.todoDB.listCollections().toArray(function (err, collectionNames) {
						collectionNames.forEach(function (collection) {
							if (collection.name == Constants.TODO_ID_COLLECTION) {
								exists = true;
							}
						});

						if (exists) {
							if (that.appConfig.DBProperties.createMetadata) {
								console.log("Task Id collection will be created anew");
								that.dbConnector.todoDB.collection(Constants.TODO_ID_COLLECTION)
									.drop(function (err, deleted) {
										if (err) throw err;
										that.dbConnector.todoDB.createCollection(Constants.TODO_ID_COLLECTION, function (err, res) {
											if (err) throw err;
											var todoIdModel = new TodoIdModel();
											todoIdModel.save().then(function (response) {
												resolve("Task ID collection created...");
												db.close();
												return;
											});
										});
									});
							}
							else {
								reject("Collection for ID already exists");
								return;
							}
						} else {
							that.dbConnector.todoDB.createCollection(Constants.TODO_ID_COLLECTION, function (err, res) {
								if (err) throw err;
								var todoIdModel = new TodoIdModel();
								todoIdModel.save().then(function (response) {
									resolve("New Task ID collection created...");
									db.close();
									return;
								});
								return;
							});
						}
					});
				});
			} catch (err) {
				console.log("Create Collection error: " + err);
			}
		});
	}

	/**
	 * Initializes the DB connector with required properties
	 * 1. URL
	 * 2. Password.
	 * 
	 * Establishes DB connection.
	 */
	initializeTodoDBConnector() {
		var that = this;
		var Constants = require("../config/Constants");
		return new Promise(function (resolve, reject) {
			try {
				const dbProps = that.appConfig.DBProperties;
				//	url of the database.
				that.dbConnector.url =
					"mongodb://" + dbProps.address + ":" + dbProps.port + "/" + dbProps.db;

				that.dbConnector.mongoose = require('mongoose');
				that.dbConnector.mongoose.connect(that.dbConnector.url, {
					useNewUrlParser: true,
					useUnifiedTopology: true
				});

				let connected = null;
				that.dbConnector.mongoose.connection.on('connected', (err) => {
					// console.log("Connected to mongoDB successfully...");
					that.dbConnector.todoDB = that.dbConnector.mongoose.connection.db;
					resolve("Connected to mongoDB successfully...");

					var exists = false;
					that.dbConnector.todoDB.listCollections().toArray(function (err, collections) {
						collections.forEach(function (collection) {
							if (collection.name == Constants.TODO_LIST_COLLECTION) {
								exists = true;
							}
						});

						if (exists) {
							if (that.appConfig.DBProperties.createMetadata) {
								that.dbConnector.todoDB.collection(Constants.TODO_LIST_COLLECTION)
									.drop(function (err, deleted) {
										if (err) throw err;
										console.log("Previous todo's will be lost. Deleting the collection... ");
										that.dbConnector.todoDB.createCollection(Constants.TODO_LIST_COLLECTION, function (err, res) {
											if (err) throw err;
											// console.log("Todo list collection created...");
											resolve("Todo list collection created...");
											return ;
										});
									});

							}
						} else {
							that.dbConnector.todoDB.createCollection(Constants.TODO_LIST_COLLECTION, function (err, res) {
								if (err) throw err;
								// console.log("Todo list collection created...");
								resolve("Todo list collection created...");
								return ;
							});
						}
					});
				});
				that.dbConnector.mongoose.connection.on('error', (err) => {
					reject("can't connect DB");
					throw err;
				});
			} catch (err) {
				console.log(err);
			}
		});
	}
}

module.exports = TodoApp;