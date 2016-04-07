import React, { Component, PropTypes } from 'react';

import ReactDOM from  'react-dom';

import { createContainer } from  'meteor/react-meteor-data';

import { Tasks } from  '../api/tasks.js';

import Task from  './Task.jsx';

class TaskList extends Component {

	renderTask(){
		let filteredTasks = this.props.tasks;
		let hideCompleted = this.props.hideCompleted;

		if(hideCompleted){
			filteredTasks = filteredTasks.filter(task => !task.checked);
		}

		return filteredTasks.map((task)=>(
			<Task key={task._id} task={task} />
		));
	}

	render(){
		return (
				<ul>
					{this.renderTask()}
				</ul>
		);
	}
}

TaskList.propTypes = {
	tasks: PropTypes.array.isRequired
};


export default createContainer(()=>{
	return {
		tasks: Tasks.find({}, {sort: {createAt: -1 } }).fetch()
	};
}, TaskList);
