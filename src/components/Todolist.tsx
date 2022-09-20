import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type todolistType = {
  title: string
  tasks: Array<taskType>
  removeTask: (id: string) => void
  filterTasks: (status: tasksStatusType) => void
  addTask: (value: string) => void
  changeTaskStatus: (id: string, isDone: boolean) => void
  error: string | null
}

export type taskType = {
  id: string
  title: string
  isDone: boolean
}

export type tasksStatusType = 'All' | 'Active' | 'Completed'

export const Todolist = (props: todolistType) => {
  
  const tasksFiltrator = (status: tasksStatusType) => {
	return props.filterTasks(status)
  }
  
  let [title, setTitle] = useState('');
  
  const getFieldValue = (e: ChangeEvent<HTMLInputElement>) => {
	setTitle(e.currentTarget.value)
  }
  
  const addTaskHandler = () => {
	props.addTask(title)
	setTitle('')
  }
  
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
	if (e.key === 'Enter') {
	  addTaskHandler()
	}
  }
  
  return (
	<div>
	  <h3>{props.title}</h3>
	  <div>
		<input value={title}
			   onChange={getFieldValue}
			   onKeyPress={onKeyPressHandler}
			   className={props.error ? 'error' : ''}
		/>
		<button onClick={addTaskHandler}>+</button>
		{props.error && <div className={'error-message'}>{props.error}</div>}
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
			  <li key={task.id}><input type="checkbox" checked={task.isDone}
									   onClick={onClickHandler}/>
				<span>{task.title}</span>
				<button onClick={taskRemover}>x</button>
			  </li>)
		  })}
	  </ul>
	  <div>
		<button onClick={() => tasksFiltrator('All')}>All</button>
		<button onClick={() => tasksFiltrator('Active')}>Active</button>
		<button onClick={() => tasksFiltrator('Completed')}>Completed</button>
	  </div>
	</div>
  )
}