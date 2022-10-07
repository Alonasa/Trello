import React, {ChangeEvent, useState} from 'react';
import {AddItemForm} from './AddItemForm/AddItemForm';
import {EditableSpan} from './EditableSpan';

type TodolistType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string, todolistId: string) => void
  filterTasks: (status: TasksStatusType, todolistId: string) => void
  addTask: (value: string, todolistId: string) => void
  editTask: (value: string, tlId: string, taskId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  filter: TasksStatusType
  removeTodolist: (id: string) => void
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TodolistStateType = {
  [key: string]: Array<TaskType>
}

export type TasksStatusType = 'All' | 'Active' | 'Completed'

export const Todolist = (props: TodolistType) => {
  
  const tasksFiltrator = (status: TasksStatusType, todolistId: string) => {
	return props.filterTasks(status, todolistId)
  }
  
  const filterStyleHandler = (filter: string) => {
	return props.filter === filter ? 'active-filter' : 'filter'
  }
  
  const removeTodolist = (id: string) => {
	props.removeTodolist(id)
  }
  
  const taskRemover = (task: TaskType) => {
	props.removeTask(task.id, props.id)
  }
  const onClickHandler = (task: TaskType) => {
	props.changeTaskStatus(task.id, task.isDone, props.id)
  }
  
  const addTask = (title: string) => {
	props.addTask(title, props.id)
  }
  
  
  return (
	<div>
	  <h3><EditableSpan title={props.title} editTitle={()=>('hi')}/>
		<button onClick={() => removeTodolist(props.id)}>x</button>
	  </h3>
	  <AddItemForm addItem={addTask}/>
	  <ul>
		{props.tasks.map(
		  task => {
			const edTask = (title: string) => {
			  props.editTask(title, props.id, task.id)
			}
			return (
			  <li key={task.id} className={task.isDone ? 'is-done' : ''}>
				<input type="checkbox" checked={task.isDone}
					   onChange={() => onClickHandler(task)}/>
				<EditableSpan title={task.title}
							  editTitle={edTask}/>
				<button onClick={() => taskRemover(task)}>x</button>
			  </li>)
		  })}
	  </ul>
	  <div>
		<button className={filterStyleHandler('All')}
				onClick={() => tasksFiltrator('All', props.id)}>All
		</button>
		<button className={filterStyleHandler('Active')}
				onClick={() => tasksFiltrator('Active', props.id)}>Active
		</button>
		<button className={filterStyleHandler('Completed')}
				onClick={() => tasksFiltrator('Completed', props.id)}>Completed
		</button>
	  </div>
	</div>
  )
}