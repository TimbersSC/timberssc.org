import React from 'react';

import { Button } from '@primer/react';

const FerantButton = (props: any) => {
  return (
    <Button
      sx={{
        width: '336px',
        height: '48px',
        span: {
          display: 'inline-flex',
          alignItems: 'center',
        },
      }}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  );
};

export default FerantButton;
