import { Input } from '@mui/material';
import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
  title: string
  editTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(props.title);
  
  const editOn = () => {
	setEditMode(true)
  }
  
  const editOff = () => {
	setEditMode(false)
	props.editTitle(title)
  }
  
  const onChangeTitleHandler =(e: ChangeEvent<HTMLInputElement>) => {
	setTitle(e.currentTarget.value)
  }
  
  return editMode ? <Input value={title} onBlur={editOff} onChange={onChangeTitleHandler}/> :
	<span onDoubleClick={editOn}>{props.title}</span>
}