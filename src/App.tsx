import React from 'react';
import './App.css';
import {Todolist} from './components/Todolist';

function App() {
  const tasks = {
	tasks1 : [
	  {id: 0, title: 'HTML&CSS', isDone: true},
	  {id: 1, title: 'JS', isDone: true},
	  {id: 2, title: 'React', isDone: false},
	]
  }
  return (
	<div className="App">
	  <Todolist title={'What to learn'} tasks={tasks.tasks1}/>
	</div>
  );
}

export default App;
