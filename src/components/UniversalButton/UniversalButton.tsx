import React from 'react';
import {isMuiElement} from '@mui/material';

type UniversalButtonType = {
  callback: ()=> void
}

export const UniversalButton = (props: UniversalButtonType) => {
  const {callback} = props
  return (
	<button onClick={callback}>+</button>
  );
};