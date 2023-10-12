import React from 'react';

import { ToastContainer as Toastify, toast } from 'react-toastify';
import styled from 'styled-components';
import { themeGet } from '@primer/react';

export const ToastContainer = styled(Toastify).attrs({
  className: 'toast-container',
  toastClassName: 'toast',
  bodyClassName: 'body',
  progressClassName: 'progress',
})`
  .toast {
    background-color: ${themeGet('colors.canvas.inset')};
    box-shadow: ${themeGet('shadows.shadow.medium')};
    border: 1px solid ${themeGet('colors.border.default')};
    transition: all 1s ease-in-out;
    font-family: inherit;
    font-size: 0.875em;
    backdrop-filter: saturate(190%) blur(10px);
  }

  button[aria-label='close'] {
    color: ${themeGet('colors.fg.subtle')};
    &:hover {
      color: ${themeGet('colors.fg.default')};
    }
  }

  .progress {
    height: 3px;
  }

  .Toastify__toast-icon {
    width: 1rem;
    height: 1rem;
  }
`;

export const SetupToastifyColors = (theme: any) => {
  const setVariables = (vars: any) =>
    Object.entries(vars).forEach((v) =>
      (document.querySelector(':root') as any).style.setProperty(v[0], v[1]),
    );
  const myVariables = {
    '--toastify-color-info': theme.colors.accent.fg,
    '--toastify-color-success': theme.colors.success.fg,
    '--toastify-color-warning': theme.colors.attention.fg,
    '--toastify-color-error': theme.colors.danger.fg,
    '--toastify-color-progress-light': theme.colors.fg.subtle,
  };
  setVariables(myVariables);
};

export const Toast = toast;
