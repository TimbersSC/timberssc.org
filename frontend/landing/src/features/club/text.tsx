import { Box, Button, Text } from '@primer/react';
import { MailIcon } from '@primer/octicons-react';

export const ClubText = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: ['flex-start', 'center'],
        maxWidth: ['calc(100vw - 2rem)', 'auto'],
        height: '100%',
        width: 'medium',
      }}
    >
      <Text
        as='h1'
        sx={{
          fontSize: 8,
          mb: 0,
          // borderBottomColor: theme.colors.gold[0],
        }}
      >
        Our
      </Text>
      <Text
        as='h1'
        sx={{
          fontSize: ['8', '7rem'],
          mt: ['-2rem', '-3rem'],
          fontWeight: 800,
          // borderBottomColor: theme.colors.gold[0],
          color: 'gold',
          mb: 0,
        }}
      >
        Club
      </Text>
      <Text
        as='span'
        sx={{
          fontSize: 3,
          lineHeight: '1.5em',
          mb: 2,
        }}
      >
        A Colorado non-profit soccer club for competitive play, community
        involvement, youth development, and charitable giving. Named after our
        founder's beloved dog, Timbers Soccer Club, based in the Denver,
        Colorado area, was founded by passionate players who have a deep love
        for the game.
      </Text>
      <Text as='span' sx={{ fontSize: 3, lineHeight: '1.5em', mb: 3 }}>
        Our mission is to provide a platform for competitive players who share a
        deep passion for soccer and use soccer as a vehicle for community
        involvement, youth development, and charitable giving.
      </Text>
      <Text as='span' sx={{ fontSize: 3, lineHeight: '1.5em', mb: 3 }}>
        Our vision at Timbers SC is to create a vibrant soccer club that stands
        out within the Colorado community.
      </Text>
      <Text as='span' sx={{ fontSize: 3, lineHeight: '1.5em', mb: 3 }}>
        Our core beliefs are: respect for all, embrace unique perspectives, and
        foster a familial atmosphere within our community.
      </Text>
      {/* <Button
        as='a'
        href='mailto:clubhouse@timberssc.org'
        sx={{ width: 0, bg: 'green' }}
        size='large'
        variant='primary'
        trailingVisual={MailIcon}
      >
        Reach out to us
      </Button> */}
    </Box>
  );
};
