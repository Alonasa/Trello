import {v1} from 'uuid';
import {TodolistTasksType} from '../components/Todolist/Todolist';
import {AddTodolistAT, RemoveTodolistAT} from './todolists-reducer';

export type AddTaskACType = ReturnType<typeof AddTaskAC>
export type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
export type ChangeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>
export type ChangeTaskStatusACType = ReturnType<typeof ChangeTaskStatusAC>

type AddTaskActionTypes = AddTaskACType | RemoveTaskACType | ChangeTaskTitleACType | ChangeTaskStatusACType | AddTodolistAT | RemoveTodolistAT

const initialState:TodolistTasksType = {};

export const tasksReducer = (state= initialState, action: AddTaskActionTypes) => {
  switch (action.type) {
	case 'ADD-TASK': {
	  const newTask = {id: v1(), title: action.title, isDone: false}
	  return {
		...state,
		[action.todolistId]: [newTask, ...state[action.todolistId]]
	  }
	}
	case 'REMOVE-TASK': {
	  return {...state, [action.todolistId]: state[action.todolistId].filter(t=> t.id!==action.taskId)}
	}
	
	case 'CHANGE-TASK-TITLE': {
	  return {...state, [action.todlistId]: state[action.todlistId].map(t=> t.id===action.taskId? {...t, title: action.title}: t)}
	}
 
	case 'CHANGE-TASK-STATUS': {
	  return {...state, [action.todolistId]: state[action.todolistId].map(t=> t.id===action.taskId? {...t, isDone: !action.isDone}:t)}
	}
 
	case 'ADD-TODOLIST': {
		return  {...state, [action.id]: []}
	}
 
	case 'REMOVE-TODOLIST': {
	  const copy = {...state}
	  delete copy[action.id]
	  return copy
	}
 
	default:
	  return state
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