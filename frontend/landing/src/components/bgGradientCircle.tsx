import { Box, SxProp } from '@primer/react';

interface Props {
  sx?: SxProp;
}

export const BgGradientCircle = (props: Props): JSX.Element => {
  const { sx } = props;
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '100%',
        aspectRatio: 1 / 1,
        backdropFilter: 'blur(80px)',
        opacity: 0.5,
        ...sx,
      }}
    ></Box>
  );
};
