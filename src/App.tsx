import React, {useState} from 'react';
import './App.css';
import {TasksStatusType, TaskType, Todolist} from './components/Todolist';
import {v1} from 'uuid';

type TodolistsType = {
  id: string
  title: string
  filter: TasksStatusType
}

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();
  
  
  let [todolists, setTodolists] = useState<Array<TodolistsType>>(
	[
	  {id: todolistID1, title: 'What to learn', filter: 'All'},
	  {id: todolistID2, title: 'What to buy', filter: 'All'},
	]
  )
  
  let [tasks, setTasks] = useState({
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
  
  const removeTask = (id: string) => {
	const newTasks = tasks.filter((t) => t.id !== id)
	setTasks([...newTasks])
  }
  
  const tasksFiltrator = (status: TasksStatusType, todolistId: string) => {
	setTodolists(todolists.map(t => t.id === todolistId ? {
	  ...t,
	  filter: status
	} : t))
  }
  
  const addNewTask = (value: string) => {
	if (value) {
	  const newTask = {id: v1(), title: value.trim(), isDone: false};
	  setTasks([...tasks, newTask]);
	}
  }
  
  const changeTaskStatus = (id: string, isDone: boolean) => {
	const task = tasks.find(t => t.id === id);
	if (task) {
	  task.isDone = !isDone
	}
	setTasks([...tasks])
  }
  
  return (
	<div className="App">
	  {
		todolists.map(todolist => {
		  let filteredTasks = tasks;
		  
		  if (todolist.filter === 'Completed') {
			filteredTasks = tasks.filter(t => t.isDone)
		  }
		  if (todolist.filter === 'Active') {
			filteredTasks = tasks.filter(t => !t.isDone)
		  }
		  
		  return <Todolist
			key={todolist.id}
			id={todolist.id}
			title={todolist.title}
			tasks={filteredTasks}
			removeTask={removeTask}
			filterTasks={tasksFiltrator}
			addTask={addNewTask}
			changeTaskStatus={changeTaskStatus}
			filter={todolist.filter}
		  />
		})
		
	  }
	</div>
  );
}

export default App;
