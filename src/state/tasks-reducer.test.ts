import {TodolistTasksType} from '../components/Todolist/Todolist';
import {AddTaskAC, tasksReducer} from './tasks-reducer';


test('Task should be added to specified Todolist', () => {
  let newTaskTitle = 'I am a new title'
  const initialState: TodolistTasksType = {
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
  
  const finalState = tasksReducer(initialState, AddTaskAC(newTaskTitle, 'todolistId2'))
  
  expect(finalState['todolistId2'].length).toBe(4)
  expect(finalState['todolistId2'][0].title).toBe(newTaskTitle)
})
