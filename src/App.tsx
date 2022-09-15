import React, {useState} from 'react';
import './App.css';
import {taskType, Todolist} from './components/Todolist';

function App() {
	let [tasks, setTasks] = useState<Array<taskType>>([
	  {id: '0', title: 'HTML&CSS', isDone: true},
	  {id: '1', title: 'JS', isDone: true},
	  {id: '2', title: 'React', isDone: false}
	])
  
  
  const removeTask = (id: string) => {
    const newTasks = tasks.filter((t: any) => t.id !== id)
	setTasks([...newTasks])
  }
  
  return (
	<div className="App">
	  <Todolist title={'What to learn'} tasks={tasks} removeTask={removeTask}/>
	</div>
  );
}

export default App;
