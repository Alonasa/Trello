import React from 'react';
import './App.css';
import {Todolist} from './components/Todolist';

function App() {
  const tasks = {
	tasks1 : [
	  {id: 0, title: 'HTML&CSS', isDone: true},
	  {id: 1, title: 'JS', isDone: true},
	  {id: 2, title: 'React', isDone: false},
	],
	tasks2 : [
	  {id: 3, title: 'Algorithms', isDone: false},
	  {id: 4, title: 'Patterns', isDone: false},
	  {id: 5, title: 'You dont know JS', isDone: false},
	],
	tasks3 : [
	  {id: 6, title: 'React js Samurai', isDone: false},
	  {id: 7, title: 'Homeworks', isDone: false},
	],
  }
  return (
	<div className="App">
	  <Todolist title={'What to learn'} tasks={tasks.tasks1}/>
	  <Todolist title={'What to read'} tasks={tasks.tasks2}/>
	  <Todolist title={'What to watch'} tasks={tasks.tasks3}/>
	</div>
  );
}

export default App;
