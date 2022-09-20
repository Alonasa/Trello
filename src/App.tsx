import React, {useState} from 'react';
import './App.css';
import {tasksStatusType, taskType, Todolist} from './components/Todolist';
import {v1} from 'uuid';

function App() {
  let [tasks, setTasks] = useState<Array<taskType>>([
	{id: v1(), title: 'HTML&CSS', isDone: true},
	{id: v1(), title: 'JS', isDone: true},
	{id: v1(), title: 'React', isDone: false}
  ])
  
  let [filter, setFilter] = useState<tasksStatusType>('All')
  
  const removeTask = (id: string) => {
	const newTasks = tasks.filter((t) => t.id !== id)
	setTasks([...newTasks])
  }
  
  let filteredTasks = tasks;
  if (filter === 'Completed') {
	filteredTasks = tasks.filter(t => t.isDone)
  }
  if (filter === 'Active') {
	filteredTasks = tasks.filter(t => !t.isDone)
  }
  
  const tasksFiltrator = (status: tasksStatusType) => {
	setFilter(status)
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
	  <Todolist title={'What to learn'} tasks={filteredTasks}
				removeTask={removeTask} filterTasks={tasksFiltrator}
				addTask={addNewTask} changeTaskStatus={changeTaskStatus} filter={filter}
				/>
	</div>
  );
}

export default App;
