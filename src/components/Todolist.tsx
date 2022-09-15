import React from 'react';

type todolistType = {
  title: string
  tasks: Array<taskType>
}

type taskType = {
  id: number
  title: string
  isDone: boolean
}

export const Todolist = (props: todolistType) => {
  return (
	<div>
	  <h3>{props.title}</h3>
	  <div>
		<input/>
		<button>+</button>
	  </div>
	  <ul>
		{props.tasks.map(
		  task =>
			<li><input type="checkbox" checked={task.isDone}/>
			  <span>{task.title}</span>
			  <button>x</button>
			</li>
		)}
	  </ul>
	  <div>
		<button>All</button>
		<button>Active</button>
		<button>Completed</button>
	  </div>
	</div>
  )
}