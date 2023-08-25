import React from 'react'

import { useMantineTheme, Footer, Box } from '@mantine/core'

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
      height={{ base: 60 }}
      sx={{
        boxShadow: addInset(theme.shadows.lg),
        padding: '32px',
        position: 'relative',
        boxSizing: 'content-box',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>Riki sponsor</Box>
        <Box>Social media</Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>Copyright</Box>
        <Box>League</Box>
      </Box>
    </Footer>
  )
}
