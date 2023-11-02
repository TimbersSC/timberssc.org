import { Link as RouterLink } from 'react-router-dom';

import { ActionList, Box, Text, Link } from '@primer/react';

import { routes } from '@core/router/routes';
import logo from '@public/images/logos/timbers_sc.logo.black.png';

import { MenuPopup } from './menuPopup';
import { SubscribeComponent } from '../subscribe';

const footerLinks = [
  {
    href: '//about.timberssc.org',
    title: 'About',
  },
  {
    href: '//policies.timberssc.org/terms',
    title: 'Terms',
  },
  {
    href: '//policies.timberssc.org/privacy',
    title: 'Privacy',
  },
];

export const NavLinks = () => {
  return (
    <MenuPopup
      context={'navMenu'}
      header={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <RouterLink
            to='//timberssc.org'
            key='logo-link'
            style={{ lineHeight: 0 }}
          >
            <Box
              as='img'
              src={logo}
              alt='Timbers SC logo'
              height='54'
              sx={
                {
                  // position: 'absolute',
                }
              }
            />
          </RouterLink>
          <Text
            as={RouterLink}
            to={'/'}
            sx={{
              ml: '0.5rem',
              width: 'auto',
              color: 'fg.default',
              transition: 'opacity 0.25s ease',
              fontSize: '1.25rem',
              fontWeight: 500,
              ':hover': {
                opacity: 0.6,
              },
            }}
          >
            Timbers SC
          </Text>
        </Box>
      }
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          position: 'relative',
          padding: '0 0.5rem',
        }}
      >
        <Box>
          <ActionList>
            {/* <ActionList.LinkItem as={RouterLink} to={'/'}>
              <ActionList.LeadingVisual>
                <HomeIcon />
              </ActionList.LeadingVisual>
              Latest
            </ActionList.LinkItem> */}

            {routes.map((route: any, index: number) => {
              if (route.displayNav) {
                return (
                  <ActionList.LinkItem
                    key={`${route}${index}`}
                    as={RouterLink}
                    to={route.path ?? '/'}
                  >
                    {route.icon && (
                      <ActionList.LeadingVisual>
                        {route.icon}
                      </ActionList.LeadingVisual>
                    )}
                    {route.name}
                  </ActionList.LinkItem>
                );
              }
            })}
          </ActionList>
        </Box>
        <Box>
          <Box
            sx={{
              display: ['block', 'none'],
              px: 2,
            }}
          >
            <SubscribeComponent />
          </Box>

          <Box sx={{ fontSize: 0, padding: '1rem' }}>
            <Text as='span' sx={{ fontWeight: 400, color: 'fg.subtle' }}>
              © 2023 Timbers SC
            </Text>
            <Box>
              {footerLinks.map((link, index) => {
                return (
                  <Link
                    href={link.href}
                    key={index}
                    sx={{
                      mr: 2,
                      fontWeight: 300,
                    }}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </MenuPopup>
  );
};
