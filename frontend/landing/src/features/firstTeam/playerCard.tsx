import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

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
  const nodeRef = useRef(null);

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

  const glowRef = useRef();

  const rotateToMouse = (e: any) => {
    const bounds = nodeRef.current.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    };

    if (glowRef.current) {
      (glowRef.current as HTMLElement).style.backgroundImage = `
        radial-gradient(
          circle at
          ${center.x * 2 + bounds.width / 2}px
          ${center.y * 2 + bounds.height / 2}px,
          #ffffff55,
          #0000000f
        )
      `;
    }
  };
  const removeListener = () => {
    nodeRef.current.style.transform = '';
    nodeRef.current.style.background = '';
  };

  return (
    <Box
      ref={nodeRef}
      onMouseLeave={removeListener}
      onMouseMove={rotateToMouse}
      sx={{
        position: 'relative',
        background: '#fff',
        height: 'auto',
        width: '100%',
        maxWidth: '445px',
        boxShadow: 'shadow.medium',
        aspectRatio: '1/1',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'border.muted',
        ':hover': {
          backgroundColor: 'green',
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
        ref={glowRef}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          backgroundImage:
            'radial-gradient(circle at 50% -20%, #ffffff22, #0000000f)',
        }}
      />
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
          color: 'green',
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
              color: 'gold',
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
              color: 'green',
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
