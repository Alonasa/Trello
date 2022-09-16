import React, {useState} from 'react';
import './App.css';
import {tasksStatusType, taskType, Todolist} from './components/Todolist';

function App() {
  let [tasks, setTasks] = useState<Array<taskType>>([
	{id: '0', title: 'HTML&CSS', isDone: true},
	{id: '1', title: 'JS', isDone: true},
	{id: '2', title: 'React', isDone: false}
  ])
  
  let [filter, setFilter] = useState('All')
  
  
  const removeTask = (id: string) => {
	const newTasks = tasks.filter((t: any) => t.id !== id)
	setTasks([...newTasks])
  }
  
  let filteredTasks = tasks;
  if (filter === 'Completed') {
	filteredTasks = tasks.filter(t => t.isDone === true)
  }
  if (filter === 'Active') {
	filteredTasks = tasks.filter(t => t.isDone !== true)
  }
  
  const tasksFiltrator = (status: tasksStatusType) => {
    setFilter(status)
  }
  
  return (
	<div className="App">
	  <Todolist title={'What to learn'} tasks={filteredTasks}
				removeTask={removeTask} filterTasks={tasksFiltrator}/>
	</div>
  );
}

export default App;
