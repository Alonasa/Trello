import {v1} from 'uuid';
import {TodolistTasksType} from '../components/Todolist/Todolist';

export type AddTaskACType = ReturnType<typeof AddTaskAC>
export type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
export type ChangeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>

type AddTaskActionTypes = AddTaskACType | RemoveTaskACType | ChangeTaskTitleACType

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