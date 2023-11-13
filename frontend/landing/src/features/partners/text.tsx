import { Box, Button, Text } from '@primer/react';
import { MailIcon } from '@primer/octicons-react';

export const PartnersText = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: ['flex-start', 'center'],
        maxWidth: ['calc(100vw - 2rem)', 'auto'],
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
        Our proud
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
        Partners
      </Text>
      <Text
        as='span'
        sx={{
          fontSize: 3,
          lineHeight: '1.5em',
          mb: 2,
        }}
      >
        Thank you to our partners for helping us bring all of Timbers SC
        together. We are always looking for more and new partners. Your
        contributions are seen by many spectators and your services are sought
        after by many.
      </Text>
      <Text as='span' sx={{ fontSize: 3, lineHeight: '1.5em', mb: 3 }}>
        Lets start a conversation and see how we can become partners.
      </Text>
      <Button
        as='a'
        href='mailto:clubhouse@timberssc.org'
        sx={{ width: 0, bg: 'green' }}
        size='large'
        variant='primary'
        trailingVisual={MailIcon}
      >
        Reach out to us
      </Button>
    </Box>
  );
};
