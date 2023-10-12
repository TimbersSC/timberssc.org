import React from 'react';
import {
  GearIcon,
  SignOutIcon,
  PersonIcon,
  BeakerIcon,
  BookIcon,
  GoalIcon,
  MortarBoardIcon,
  IssueOpenedIcon,
  ToolsIcon,
  LinkExternalIcon,
  FlameIcon,
  KebabHorizontalIcon,
} from '@primer/octicons-react';

export const LifewordDescription =
  'You choose to focus your attention on what you care about most. Over the course of your life, you will be asked to care about many things. This lifeword helps cut through that noise to highlight your passions and your ways of seeing the world. When people see your lifeword, they see you!';

export const GoalsIcon = GoalIcon;
export const TasksIcon = IssueOpenedIcon;

export const PrioritySvg = {
  None: React.forwardRef(function None(props, ref): JSX.Element {
    return (
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        aria-label='No Priority'
        fill='#858699'
      >
        <rect
          x='1'
          y='7.25'
          width='3'
          height='1.5'
          rx='0.5'
          opacity='0.9'
        ></rect>
        <rect
          x='6'
          y='7.25'
          width='3'
          height='1.5'
          rx='0.5'
          opacity='0.9'
        ></rect>
        <rect
          x='11'
          y='7.25'
          width='3'
          height='1.5'
          rx='0.5'
          opacity='0.9'
        ></rect>
      </svg>
    );
  }),
  High: React.forwardRef(function High(props, ref): JSX.Element {
    return (
      <svg
        fill='#DCD8FE93'
        width='16'
        height='16'
        viewBox='0 0 16 16'
        aria-label='High Priority'
      >
        <rect x='1' y='8' width='3' height='6' rx='1'></rect>
        <rect x='6' y='5' width='3' height='9' rx='1'></rect>
        <rect x='11' y='2' width='3' height='12' rx='1'></rect>
      </svg>
    );
  }),
  Medium: React.forwardRef(function Medium(props, ref): JSX.Element {
    return (
      <svg
        fill='#DCD8FE93'
        width='16'
        height='16'
        viewBox='0 0 16 16'
        aria-label='Medium Priority'
      >
        <rect x='1' y='8' width='3' height='6' rx='1'></rect>
        <rect x='6' y='5' width='3' height='9' rx='1'></rect>
        <rect
          x='11'
          y='2'
          width='3'
          height='12'
          rx='1'
          fillOpacity='0.4'
        ></rect>
      </svg>
    );
  }),
  Low: React.forwardRef(function Low(props, ref): JSX.Element {
    return (
      <svg
        fill='#DCD8FE93'
        width='16'
        height='16'
        viewBox='0 0 16 16'
        aria-label='Low Priority'
      >
        <rect x='1' y='8' width='3' height='6' rx='1'></rect>
        <rect x='6' y='5' width='3' height='9' rx='1' fillOpacity='0.4'></rect>
        <rect
          x='11'
          y='2'
          width='3'
          height='12'
          rx='1'
          fillOpacity='0.4'
        ></rect>
      </svg>
    );
  }),
};

export enum Priority {
  None,
  Urgent,
  High,
  Medium,
  Low,
}

export const priorityList = [
  {
    title: 'No priority',
    icon: <PrioritySvg.None />,
    enum: Priority.None,
  },
  {
    title: 'Urgent',
    icon: <FlameIcon />,
    enum: Priority.Urgent,
  },
  {
    title: 'High',
    icon: <PrioritySvg.High />,
    enum: Priority.High,
  },
  {
    title: 'Medium',
    icon: <PrioritySvg.Medium />,
    enum: Priority.Medium,
  },
  {
    title: 'Low',
    icon: <PrioritySvg.Low />,
    enum: Priority.Low,
  },
];
