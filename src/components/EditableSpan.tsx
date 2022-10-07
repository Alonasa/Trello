import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
  title: string
  editTask: (title: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(props.title);
  
  const editOn = () => {
	setEditMode(true)
  }
  
  const editOff = () => {
	setEditMode(false)
	props.editTask(title)
  }
  
  const onChangeTitleHandler =(e: ChangeEvent<HTMLInputElement>) => {
	setTitle(e.currentTarget.value)
  }
  
  return editMode ? <input value={title} onBlur={editOff} onChange={onChangeTitleHandler}/> :
	<span onDoubleClick={editOn}>{props.title}</span>
}