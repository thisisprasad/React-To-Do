import $ from "jquery";

/**
 * A global function for the application for interfacing with ajax.
 * This function uses jQuery ajax function.
 * 
 * @param {extra options for an ajax request} options 
 */
export function ajax(options) {
	options['success'] = function (data, status, xhr) {
		return new Promise((resolve, reject) => {
			if(data!=null || data!==undefined){
				resolve(data);
				return ;
			} else {
				reject(status);
				return ;
			}
		});
	}
	return $.ajax(options);
}