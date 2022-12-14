import {TodolistsType} from '../App';
import {v1} from 'uuid';
import {
  AddTodolistAC,
  RemoveTodolistAC, TasksFiltratorAC, TitleEditorAC,
  todolistsReducer
} from './todolists-reducer';
import {TasksStatusType} from '../components/Todolist/Todolist';


test('todolist should be added', ()=>{
  let todolistID1 = v1();
  let todolistID2 = v1();
  let newTodolistTitle = 'I am a new title'
  
  const initialState:Array<TodolistsType>=[
	{id: todolistID1, title: 'What to learn', filter: 'All'},
	{id: todolistID2, title: 'What to buy', filter: 'All'}
  ]
  
  const finalState = todolistsReducer(initialState, AddTodolistAC(newTodolistTitle))
  
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
  
  const finalState = todolistsReducer(initialState, RemoveTodolistAC(todolistID1))
  
  expect(finalState.length).toBe(1)
  expect(finalState[0].id).toBe(todolistID2)
})

test(`Todolist filter must have completed status`, () => {
  let todolistID1 = v1();
  let todolistID2 = v1();
  
  const newFilter:TasksStatusType = "Completed"
  
  const initialState: Array<TodolistsType> = [
	{id: todolistID1, title: 'What to learn', filter: 'All'},
	{id: todolistID2, title: 'What to buy', filter: 'All'}
  ]
  
  const finalState = todolistsReducer(initialState, TasksFiltratorAC(newFilter, todolistID2))
  
  expect(finalState[0].filter).toBe('All')
  expect(finalState[1].filter).toBe(newFilter)
})

test('Title should have a title', ()=> {
  let todolistID1 = v1();
  let todolistID2 = v1();
  
  const newTitle:string = "My new Title"
  
  const initialState: Array<TodolistsType> = [
	{id: todolistID1, title: 'What to learn', filter: 'All'},
	{id: todolistID2, title: 'What to buy', filter: 'All'}
  ]
  
  const finalState = todolistsReducer(initialState, TitleEditorAC(newTitle, todolistID1))
  
  expect(finalState[1].title).toBe('What to buy')
  expect(finalState[0].title).toBe(newTitle)
})