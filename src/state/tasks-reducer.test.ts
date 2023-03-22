import {TodolistTasksType} from '../components/Todolist/Todolist';
import {
  AddTaskAC, ChangeTaskStatusAC,
  ChangeTaskTitleAC,
  RemoveTaskAC,
  tasksReducer
} from './tasks-reducer';

let initialState: TodolistTasksType

beforeEach(()=> {
  initialState = {
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
})

test('Task should be added to specified Todolist', () => {
  let newTaskTitle = 'I am a new title'
  const finalState = tasksReducer(initialState, AddTaskAC(newTaskTitle, 'todolistId2'))
  
  expect(finalState['todolistId2'].length).toBe(4)
  expect(finalState['todolistId2'][0].title).toBe(newTaskTitle)
})

test('Task should be removed from specified Todolist', () => {
  const finalState = tasksReducer(initialState, RemoveTaskAC('todolistId2', '3'))
  
  expect(finalState['todolistId2'].length).toBe(2)
  expect(finalState['todolistId2'][1].id).toBe('2')
  expect(finalState['todolistId1'].length).toBe(3)
})

test('Task should change its title', () => {
  let newTitle = 'Changed title'
  const finalState = tasksReducer(initialState, ChangeTaskTitleAC('todolistId2', '3', newTitle))
  
  expect(finalState['todolistId2'][2].title).toBe(newTitle)
  expect(finalState['todolistId1'][2].title).toBe('React')
})

test('Task should change its status', () => {
  const finalState = tasksReducer(initialState, ChangeTaskStatusAC('todolistId1', '3', true))
  
  expect(finalState['todolistId1'][2].isDone).toBe(true)
  expect(finalState['todolistId1'][2].title).toBe('React')
})
