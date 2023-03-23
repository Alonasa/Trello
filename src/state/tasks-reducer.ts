import {v1} from 'uuid';
import {TodolistTasksType} from '../components/Todolist/Todolist';
import {AddTodolistAT, RemoveTodolistAT} from './todolists-reducer';

export type AddTaskACType = ReturnType<typeof AddTaskAC>
export type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
export type ChangeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>
export type ChangeTaskStatusACType = ReturnType<typeof ChangeTaskStatusAC>

type AddTaskActionTypes = AddTaskACType | RemoveTaskACType | ChangeTaskTitleACType | ChangeTaskStatusACType | AddTodolistAT | RemoveTodolistAT

export const tasksReducer = (tasks: TodolistTasksType, action: AddTaskActionTypes) => {
  switch (action.type) {
	case 'ADD-TASK': {
	  const newTask = {id: v1(), title: action.title, isDone: false}
	  return {
		...tasks,
		[action.todolistId]: [newTask, ...tasks[action.todolistId]]
	  }
	}
	case 'REMOVE-TASK': {
	  return {...tasks, [action.todolistId]: tasks[action.todolistId].filter(t=> t.id!==action.taskId)}
	}
	
	case 'CHANGE-TASK-TITLE': {
	  return {...tasks, [action.todlistId]: tasks[action.todlistId].map(t=> t.id===action.taskId? {...t, title: action.title}: t)}
	}
 
	case 'CHANGE-TASK-STATUS': {
	  return {...tasks, [action.todolistId]: tasks[action.todolistId].map(t=> t.id===action.taskId? {...t, isDone: !action.isDone}:t)}
	}
 
	case 'ADD-TODOLIST': {
	  	let newId = v1();
		return  {...tasks, [newId]: []}
	}
 
	case 'REMOVE-TODOLIST': {
	  const copy = {...tasks}
	  delete copy[action.id]
	  return copy
	}
 
	default:
	  return tasks
  }
}


export const AddTaskAC = (title: string, todolistId: string) => {
  return {
	type: 'ADD-TASK',
	title,
	todolistId
  } as const
}

export const RemoveTaskAC = (todolistId: string, taskId: string) => {
  return {
	type: 'REMOVE-TASK',
	todolistId,
	taskId
  } as const
}

export const ChangeTaskTitleAC = (todlistId: string, taskId: string, title: string) => {
  return {
    type: 'CHANGE-TASK-TITLE',
	todlistId,
	taskId,
	title
  } as const
}

export const ChangeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean)=> {
  return {
    type: 'CHANGE-TASK-STATUS',
	todolistId,
	taskId,
	isDone
  } as const
}