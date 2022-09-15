import React from 'react';

type todolistType = {
  title: string
  tasks: Array<taskType>
  removeTask: (id: string) => void
}

export type taskType = {
  id: string
  title: string
  isDone: boolean
}

export const Todolist = (props: todolistType) => {
  const taskRemover = (id: string) => {
	props.removeTask(id)
  }
  
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
			<li id={task.id}><input type="checkbox" checked={task.isDone}/>
			  <span>{task.title}</span>
			  <button onClick={(e)=>taskRemover(task.id)}>x</button>
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