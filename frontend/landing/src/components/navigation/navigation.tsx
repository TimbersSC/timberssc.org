import { Link } from 'react-router-dom';

import { Header, useTheme, Text, Box } from '@primer/react';
import { rgba } from 'polished';

import { SubscribeComponent } from './subscribe';
import { Breadcrumbs } from './breadcrumbs';
import logo from '@public/images/logos/timbers_sc.logo.black.png';

import { NavLinks } from './menu/nav';

export const NavigationComponent = () => {
  const { theme } = useTheme();

  return (
    <Header
      sx={{
        position: 'sticky',
        top: 0,
        width: '100%',
        boxSizing: 'border-box',
        boxShadow: 'shadow.medium',
        backdropFilter: 'saturate(190%) blur(10px)',
        backgroundColor: rgba(theme.colors.canvas.inset, 1),
        borderBottom: `1px solid ${rgba(theme.colors.border.subtle, 0.1)}`,
        py: [1, 2],
        height: '60px',
      }}
    >
      <Header.Item sx={{ display: ['none', 'flex'] }}>
        <NavLinks />
      </Header.Item>
      <Header.Item
        sx={{
          mr: '1.5rem',
          width: ['100%', 'auto'],
        }}
      >
        <Box
          sx={{
            height: '60px',
          }}
        >
          <Link to='//timberssc.org' key='logo-link' style={{ lineHeight: 0 }}>
            <Box
              as='img'
              src={logo}
              alt='Timbers SC logo'
              height='108'
              sx={{
                display: 'block',
                bg: 'black',
                pt: 1,
                px: 2,
                pb: 2,
                borderRadius: '0 0 40px 40px',
              }}
            />
          </Link>
        </Box>
        <Text
          as={Link}
          to={'/'}
          sx={{
            ml: '0.5rem',
            width: 'auto',
            color: 'fg.default',
            transition: 'opacity 0.25s ease',
            fontSize: [2, '1.25rem'],
            fontWeight: 500,
            ':hover': {
              opacity: 0.6,
            },
          }}
        >
          Timbers SC
        </Text>
        <Text
          as={Link}
          to={'/'}
          sx={{
            display: ['none', 'flex'],
            mx: '0.5rem',
            width: 'auto',
            color: 'fg.default',
            transition: 'opacity 0.25s ease',
            fontSize: 1,
            ':hover': {
              opacity: 0.6,
            },
          }}
        >
          | Official Timbers Website
        </Text>
      </Header.Item>
      <Header.Item sx={{ display: ['none', 'flex'], color: 'fg.default' }} full>
        <Breadcrumbs></Breadcrumbs>
      </Header.Item>
      <Header.Item
        sx={{
          display: ['none', 'flex'],
        }}
      >
        <SubscribeComponent />
      </Header.Item>
      <Header.Item sx={{ display: ['flex', 'none'] }}>
        <NavLinks />
      </Header.Item>
    </Header>
  );
};
