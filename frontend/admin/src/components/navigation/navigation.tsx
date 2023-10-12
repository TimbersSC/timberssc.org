import { Link } from 'react-router-dom';

import { Header, useTheme, Text } from '@primer/react';
import { rgba } from 'polished';

import { SearchComponent } from './search';
import { NotificationsComponent } from './notifications';
import { Breadcrumbs } from './breadcrumbs';

import { NavLinks } from './menu/nav';

export const NavigationComponent = () => {
  const { theme } = useTheme();

  return (
    <Header
      sx={{
        position: 'sticky',
        top: 0,
        width: '100%',
        boxShadow: theme.shadows.shadow.medium,
        backdropFilter: 'saturate(190%) blur(10px)',
        backgroundColor: rgba(theme.colors.canvas.inset, 1),
        borderBottom: `1px solid ${rgba(theme.colors.border.subtle, 0.1)}`,
      }}
    >
      <Header.Item>
        <NavLinks />
      </Header.Item>
      <Header.Item sx={{ mr: '1.5rem' }}>
        <Link to='//ferant.io' key='logo-link' style={{ lineHeight: 0 }}>
          <img
            src='//cdn.ferant.io/branding/logo-symbol.png'
            alt='Ferant logomark'
            height='32'
          />
        </Link>
        <Text
          as='span'
          sx={{
            fontSize: '2rem',
            mx: '0.5rem',
            opacity: 0.25,
          }}
        >
          /
        </Text>
        <Text
          as={Link}
          to={'/'}
          sx={{
            width: 'auto',
            color: 'fg.default',
            transition: 'opacity 0.25s ease',
            fontSize: '1.25rem',
            ':hover': {
              opacity: 0.6,
            },
          }}
        >
          Discovery
        </Text>
      </Header.Item>
      <Header.Item sx={{ color: 'fg.default' }} full>
        <Breadcrumbs></Breadcrumbs>
      </Header.Item>
      <Header.Item>
        <SearchComponent />
      </Header.Item>
      <Header.Item sx={{ color: 'fg.subtle', lineHeight: 0 }}>|</Header.Item>
      {/* <Header.Item>
        <ActionsComponent />
      </Header.Item> */}
      <Header.Item>
        {/* @TODO: Subscribe button */}
        <NotificationsComponent />
      </Header.Item>
    </Header>
  );
};
