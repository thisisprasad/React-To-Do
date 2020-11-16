import Constants from '../../../src/Constants';

/**
 * Returns the config for a todo item.
 * */
export function getComponentConfig() {
	return {
		columns: [
			{
				displayText: 'Title',
				value:'title',
				visible: true
			},
			{
				displayText: 'Priority',
				value: 'priority',
				visible: true
			},
			{
				displayText: 'Status',
				value: 'status',
				visible: true
			}
		]
	};
}

export function getTaskPriorityConfigLists() {
	return new Promise(function (resolve, reject) {
		var list = [
			{
				label: Constants.VERY_LOW_PRIORITY,
				priority: 1
			},
			{
				label: Constants.LOW_PRIORITY,
				priority: 3
			},
			{
				label: Constants.NORMAL_PRIORITY,
				priority: 5
			},
			{
				label: Constants.HIGH_PRIORITY,
				priority: 7
			},
			{
				label: Constants.VERY_HIGH_PRIORITY,
				priority: 9
			}
		]
		resolve(list);
	});
}