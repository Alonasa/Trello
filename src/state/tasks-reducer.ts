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
	    return tasks
	  }
	  default: return tasks
	}
}



export const AddTaskAC =(value: string, todolistId: string)=> {
  return {
    type: 'ADD-TASK',
	value,
	todolistId
  } as const
}