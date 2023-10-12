import { Link as RouterLink } from 'react-router-dom';

import { ActionList, Box, Text, Link } from '@primer/react';
import {
  LawIcon,
  ToolsIcon,
  ShieldCheckIcon,
  MortarBoardIcon,
  PeopleIcon,
  BookIcon,
  OrganizationIcon,
  AccessibilityInsetIcon,
  BrowserIcon,
} from '@primer/octicons-react';

import { routes } from '@core/router/routes';
import { SHORTCUTS } from '@core/data';

import { MenuPopup } from './menuPopup';

const footerLinks = [
  {
    href: '//about.ferant.io',
    title: 'About',
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

const navLinks = [
  {
    title: 'Engineering',
    icon: <ToolsIcon />,
  },
  {
    title: 'Product',
    icon: <BrowserIcon />,
  },
  {
    title: 'Professional Development',
    icon: <BookIcon />,
  },
  {
    title: 'Education',
    icon: <MortarBoardIcon />,
  },
  {
    title: 'Security',
    icon: <ShieldCheckIcon />,
  },
  {
    title: 'Open Source',
    icon: <AccessibilityInsetIcon />,
  },
  {
    title: 'Company',
    icon: <OrganizationIcon />,
  },
  {
    title: 'Community',
    icon: <PeopleIcon />,
  },
  {
    title: 'Policy',
    icon: <LawIcon />,
  },
];

export const NavLinks = () => {
  return (
    <MenuPopup
      context={'navMenu'}
      openKeyBind={SHORTCUTS.navigation.navMenu.sequence as any}
      header={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <RouterLink
            to='//ferant.io'
            key='logo-link'
            style={{ lineHeight: 0 }}
          >
            <img
              src='//cdn.ferant.io/branding/logo-symbol.png'
              alt='Ferant logomark'
              height='32'
            />
          </RouterLink>
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
            as={RouterLink}
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
            {/* @NOTE: Main nav */}
            {navLinks.map((route: any, index: number) => (
              <ActionList.LinkItem
                key={`${route}${index}`}
                as={RouterLink}
                to={route.title ?? '/'}
              >
                {route.icon && (
                  <ActionList.LeadingVisual>
                    {route.icon}
                  </ActionList.LeadingVisual>
                )}
                {route.title}
              </ActionList.LinkItem>
            ))}

            {/* @NOTE: Extra */}
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
