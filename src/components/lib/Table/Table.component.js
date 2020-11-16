import React, { Component } from 'react';
import './Table.css';

class Table extends Component {

	/**
	 * header object = {
	 * 	value,
	 * 	displayText
	 * }
	 * 
	 * input Props:
	 * header {
	 * 	value,
	 * 	disaplyText
	 * }
	 * options {}
	 * data [
	 * {}, {}, ....
	 * ]
	 */
	render() {
		var that = this;
		return(
			<table className='table-component'>
				<tbody>
					<tr>
						{
							that.props.headers.map(header => (
								<th data-value={header.value} >{header.displayText}</th>
							))
						}
					</tr>
					{
						that.props.data.map(row => (
							<tr data-taskid={row.taskId} className='table-row'>
								{
									that.props.headers.map(header => (
									<td className='row-element'>{row[header.value]}</td>
									))
								}
							</tr>
						))
					}
				</tbody>
			</table>
		)
	}
}

export default Table;