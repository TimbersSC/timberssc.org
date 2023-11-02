import React from 'react';

import '@assets/scss/app.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-day-picker/dist/style.css';

import { FerantApp } from './ferant';

import { AuthApp } from './auth';

export const App = () => {
  return (
    <AuthApp>
      <FerantApp />
    </AuthApp>
  );
};
