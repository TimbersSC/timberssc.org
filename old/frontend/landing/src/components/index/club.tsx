import React from 'react'

import { Box, Text, useMantineTheme } from '@mantine/core'

export const ClubComponent = (): JSX.Element => {
  const theme = useMantineTheme()

  return (
    <Box
      id="club"
      sx={{
        maxWidth: '1335px',
        padding: '5em 0',
        margin: '0 auto',
      }}
    >
      <Text
        sx={{
          fontWeight: 'bolder',
          fontSize: '5em',
          lineHeight: '1em',
          width: '55%',
          color: theme.colors.gray[9],
          marginBottom: '1rem',
        }}
      >
        Bringing true soccer to Denver
      </Text>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          width: '75%',
          fontSize: '1.5em',
        }}
      >
        <Text component="span" sx={{}}>
          Timbers SC, a competitive, community-based soccer club in the Denver,
          Colorado area, was founded by passionate players who possess a deep
          love for the game. The club is focused on providing a
          professional-like atmosphere for committed players aspiring to perform
          at the highest level within the amateur soccer world, all while
          nurturing a strong sense of unity within the team, both on and off the
          field.
        </Text>
        <Text component="span" sx={{}}>
          We believe that soccer should be accessible to all. While we
          acknowledge that maintaining a high-quality program entails expenses,
          we have forged partnerships with numerous community members to help
          mitigate costs for our players.
        </Text>
        <Text component="span" sx={{}}>
          Furthermore, we are committed to giving back to our community and
          extending soccer-related opportunities to individuals within it. This
          season, we plan to engage in the following initiatives:
          <ul>
            <li>Hosting a free youth soccer clinic</li>
            <li>
              Organizing a season-long fundraiser for a local non-profit/charity
            </li>
            <li>
              Conducting open fields for community members to enjoy drop-in
              soccer sessions
            </li>
          </ul>
        </Text>
        <Text component="span" sx={{}}>
          We are excited for what our future holds. We firmly believe that
          through collaborative efforts, we can attain our objectives and
          establish an exceptional program.
        </Text>
        <Text component="span" sx={{}}>
          For additional information about Timbers SC, kindly contact us at{' '}
          <a href="mailto:clubhouse@timberssc.org">clubhouse@timberssc.org</a>.
        </Text>
      </Box>
    </Box>
  )
}
