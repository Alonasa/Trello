import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {UniversalButton} from '../UniversalButton/UniversalButton';

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
	<div>
	  <input value={title} onChange={getFieldValue}
			 onKeyPress={onKeyPressHandler} className={error ? 'error' : ''}/>
	  <UniversalButton callback={addTaskHandler}/>
	  {error && <div className={'error-message'}>{error}</div>}
	</div>
  );
};