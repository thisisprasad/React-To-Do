const Constants = require('../config/Constants');

var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
	taskId:{
		type: Number,
		default: 0
	},
	title: {
		type: String,
		default: ''
	},
	priority: {
		type: Number,
		default: Constants.TODO_PRIORITY.NORMAL
	},
	status: {
		type: String,
		default: 'open'
	},
	deleted: {
		type: Boolean,
		default: false
	}
});

const TodoModel = mongoose.model("Todo", todoSchema, "todo");
module.exports = TodoModel;