import React, {useState} from 'react';
import './App.css';
import {taskType, Todolist} from './components/Todolist';

function App() {
  let [tasks, setTasks] = useState<Array<taskType>>([
	{id: '0', title: 'HTML&CSS', isDone: true},
	{id: '1', title: 'JS', isDone: true},
	{id: '2', title: 'React', isDone: false}
  ])
  
  let [filter, setFilter] = useState('Completed')
  
  
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
  
  return (
	<div className="App">
	  <Todolist title={'What to learn'} tasks={filteredTasks}
				removeTask={removeTask}/>
	</div>
  );
}

export default App;
