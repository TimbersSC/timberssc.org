import React from 'react'

import { useMantineTheme, Footer, Box, Text } from '@mantine/core'
import { StaticImage } from 'gatsby-plugin-image'

import { SocialMediaComponents } from './socialMedia'
import styled from '@emotion/styled'

/**
 * Convert a shadow preset to inset.
 *
 * @note This is the ugliest method to incorporate `inset`...
 *
 * @param s
 * @returns
 */
function addInset(s: string): string {
  let n = s
    .split('),')
    .map((o) => `inset ${o}`)
    .join('),')
  return n
    .split('m,')
    .map((o) => `inset ${o}`)
    .join('m,')
    .replace('inset ', '')
}

export const FooterComponent = (props: any): JSX.Element => {
  const theme = useMantineTheme()

  return (
    <Footer
      sx={{
        boxShadow: addInset(theme.shadows.lg),
        padding: '32px',
        position: 'relative',
        boxSizing: 'content-box',
        backgroundImage: `url(/images/assets/bg.webp)`,
        backgroundRepeat: 'repeat',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5em',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '1em',
          }}
          w={300}
        >
          <Box
            sx={{
              transition: 'opacity 0.25s ease',
              ':hover': {
                opacity: 0.6,
              },
            }}
          >
            <a href="//rikispirits.com/" target="_blank">
              <StaticImage
                alt="RIKI"
                src="../images/sponsors/riki-site-logo.png"
                height={48}
              />
            </a>
          </Box>
          <Text
            component="span"
            sx={{
              lineHeight: '1.25rem',
              fontSize: '0.8em',
              borderLeft: '1px solid rgba(0,0,0,0.4)',
              paddingLeft: '0.5em',
            }}
          >
            The official sponsors of Timbers SC.
          </Text>
        </Box>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '0.5em',
          }}
        >
          <SocialMediaComponents />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: 0.6,
          fontSize: '0.8em',
        }}
      >
        <Box>©2023 Timbers SC</Box>
        <Box>League</Box>
      </Box>
    </Footer>
  )
}
