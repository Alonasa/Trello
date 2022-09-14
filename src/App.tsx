import React from 'react';
import './App.css';
import {Todolist} from './components/Todolist';

function App() {
  return (
	<div className="App">
	  <Todolist title={"What to learn"}/>
	  <Todolist title={"What to read"}/>
	  <Todolist title={"What to watch"}/>
	</div>
  );
}

export default App;
