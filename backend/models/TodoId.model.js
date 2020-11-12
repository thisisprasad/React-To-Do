const mongoose = require('mongoose');
const Constants = require('../config/Constants');

var todoidSchema = mongoose.Schema({
	taskId: {
		type: Number,
		default: 1
	}
});

const TodoIdModel = mongoose.model("TodoId", todoidSchema, Constants.TODO_ID_COLLECTION);
module.exports = TodoIdModel;