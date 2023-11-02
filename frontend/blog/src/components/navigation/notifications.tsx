import React, { useState } from 'react';

import { Tooltip, IconButton, StyledOcticon, themeGet } from '@primer/react';
import { InboxIcon } from '@primer/octicons-react';
import styled from 'styled-components';

import { Toast } from '@components/toasts';
import { ButtonSX } from './utils';

const ReadIcon = styled.span<{ unread: boolean }>`
  display: ${({ unread }) => (unread ? 'block' : 'none')};
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -25%);
  z-index: 2;
  height: 14px;
  width: 14px;
  border-radius: 16px;
  border: 2px solid;
  background-color: ${themeGet('colors.accent.emphasis')};
  border-color: ${themeGet('colors.canvas.inset')};
`;

export const NotificationsComponent = () => {
  const [unread, setUnread] = useState(true);

  return (
    <Tooltip
      aria-label={`You have${unread ? '' : ' no'} unread notifications`}
      direction='sw'
    >
      <IconButton
        icon={() => (
          <>
            <StyledOcticon icon={InboxIcon} sx={{ bg: 'transparent' }} />
            <ReadIcon unread={unread}></ReadIcon>
          </>
        )}
        aria-labelledby='Notifications'
        onClick={() => {
          Toast.warning('Not implemented yet');
        }}
        sx={{ position: 'relative', ...ButtonSX }}
      />
    </Tooltip>
  );
};
