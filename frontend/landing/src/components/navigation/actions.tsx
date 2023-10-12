import React from 'react';
import {
  ActionMenu,
  ActionList,
  Button,
  Tooltip,
  StyledOcticon,
  IconButton,
} from '@primer/react';
import { TriangleDownIcon, PlusIcon } from '@primer/octicons-react';
import { GoalsIcon, TasksIcon } from '@constants';

import { ButtonSX } from './utils';

import { Dialog } from '@shared/dialog/dialog';

export const ActionsComponent = () => {
  const actions = [
    {
      title: 'Add a task',
      component: '/me',
      icon: <TasksIcon />,
    },
    {
      title: 'Add a goal',
      component: '/todos/goals',
      icon: <GoalsIcon />,
    },
  ];

  return (
    <ActionMenu>
      <ActionMenu.Anchor>
        <Button
          trailingIcon={TriangleDownIcon}
          aria-labelledby='Actions'
          sx={ButtonSX}
        >
          <StyledOcticon icon={PlusIcon} size={16} sx={{ bg: 'transparent' }} />
        </Button>
      </ActionMenu.Anchor>
      <ActionMenu.Overlay>
        <ActionList>
          <React.Fragment>
            {actions.map((link: any, index: number) => (
              <ActionList.Item key={index}>
                <ActionList.LeadingVisual>{link.icon}</ActionList.LeadingVisual>
                {link.title}
              </ActionList.Item>
            ))}
          </React.Fragment>
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
};
