import React, {ChangeEvent, KeyboardEvent} from 'react';

type UniversalInputType = {
  value: string
  onChangeCb: (e: ChangeEvent<HTMLInputElement>)=>void
  onKeyPressCb: (e: KeyboardEvent<HTMLInputElement>)=> void
  className: string
}

export const UniversalInput = (props: UniversalInputType) => {
 const {value, onChangeCb, className, onKeyPressCb} = props
  return (
	<input value={value}
		   onChange={onChangeCb}
		   onKeyPress={onKeyPressCb}
		   className={className}>
	  
	</input>
  );
};