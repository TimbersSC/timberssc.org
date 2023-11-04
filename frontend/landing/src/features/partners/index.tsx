import { useContext, useEffect } from 'react';

import { Box, Text } from '@primer/react';

import { BreadcrumbsDispatcherContext } from '@components/navigation/breadcrumbs';
import { setDocumentTitle } from '@utils';

enum PartnerLevels {
  Platinum,
  Gold,
  Silver,
}

const LevelSizes: {
  [key in PartnerLevels]: { maxWidth: string; maxHeight: string };
} = {
  [PartnerLevels.Platinum]: {
    maxHeight: '512px',
    maxWidth: '512px',
  },
  [PartnerLevels.Gold]: {
    maxHeight: '256px',
    maxWidth: '256px',
  },
  [PartnerLevels.Silver]: {
    maxHeight: '128px',
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

export const PartnersPage = () => {
  const dispatch = useContext(BreadcrumbsDispatcherContext);

  useEffect(() => {
    const _Titles = [
      {
        name: 'Our Partners',
        url: 'partners',
      },
    ];

    dispatch(_Titles);
    setDocumentTitle(_Titles.map((title) => title.name).reverse());
  }, []);

  return (
    <Box
      sx={{
        maxWidth: '1335px',
        padding: ['3em 1em', '2em 0'],
        mx: 'auto',
        mb: 4,
      }}
    >
      <Text
        as='h1'
        sx={{
          textAlign: 'center',
          fontSize: 8,
          // borderBottomColor: theme.colors.gold[0],
        }}
      >
        Official partners of<br></br>Timbers SC
      </Text>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
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
              }}
            >
              {value.map((val) => {
                return (
                  <Box
                    as='img'
                    src={require('@public/images/partners/' + val.logo)}
                    sx={{
                      maxHeight: (LevelSizes as any)[index].maxHeight,
                      maxWidth: (LevelSizes as any)[index].maxWidth,
                    }}
                  ></Box>
                );
              })}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
