import {TodolistsType} from '../App';
import {v1} from 'uuid';
import {TasksStatusType} from '../components/Todolist/Todolist';

export type TodolistsACType = AddTodolistAT | RemoveTodolistAT | TasksFiltratorAT | TitleEditorAT

export type AddTodolistAT = {
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

type TitleEditorAT = {
  type: "TITLE-EDITOR"
  value: string
  tlId: string
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
	  
	  case 'TITLE-EDITOR':
		return todolists.map(t => t.id === action.tlId ? {
		  ...t,
		  title: action.value
		} : t)
	  
	  default:
		return todolists
	}
}

export const AddTodolistAC = (title: string): AddTodolistAT => ({
  type: 'ADD-TODOLIST',
  title: title
})
export const RemoveTodolistAC = (id: string): RemoveTodolistAT => ({
  type: 'REMOVE-TODOLIST',
  id: id
})
export const TasksFiltratorAC = (status: TasksStatusType, todolistId: string): TasksFiltratorAT => ({
  type: 'TASKS-FILTRATOR',
  status: status,
  todolistId: todolistId
})
export const TitleEditorAC = (value: string, tlId: string): TitleEditorAT => ({
  type: 'TITLE-EDITOR',
  value: value,
  tlId: tlId,
})