import {v1} from 'uuid';
import {TodolistTasksType} from '../components/Todolist/Todolist';

export type AddTaskACType = ReturnType<typeof AddTaskAC>
export type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>


type AddTaskActionTypes = AddTaskACType | RemoveTaskACType

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