import {TodolistsType} from '../App';
import {v1} from 'uuid';
import {
  TasksStatusType,
  TodolistTasksType
} from '../components/Todolist/Todolist';

export type AddTaskACType = ReturnType<typeof AddTaskAC>

type AddTaskActionTypes = AddTaskACType

export const tasksReducer = (tasks: TodolistTasksType, action: AddTaskActionTypes) => {
	switch (action.type) {
	  case 'ADD-TASK': {
	    const newTask = {id: v1(), title: action.title, isDone: false}
	    return {...tasks, [action.todolistId]: [newTask, ...tasks[action.todolistId]]}
	  }
	  default: return tasks
	}
}



export const AddTaskAC =(title: string, todolistId: string)=> {
  return {
    type: 'ADD-TASK',
	title,
	todolistId
  } as const
}