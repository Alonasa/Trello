import {TodolistsType} from '../App';
import {v1} from 'uuid';
import {todolistsReducer} from './todolists-reducer';


test('todolist should be added', ()=>{
  let todolistID1 = v1();
  let todolistID2 = v1();
  let newTodolistTitle = 'I am a new title'
  
  const initialState:Array<TodolistsType>=[
	{id: todolistID1, title: 'What to learn', filter: 'All'},
	{id: todolistID2, title: 'What to buy', filter: 'All'}
  ]
  
  const finalState = todolistsReducer(initialState, {
	type: 'ADD-TODOLIST',
	title: newTodolistTitle
  })
  
  expect(finalState.length).toBe(3)
  expect(finalState[0].title).toBe(newTodolistTitle)
})

test('Todolist should be removed', ()=> {
  let todolistID1 = v1();
  let todolistID2 = v1();
  
  const initialState:Array<TodolistsType>=[
	{id: todolistID1, title: 'What to learn', filter: 'All'},
	{id: todolistID2, title: 'What to buy', filter: 'All'}
  ]
  
  const finalState = todolistsReducer(initialState, {
	type: 'REMOVE-TODOLIST',
	id: todolistID1
  })
  
  expect(finalState.length).toBe(1)
  expect(finalState[0].id).toBe(todolistID2)
})

test(`Todolist filter can't be empty`, () => {
  let todolistID1 = v1();
  let todolistID2 = v1();
  
  const initialState: Array<TodolistsType> = [
	{id: todolistID1, title: 'What to learn', filter: 'All'},
	{id: todolistID2, title: 'What to buy', filter: 'All'}
  ]
  
  const finalState = todolistsReducer(initialState, {
	type: 'TASKS-FILTRATOR',
	status: initialState[0].filter,
	todolistId: todolistID1
  })
  
  expect(finalState[0].filter).toBe('All')
  expect(finalState[0].id).toBe(todolistID1)
})
