import React from 'react'

import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

import { rgba } from 'polished'
import styled from '@emotion/styled'

import { useDisclosure } from '@mantine/hooks'
import {
  useMantineTheme,
  Drawer,
  Burger,
  Header,
  Image,
  NavLink,
  Box,
  Overlay,
} from '@mantine/core'

import { BannerComponent } from './banner'
import { BreadcrumbsComponent } from './breadcrumbs'

const StyledLink = styled(Link)`
  text-decoration: none;
`

const Links = [
  // {
  //   title: 'Shop',
  //   href: '',
  // },
  {
    title: 'Club',
    href: '#club',
  },
  // {
  //   title: 'Schedule',
  //   href: '#club',
  // },
  {
    title: 'Roster',
    href: '#club',
  },
  // {
  //   title: 'Press',
  //   href: '',
  // },
  // {
  //   title: 'Community',
  //   href: '',
  // },
]

export const NavigationComponent = (props: any): JSX.Element => {
  const [opened, { open, close }] = useDisclosure(false)
  const theme = useMantineTheme()

  const anchors = React.useMemo(() => {
    return Links.map((item, index) => (
      <NavLink
        onClick={() => {}}
        label={<StyledLink to={item.href}>{item.title}</StyledLink>}
        key={index}
        sx={{
          borderRadius: '0.125em',
          opacity: 0.7,
          transition: 'all 0.125s ease',
          ':hover': {
            background: rgba(theme.colors.evergreen[0], 0.12),
            textDecoration: 'none',
            opacity: 1,
          },
          '*': {
            color: theme.colors.gold[0],
          },
        }}
      ></NavLink>
    ))
  }, [Links])

  return (
    <Box sx={{ zIndex: 100, position: 'relative', top: 0 }}>
      {/* <BannerComponent /> */}
      <Header
        height={60}
        // p="xs"
        sx={{
          position: 'sticky',
          top: 0,
          boxShadow: theme.shadows.lg,
          backgroundColor: theme.black,
          color: theme.white,
          borderBottom: 0,
          paddingLeft: '32px !important',
          paddingRight: '32px !important',
          display: 'flex',
          alignItems: 'center',
          gap: '1em',
        }}
      >
        {/* <Drawer.Root opened={opened} onClose={close}>
          <Drawer.Overlay
            sx={{
              opacity: "0.3 !important",
              // blur: 4,
              backdropFilter:
                "blur(4px) saturate(190%) contrast(70%) brightness(80%)",
            }}
          />
          <Drawer.Content
            sx={{
              background: "transparent",
              padding: "0.5em",
              boxShadow: "none",
            }}
          >
            <Box
              sx={{
                background: rgba(theme.colors.evergreen[0], 0.5),
                border: `1px solid ${rgba(theme.colors.gold[0], 0.44)}`,
                backdropFilter:
                  "blur(10px) saturate(190%) contrast(70%) brightness(80%)",
                boxSizing: "border-box",
                height: "100%",
                borderRadius: "0.5em",
                boxShadow: theme.shadows.xl,
              }}
            >
              <Drawer.Header
                sx={{
                  alignItems: "start",
                  backgroundColor: "transparent",
                }}
              >
                <Drawer.Title>
                  <Box
                    sx={{
                      "*": {
                        transition: "none !important",
                      },
                    }}
                  >
                    <StaticImage
                      src="../../images/logo/timbers_sc.logo.black.no_padding.png"
                      alt="Logo"
                      height={68}
                    />
                  </Box>
                </Drawer.Title>
                <Drawer.CloseButton />
              </Drawer.Header>
              <Drawer.Body>{anchors}</Drawer.Body>
            </Box>
          </Drawer.Content>
        </Drawer.Root> */}

        {/* <Burger
          opened={false}
          onClick={open}
          aria-label={label}
          color={theme.colors.gold[0]}
        /> */}

        <Box
          sx={{
            backgroundColor: theme.black,
            boxShadow: theme.shadows.lg,
            padding: '0 1em 1em',
            display: 'inline-block',
            borderRadius: ' 0 0 64px 64px',
            transform: 'translateY(40%)',
            '*': {
              transition: 'none !important',
            },
          }}
        >
          <StaticImage
            src="../../images/logo/timbers_sc.logo.black.no_padding.png"
            alt="Logo"
            height={124}
          />
        </Box>

        <Box>
          <BreadcrumbsComponent />
        </Box>

        <Box
          sx={{
            color: theme.colors.dark[6],
            fontSize: '1.25em',
          }}
        >
          |
        </Box>

        <Box
          sx={{
            display: 'inline-flex',
            height: '100%',
          }}
        >
          {anchors}
        </Box>
      </Header>
    </Box>
  )
}
