import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type TodolistType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  filterTasks: (status: TasksStatusType) => void
  addTask: (value: string) => void
  changeTaskStatus: (id: string, isDone: boolean) => void
  filter: TasksStatusType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksStatusType = 'All' | 'Active' | 'Completed'

export const Todolist = (props: TodolistType) => {
  
  const tasksFiltrator = (status: TasksStatusType) => {
	return props.filterTasks(status)
  }
  
  let [title, setTitle] = useState('');
  let [error, setError] = useState<string | null>(null)
  
  const getFieldValue = (e: ChangeEvent<HTMLInputElement>) => {
	setTitle(e.currentTarget.value)
	setError(null)
  }
  
  const addTaskHandler = () => {
	if (title) {
	  props.addTask(title)
	  setTitle('')
	} else {
	  setError(`You can't send an empty task`)
	}
  }
  
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
	if (e.key === 'Enter') {
	  addTaskHandler()
	}
  }
  
  const filterStyleHandler = (filter: string) => {
	return props.filter === filter ? 'active-filter' : 'filter'
  }
  
  return (
	<div>
	  <h3>{props.title}</h3>
	  <div>
		<input value={title}
			   onChange={getFieldValue}
			   onKeyPress={onKeyPressHandler}
			   className={error ? 'error' : ''}
		/>
		<button onClick={addTaskHandler}>+</button>
		{error && <div className={'error-message'}>{error}</div>}
	  </div>
	  <ul>
		{props.tasks.map(
		  task => {
			const taskRemover = () => {
			  props.removeTask(task.id)
			}
			const onClickHandler = () => {
			  props.changeTaskStatus(task.id, task.isDone)
			}
			return (
			  <li key={task.id} className={task.isDone ? 'is-done' : ''}><input type="checkbox" checked={task.isDone}
									   onClick={onClickHandler}/>
				<span>{task.title}</span>
				<button onClick={taskRemover}>x</button>
			  </li>)
		  })}
	  </ul>
	  <div>
		<button className={filterStyleHandler('All')} onClick={() => tasksFiltrator('All')}>All</button>
		<button className={filterStyleHandler('Active')} onClick={() => tasksFiltrator('Active')}>Active</button>
		<button className={filterStyleHandler('Completed')} onClick={() => tasksFiltrator('Completed')}>Completed</button>
	  </div>
	</div>
  )
}