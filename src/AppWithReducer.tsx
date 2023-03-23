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
	dispatchTasks(RemoveTaskAC(todolistId, id))
  }
  
  const tasksFiltrator = (status: TasksStatusType, todolistId: string) => {
	dispatchTodolist(TasksFiltratorAC(status, todolistId))
  }
  
  const addNewTask = (value: string, todolistId: string) => {
	dispatchTasks(AddTaskAC(value, todolistId))
  }
  
  const editTask = (value: string, tlId: string, taskId: string) => {
	dispatchTasks(ChangeTaskTitleAC(tlId, taskId, value))
  }
  
  const editTlTitle = (value: string, tlId: string) => {
	dispatchTodolist(TitleEditorAC(value, tlId))
  }
  
  const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
	dispatchTasks(ChangeTaskStatusAC(todolistId, id, isDone))
  }
  
  const removeTodolist = (id: string) => {
    let action = RemoveTodolistAC(id)
	dispatchTodolist(action)
	dispatchTasks(action)
  }
  
  const addTodolist = (title: string) => {
    let action = AddTodolistAC(title);
	dispatchTodolist(action)
	dispatchTasks(action)
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
