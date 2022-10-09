import React from 'react';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import styles from '../Todolist/Todolist.module.css'

type TodolistType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string, todolistId: string) => void
  filterTasks: (status: TasksStatusType, todolistId: string) => void
  addTask: (value: string, todolistId: string) => void
  editTask: (value: string, tlId: string, taskId: string) => void
  editTlTitle: (value: string, tlId: string) => void
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
  
  const editTlTitle = (title: string) => {
	props.editTlTitle(title, props.id)
  }
  
  return (
	<div className={styles.todolist}>
	  <h3 className={styles.todolist__header}><EditableSpan title={props.title} editTitle={editTlTitle}/>
		<button onClick={() => removeTodolist(props.id)}>x</button>
	  </h3>
	  <AddItemForm addItem={addTask}/>
	  <ul className={styles.todolist__inner}>
		{props.tasks.map(
		  task => {
			const editTask = (title: string) => {
			  props.editTask(title, props.id, task.id)
			}
			return (
			  <li key={task.id} className={task.isDone ? `${styles.todolist__item} is-done` : styles.todolist__item}>
				<input type="checkbox" checked={task.isDone}
					   onChange={() => onClickHandler(task)}/>
				<EditableSpan title={task.title}
							  editTitle={editTask}/>
				<button className={styles.todolist__button} onClick={() => taskRemover(task)}>x</button>
			  </li>)
		  })}
	  </ul>
	  <div className={styles.todolist__buttonGroup}>
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