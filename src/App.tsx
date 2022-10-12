import React, {useState} from 'react';
import './App.css';
import {
  TasksStatusType,
  Todolist,
  TodolistStateType
} from './components/Todolist/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {Grid, ThemeProvider} from '@mui/material';
import {Theme} from './components/Theme';
import MenuAppBar from './components/MenuAppBar';

type TodolistsType = {
  id: string
  title: string
  filter: TasksStatusType
}

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();
  
  
  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
	  {id: todolistID1, title: 'What to learn', filter: 'All'},
	  {id: todolistID2, title: 'What to buy', filter: 'All'}
	]
  )
  
  let [tasks, setTasks] = useState<TodolistStateType>({
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
	setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})
  }
  
  const tasksFiltrator = (status: TasksStatusType, todolistId: string) => {
	setTodolists(todolists.map(t => t.id === todolistId ? {
	  ...t,
	  filter: status
	} : t))
  }
  
  const addNewTask = (value: string, todolistId: string) => {
	if (value) {
	  const newTask = {id: v1(), title: value.trim(), isDone: false};
	  setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
	}
  }
  
  const editTask = (value: string, tlId: string, taskId: string) => {
	const task = tasks[tlId].find(t => t.id === taskId)
	if (task) {
	  task.title = value
	}
	setTasks({...tasks})
  }
  
  const editTlTitle = (value: string, tlId: string) => {
	setTodolists(todolists.map(t=> t.id === tlId ? {...t, title:value} : t))
  }
  
  const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
	const task = tasks[todolistId].find(t => t.id === id);
	if (task) {
	  task.isDone = !isDone
	}
	setTasks({...tasks})
  }
  
  const removeTodolist = (id: string) => {
	setTodolists(todolists.filter(t => t.id !== id))
	delete tasks[id]
  }
  
  const addTodolist = (title: string) => {
	const newTl:TodolistsType = {id: v1(), title: title, filter: 'All'}
  	setTodolists([newTl, ...todolists])
	setTasks({...tasks, [newTl.id]:[]})
  }
  
  
  return (
	<div className="App" >
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

export default App;
