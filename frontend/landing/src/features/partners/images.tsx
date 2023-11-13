import { useContext, useEffect } from 'react';

import { Box, Text } from '@primer/react';

enum PartnerLevels {
  Platinum,
  Gold,
  Silver,
}

const LevelSizes: {
  [key in PartnerLevels]: { maxWidth: string; maxHeight: string };
} = {
  [PartnerLevels.Platinum]: {
    maxHeight: '40%',
    maxWidth: '512px',
  },
  [PartnerLevels.Gold]: {
    maxHeight: '25%',
    maxWidth: '256px',
  },
  [PartnerLevels.Silver]: {
    maxHeight: '15%',
    maxWidth: '128px',
  },
};

const Partners: { [key in PartnerLevels]: any[] } = {
  [PartnerLevels.Platinum]: [
    {
      name: 'Riki',
      logo: 'RIKI_LOGO.png',
      url: '//rikispirits.com/',
    },
  ],
  [PartnerLevels.Gold]: [
    {
      name: 'Park Burger',
      logo: 'Ferant_logo.png',
      url: '//parkbuger.com',
    },
    {
      name: 'Birdcall',
      logo: 'birdcall.png',
      url: '//eatbirdcall.com/',
    },
  ],
  [PartnerLevels.Silver]: [
    {
      name: 'Fast Signs of Lakewood',
      logo: 'RIKI_LOGO.png',
      url: '',
    },
    {
      name: 'Ferant',
      logo: 'Ferant_logo.png',
      url: '//ferant.io',
    },
    {
      name: 'SetGK',
      logo: 'RIKI_LOGO.png',
      url: '',
    },
  ],
};

export const PartnersImages = () => {
  return (
    <>
      <Box
        sx={{
          display: ['none', 'flex'],
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          maxHeight: 'calc(100vh - 60px)',
          overflow: 'hidden',
        }}
      >
        {Object.values(Partners).map((value, index) => {
          return (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
                maxHeight: (LevelSizes as any)[index].maxHeight,
              }}
            >
              {value.map((val) => {
                return (
                  <Box
                    as='img'
                    src={require('@public/images/partners/' + val.logo)}
                    sx={{
                      maxHeight: '100%',
                      maxWidth: (LevelSizes as any)[index].maxWidth,
                    }}
                  ></Box>
                );
              })}
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          display: ['flex', 'none'],
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 4,
          maxHeight: '64px',
        }}
      >
        {Object.values(Partners).map((value, index) => {
          return (
            <>
              {value.map((val) => {
                return (
                  <Box
                    as='img'
                    src={require('@public/images/partners/' + val.logo)}
                    sx={{ height: '64px' }}
                  ></Box>
                );
              })}
            </>
          );
        })}
      </Box>
    </>
  );
};
