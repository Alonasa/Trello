import React, {useReducer} from 'react';
import './App.css';
import {
  TasksStatusType,
  Todolist,
  TodolistTasksType
} from './components/Todolist/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {Grid, ThemeProvider} from '@mui/material';
import {Theme} from './components/Theme';
import MenuAppBar from './components/MenuApp/MenuAppBar';
import {
  AddTodolistAC,
  RemoveTodolistAC,
  TasksFiltratorAC,
  TitleEditorAC
} from './state/todolists-reducer';
import {
  AddTaskAC,
  ChangeTaskStatusAC,
  ChangeTaskTitleAC,
  RemoveTaskAC,
  tasksReducer
} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type TodolistsType = {
  id: string
  title: string
  filter: TasksStatusType
}

function AppWithRedux() {
  let todolistID1 = v1();
  let todolistID2 = v1();
  
  let todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)
  let tasks = useSelector<AppRootStateType, TodolistTasksType>(state => state.tasks)
  
  const dispatch = useDispatch();
  
  
  const removeTask = (id: string, todolistId: string) => {
	dispatch(RemoveTaskAC(todolistId, id))
  }
  
  const tasksFiltrator = (status: TasksStatusType, todolistId: string) => {
	dispatch(TasksFiltratorAC(status, todolistId))
  }
  
  const addNewTask = (value: string, todolistId: string) => {
	dispatch(AddTaskAC(value, todolistId))
  }
  
  const editTask = (value: string, tlId: string, taskId: string) => {
	dispatch(ChangeTaskTitleAC(tlId, taskId, value))
  }
  
  const editTlTitle = (value: string, tlId: string) => {
	dispatch(TitleEditorAC(value, tlId))
  }
  
  const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
	dispatch(ChangeTaskStatusAC(todolistId, id, isDone))
  }
  
  const removeTodolist = (id: string) => {
	dispatch(RemoveTodolistAC(id))
  }
  
  const addTodolist = (title: string) => {
	dispatch(AddTodolistAC(title))
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

export default AppWithRedux;
