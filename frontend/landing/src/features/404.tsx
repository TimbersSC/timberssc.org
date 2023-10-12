import React from 'react';
import { NavLink } from 'react-router-dom';

export const NoMatch = () => {
  return (
    <div>
      <h1>404!</h1>
      <p>You're lost</p>
      <NavLink to='/'>Return!</NavLink>
    </div>
  );
};
