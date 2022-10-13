import { TodolistsType } from '../App';
import {v1} from 'uuid';

export type TodolistsACType = AddTodolistAT | RemoveTodolistAT

type AddTodolistAT = {
  type: "ADD-TODOLIST"
  title: string
}

type  RemoveTodolistAT = {
  type: "REMOVE-TODOLIST"
  id: string
}

export const todolistsReducer = (todolists: Array<TodolistsType>, action: TodolistsACType): Array<TodolistsType>=>{
	switch (action.type) {
	  case 'ADD-TODOLIST':
	    const newTodolistId:string = v1();
		return [{id: newTodolistId, title:action.title, filter: 'All'}, ...todolists]
	  case 'REMOVE-TODOLIST':
	    return  todolists.filter(t => t.id !== action.id)
	  default: return todolists
	}
}