import { Box, SxProp } from '@primer/react';

interface Props extends SxProp {}

export const BgGradientCircle = (props: Props): JSX.Element => {
  const { sx } = props;
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '100%',
        aspectRatio: '1 / 1',
        opacity: 0.25,
        filter: 'blur(80px)',
        zIndex: -1,
        ...sx,
      }}
    ></Box>
  );
};
