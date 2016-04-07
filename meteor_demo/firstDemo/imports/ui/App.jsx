import React, { Component, PropTypes } from 'react';

import ReactDOM from  'react-dom';

import { Tasks } from  '../api/tasks.js';

import TaskList from './TaskList.jsx';

export default class App extends Component {

	constructor(props){
		super(props);
		
		this.state = {
			hideCompleted: false
		};
	}
	
	toggleHideCompleted(){
		this.setState({
			hideCompleted: !this.state.hideCompleted
		});
	}

	handleSubmit(event){

		event.preventDefault();
		
		var inputField = ReactDOM.findDOMNode(this.refs.textInput);
		
		const text = inputField.value.trim();

		Tasks.insert({
			text: text, createAt: new Date()
		});

		ReactDOM.findDOMNode(this.refs.textInput).value = '';
		
		event.returnValue = false;
	}

	render(){
		return (
			<div className='container'>
				<header>
					<h1>Todo list</h1>
				
					<label className="hide-completed">
						<input type="checkbox" readOnly checked={this.state.hideCompleted} onClick={this.toggleHideCompleted.bind(this)}/>
						Hide Completed Tasks
					</label>

					<form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
						<input type="text" ref="textInput" placeholder="Type to add new tasks" />
					</form>

				</header>
				<TaskList hideCompleted={this.state.hideCompleted} />
			</div>
		);
	}
}
