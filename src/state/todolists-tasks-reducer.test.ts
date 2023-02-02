import {tasksReducer} from './tasks-reducer';
import { AddTodolistAC } from './todolists-reducer';
import {TodolistTasksType} from '../components/Todolist/Todolist';

test('new array should be added when new todolist is added', () => {
  const startState: TodolistTasksType = {
	'todolistId1': [
	  {id: '1', title: 'CSS', isDone: false},
	  {id: '2', title: 'JS', isDone: true},
	  {id: '3', title: 'React', isDone: false}
	],
	'todolistId2': [
	  {id: '1', title: 'bread', isDone: false},
	  {id: '2', title: 'milk', isDone: true},
	  {id: '3', title: 'tea', isDone: false}
	]
  }
  
  const action = AddTodolistAC('new todolist')
  
  const endState = tasksReducer(startState, action)
  
  
  const keys = Object.keys(endState)
  const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
  if (!newKey) {
	throw Error('new key should be added')
  }
  
  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})
