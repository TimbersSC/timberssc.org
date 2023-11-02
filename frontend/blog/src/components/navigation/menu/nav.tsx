import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { ActionList, Box, Text, Link } from '@primer/react';
import { HomeIcon } from '@primer/octicons-react';

import { routes } from '@core/router/routes';
import { SHORTCUTS } from '@core/data';

import { MenuPopup } from './menuPopup';
import { KBD } from '@shared/text/kbd';

const footerLinks = [
  {
    href: '//about.ferant.io',
    title: 'About',
  },
  {
    href: '//blog.ferant.io',
    title: 'Blog',
  },
  {
    href: '//policies.ferant.io/terms',
    title: 'Terms',
  },
  {
    href: '//policies.ferant.io/privacy',
    title: 'Privacy',
  },
];

export const NavLinks = () => {
  const hotKeys = React.useCallback((hotkey: string) => {
    const separator = '+';
    return hotkey.split(separator).map((hotkey: string, index: number) => {
      return (
        <>
          <KBD>{hotkey.toUpperCase()}</KBD>
          {/* {index !== hotkey.length && ` ${separator} `} */}
        </>
      );
    });
  }, []);

  return (
    <MenuPopup
      context={'navMenu'}
      openKeyBind={SHORTCUTS.navigation.navMenu.sequence as any}
      header={
        <RouterLink to='/' key='logo-link' style={{ lineHeight: 0 }}>
          <img
            src='//cdn.ferant.io/branding/logo-symbol.png'
            alt='Ferant logomark'
            height='32'
          />
        </RouterLink>
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
            <ActionList.LinkItem as={RouterLink} to={'/'}>
              <ActionList.LeadingVisual>
                <HomeIcon />
              </ActionList.LeadingVisual>
              Home
              {/* <ActionList.TrailingVisual
                sx={{
                  display: 'inline-flex',
                  flexShrink: 0,
                  gap: '0.5em',
                }}
              >
                {hotKeys(SHORTCUTS.navigation.dashboard.sequence)}
              </ActionList.TrailingVisual> */}
            </ActionList.LinkItem>
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
                    {/* {route.hotKey && (
                      <ActionList.TrailingVisual
                        sx={{
                          display: 'inline-flex',
                          flexShrink: 0,
                          gap: '0.5em',
                        }}
                      >
                        {hotKeys(route.hotKey)}
                      </ActionList.TrailingVisual>
                    )} */}
                  </ActionList.LinkItem>
                );
              }
            })}
          </ActionList>
        </Box>
        <Box sx={{ fontSize: '0.75em', padding: '1rem' }}>
          <Text as='span' sx={{ fontWeight: 300, color: 'fg.subtle' }}>
            © 2023 Ferant Tech, Corp.
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
    </MenuPopup>
  );
};
