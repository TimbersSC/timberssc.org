import React from 'react';
import { Link } from 'react-router-dom';

import { ActionList, Text } from '@primer/react';

import { greeting } from '@utils/misc';

interface BreadcrumbsProps {
  name: string;
  url: string;
}

export const BreadcrumbsContext = React.createContext<
  BreadcrumbsProps[] | void
>(null);
export const BreadcrumbsDispatcherContext =
  React.createContext<typeof breadcrumbsReducer>(null);

export const breadcrumbsReducer = (
  breadcrumbs?: any,
  action?: BreadcrumbsProps[] | void,
) => {
  return action;
};

export const Breadcrumbs = () => {
  const breadcrumbs = React.useContext(BreadcrumbsContext);

  if (!breadcrumbs) {
    return (
      <Text
        style={{
          marginLeft: '0.5rem',
        }}
      >
        {greeting()}, Timbers fan!
      </Text>
    );
  }

  return (
    <ActionList
      sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        justifyItems: 'flex-start',
        alignItems: 'center',
        width: '100%',
        py: 0,
        '> li': {
          margin: 0,
          width: 'auto',
        },
      }}
    >
      {breadcrumbs.map((breadcrumb: BreadcrumbsProps, index: number) => {
        const isLast = index == breadcrumbs.length - 1;
        return (
          <>
            <ActionList.LinkItem
              as={Link}
              to={breadcrumb.url}
              key={index}
              sx={{
                width: 'auto',
                color: !isLast ? 'fg.subtle' : 'inherit',
                transition: 'color 0.25s ease',
              }}
            >
              {breadcrumb.name}
            </ActionList.LinkItem>
            {!isLast && (
              <Text
                as='span'
                sx={{
                  color: 'fg.subtle',
                  mx: '0.25rem',
                }}
              >
                /
              </Text>
            )}
          </>
        );
      })}
    </ActionList>
  );
};
