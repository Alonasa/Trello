import {useState} from 'react';
import {TodolistsType} from '../App';
import {v1} from 'uuid';
import {todolistsReducer} from './todolists-reducer';

test('todolist should be added', ()=>{
  let todolistID1 = v1();
  let todolistID2 = v1();
  const newTodolistId:string = v1();
  let newTodolistTitle = 'I am a new title'
  
  const initialState:Array<TodolistsType>=[
	  {id: todolistID1, title: 'What to learn', filter: 'All'},
	  {id: todolistID2, title: 'What to buy', filter: 'All'}
	]
  
  const finalState = todolistsReducer(initialState, {type:'ADD-TODOLIST', title: newTodolistTitle})

  expect(finalState.length).toBe(3)
  expect(finalState[2].title).toBe(newTodolistTitle)
})

test('Todolist should be removed', ()=> {

})