import React from 'react';

type todolistType = {
  title: string
  tasks: Array<taskType>
  removeTask: (id: string) => void
  filterTasks: (status: tasksStatusType) => void
  addTask: (value: string) => void
}

export type taskType = {
  id: string
  title: string
  isDone: boolean
}

export type tasksStatusType = 'All' | 'Active' | 'Completed'

export const Todolist = (props: todolistType) => {
  const taskRemover = (id: string) => {
	props.removeTask(id)
  }
  
  const tasksFiltrator = (status: tasksStatusType) => {
	return props.filterTasks(status)
  }
  
  let message = '';
  
  const getFieldValue = (value: string) => {
	return message = value
  }
  
  const addTaskHandler = () => {
	props.addTask(message)
  }
  
  return (
	<div>
	  <h3>{props.title}</h3>
	  <div>
		<input onChange={(e) => getFieldValue(e.currentTarget.value)}/>
		<button onClick={addTaskHandler}>+</button>
	  </div>
	  <ul>
		{props.tasks.map(
		  task =>
			<li id={task.id}><input type="checkbox" checked={task.isDone}/>
			  <span>{task.title}</span>
			  <button onClick={(e) => taskRemover(task.id)}>x</button>
			</li>
		)}
	  </ul>
	  <div>
		<button onClick={()=>tasksFiltrator('All')}>All</button>
		<button onClick={()=>tasksFiltrator('Active')}>Active</button>
		<button onClick={()=>tasksFiltrator('Completed')}>Completed</button>
	  </div>
	</div>
  )
}