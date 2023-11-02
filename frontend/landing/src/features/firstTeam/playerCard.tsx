import { useCallback, useEffect, useState } from 'react';

import { Box, Text, useTheme } from '@primer/react';
import { darken, lighten, rgba } from 'polished';

import { SaplingSvg } from './sapling';

interface Props {
  first: string;
  last: string;
  position: string;
  number: number;
  reserve: boolean;
  pic?: string | null;
}

const GenericStyles = {
  transition: 'all 0.25s ease',
};

const PlayerCard$Image = ({ first, last }: any) => {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    try {
      const srcLocation = require(`@public/images/roster/${first}_${last}.png`);
      setSrc(srcLocation);
    } catch (error) {
      setSrc(null);
    }
  }, [first, last]);

  if (!src) {
    return (
      <Box
        sx={{
          transform: 'translate3d(70%, 0, 0)',
        }}
      >
        <SaplingSvg />
      </Box>
    );
  }

  return (
    <Box
      as='img'
      src={src}
      alt={`${first} ${last}`}
      sx={{
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        transform: 'translate3d(25%, 5px, 0)',
      }}
    />
  );
};

export const FirstTeam$PlayerCard = (props: Props) => {
  const { first, last, position, number } = props;

  const { theme } = useTheme();

  const changePosition = useCallback((position: string) => {
    switch (position) {
      case 'FWD':
        return 'Forward';
      case 'GK':
        return 'Goalkeeper';
      case 'MID':
        return 'Midfielder';
      case 'DEF':
        return 'Defender';
      default:
        break;
    }
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        background: '#fff',
        height: 'auto',
        width: '100%',
        maxWidth: '445px',
        boxShadow: 'shadow.medium',
        aspectRatio: '1/1',

        ':hover': {
          backgroundColor: lighten(0.1, theme.colors.ansi.green),
          color: '#fff !important',
          svg: {
            fill: '#Fff',
          },
          '*': { color: '#fff !important' },
        },
        ...GenericStyles,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          svg: {
            opacity: 0.1,
          },
          ...GenericStyles,
        }}
      >
        {<PlayerCard$Image first={first} last={last} />}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          left: '32px',
          top: '15px',
          color: rgba(theme.colors.ansi.gray, 0.6),
          fontSize: '5em',
          ...GenericStyles,
        }}
      >
        {number}
      </Box>
      <Box
        sx={{
          color: darken(0.1, theme.colors.ansi.green),
          position: 'absolute',
          left: '32px',
          bottom: '45px',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          ...GenericStyles,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            ...GenericStyles,
          }}
        >
          <Text
            sx={{
              ...GenericStyles,
            }}
          >
            {first}
          </Text>
          <Text
            sx={{
              color: lighten(0.5, theme.colors.ansi.yellow),
              fontSize: '2em',
              fontWeight: 'bold',
              ...GenericStyles,
            }}
          >
            {last}
          </Text>
        </Box>
        <Box>
          <Text
            sx={{
              color: darken(0.1, theme.colors.ansi.green),
              ...GenericStyles,
            }}
          >
            {changePosition(position)}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
