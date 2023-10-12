import React from 'react';
import { createPortal as rcp } from 'react-dom';

export const createPortal = (children: any): JSX.Element => {
  return rcp(children, document.getElementById('baseRoot'));
};
