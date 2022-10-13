import { TodolistsType } from '../App';
import {v1} from 'uuid';
import {TasksStatusType} from '../components/Todolist/Todolist';

export type TodolistsACType = AddTodolistAT | RemoveTodolistAT | TasksFiltratorAT

type AddTodolistAT = {
  type: "ADD-TODOLIST"
  title: string
}

type  RemoveTodolistAT = {
  type: "REMOVE-TODOLIST"
  id: string
}

type TasksFiltratorAT = {
  type: "TASKS-FILTRATOR"
  status: TasksStatusType
  todolistId: string
}

export const todolistsReducer = (todolists: Array<TodolistsType>, action: TodolistsACType): Array<TodolistsType>=>{
	switch (action.type) {
	  case 'ADD-TODOLIST':
	    const newTodolistId:string = v1();
		return [{id: newTodolistId, title: action.title, filter: 'All'}, ...todolists]
	  case 'REMOVE-TODOLIST':
	    return  todolists.filter(t => t.id !== action.id)
	  
	  case 'TASKS-FILTRATOR':
	    return todolists.map(t => t.id === action.todolistId ? {
		  ...t,
		  filter: action.status
		} : t)
	  
	  default: return todolists
	}
}