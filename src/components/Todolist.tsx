import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type TodolistType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string, todolistId: string) => void
  filterTasks: (status: TasksStatusType, todolistId: string) => void
  addTask: (value: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean) => void
  filter: TasksStatusType
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
  
  let [title, setTitle] = useState('');
  let [error, setError] = useState<string | null>(null)
  
  const getFieldValue = (e: ChangeEvent<HTMLInputElement>) => {
	setTitle(e.currentTarget.value)
	setError(null)
  }
  
  const addTaskHandler = () => {
	if (title) {
	  props.addTask(title, props.id)
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
			  props.removeTask(task.id, props.id)
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
		<button className={filterStyleHandler('All')} onClick={() => tasksFiltrator('All', props.id)}>All</button>
		<button className={filterStyleHandler('Active')} onClick={() => tasksFiltrator('Active', props.id)}>Active</button>
		<button className={filterStyleHandler('Completed')} onClick={() => tasksFiltrator('Completed', props.id)}>Completed</button>
	  </div>
	</div>
  )
}