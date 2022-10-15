import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, Input} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from '../AddItemForm/AddItemForm.module.css'

type AddItemFormType = {
  addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {
  let [error, setError] = useState<string | null>(null)
  let [title, setTitle] = useState('');
  
  const getFieldValue = (e: ChangeEvent<HTMLInputElement>) => {
	setTitle(e.currentTarget.value)
	setError(null)
  }
  
  const addTaskHandler = () => {
	if (title) {
	  props.addItem(title)
	  setTitle('')
	} else {
	  setError(`You can't send an empty title`)
	}
  }
  
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
	if (e.key === 'Enter') {
	  addTaskHandler()
	}
  }
  
  return (
	<div className={styles.add__item}>
	  <Input
		size={'small'}
		value={title} onChange={getFieldValue}
		onKeyPress={onKeyPressHandler} className={error ? 'error' : ''}
	  />
	  <IconButton color={'primary'} onClick={addTaskHandler} style={{padding: '0'}}><AddIcon/></IconButton>
	  {error && <div className={'error-message'}>{error}</div>}
	</div>
  );
};