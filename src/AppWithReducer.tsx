import React, {useReducer} from 'react';
import './App.css';
import {TasksStatusType, Todolist} from './components/Todolist/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {Grid, ThemeProvider} from '@mui/material';
import {Theme} from './components/Theme';
import MenuAppBar from './components/MenuApp/MenuAppBar';
import {
  AddTodolistAC,
  RemoveTodolistAC,
  TasksFiltratorAC,
  TitleEditorAC,
  todolistsReducer
} from './state/todolists-reducer';
import {
  AddTaskAC,
  ChangeTaskStatusAC,
  ChangeTaskTitleAC,
  RemoveTaskAC,
  tasksReducer
} from './state/tasks-reducer';

export type TodolistsType = {
  id: string
  title: string
  filter: TasksStatusType
}

function AppWithReducer() {
  let todolistID1 = v1();
  let todolistID2 = v1();
  
  
  let [todolists, dispatchTodolist] = useReducer(todolistsReducer, [
	  {id: todolistID1, title: 'What to learn', filter: 'All'},
	  {id: todolistID2, title: 'What to buy', filter: 'All'}
	]
  )
  
  let [tasks, dispatchTasks] = useReducer(tasksReducer, {
	[todolistID1]: [
	  {id: v1(), title: 'HTML&CSS', isDone: true},
	  {id: v1(), title: 'JS', isDone: true},
	  {id: v1(), title: 'React', isDone: false},
	],
	[todolistID2]: [
	  {id: v1(), title: 'Rest API', isDone: true},
	  {id: v1(), title: 'GraphQL', isDone: true},
	]
  })
  
  const removeTask = (id: string, todolistId: string) => {
	let action = RemoveTaskAC(todolistId, id)
	dispatchTasks(action)
  }
  
  const tasksFiltrator = (status: TasksStatusType, todolistId: string) => {
	let action = TasksFiltratorAC(status, todolistId)
	dispatchTodolist(action)
  }
  
  const addNewTask = (value: string, todolistId: string) => {
	let action = AddTaskAC(value, todolistId)
	dispatchTasks(action)
  }
  
  const editTask = (value: string, tlId: string, taskId: string) => {
	let action = ChangeTaskTitleAC(tlId, taskId, value)
	dispatchTasks(action)
  }
  
  const editTlTitle = (value: string, tlId: string) => {
	let action = TitleEditorAC(value, tlId)
	dispatchTodolist(action)
  }
  
  const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
	let action = ChangeTaskStatusAC(todolistId, id, isDone)
	dispatchTasks(action)
  }
  
  const removeTodolist = (id: string) => {
	let action = RemoveTodolistAC(id)
	dispatchTodolist(action)
  }
  
  const addTodolist = (title: string) => {
	let action = AddTodolistAC(title)
	dispatchTodolist(action)
  }
  
  
  return (
	<div className="App">
	  <ThemeProvider theme={Theme}>
		<MenuAppBar/>
		<Grid container style={{padding: '20px 40px'}}>
		  <AddItemForm addItem={addTodolist}/>
		  {todolists.map(todolist => {
			let filteredTasks = tasks[todolist.id];
			
			if (todolist.filter === 'Completed') {
			  filteredTasks = tasks[todolist.id].filter(t => t.isDone)
			}
			if (todolist.filter === 'Active') {
			  filteredTasks = tasks[todolist.id].filter(t => !t.isDone)
			}
			
			return <Todolist
			  key={todolist.id}
			  id={todolist.id}
			  title={todolist.title}
			  tasks={filteredTasks}
			  removeTask={removeTask}
			  filterTasks={tasksFiltrator}
			  addTask={addNewTask}
			  editTask={editTask}
			  editTlTitle={editTlTitle}
			  changeTaskStatus={changeTaskStatus}
			  filter={todolist.filter}
			  removeTodolist={removeTodolist}
			/>
		  })
			
		  }
		</Grid>
	  </ThemeProvider>
	</div>
  );
}

export default AppWithReducer;
