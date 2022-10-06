import React from 'react';

type UniversalButtonType = {
  callback: ()=> void
}

export const UniversalButton = (props: UniversalButtonType) => {
  const {callback} = props
  return (
	<button onClick={callback}>+</button>
  );
};