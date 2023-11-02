import { useContext, useEffect } from 'react';

import { Box, Text } from '@primer/react';

import { BreadcrumbsDispatcherContext } from '@components/navigation/breadcrumbs';
import { setDocumentTitle } from '@utils';

const Partners = {
  Platinum: [
    {
      name: 'Riki',
      logo: 'RIKI_LOGO.png',
      url: '//rikispirits.com/',
    },
  ],
  Gold: [
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
  Silver: [
    {
      name: 'Riki',
      logo: 'RIKI_LOGO.png',
      url: '',
    },
    {
      name: 'Ferant',
      logo: 'Ferant_logo.png',
      url: '//ferant.io',
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
        }}
      >
        {Object.values(Partners).map((value, index) => {
          return (
            <Box
              sx={{
                // display: 'flex',
                // flexDirection: 'row',
                // justifyContent: 'center',
                // alignItems: 'center',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, 1fr)',
                gridTemplateRows: 'repeat(1, 500px)',
                gap: '15px',
              }}
            >
              {value.map((val) => {
                return (
                  <Box
                    as='img'
                    src={require('@public/images/partners/' + val.logo)}
                    sx={{
                      height: `100%`,
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
