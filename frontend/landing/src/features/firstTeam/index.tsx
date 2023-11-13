import { useContext, useEffect } from 'react';

import { Box, Text, useTheme } from '@primer/react';
import { darken, lighten } from 'polished';

import { BreadcrumbsDispatcherContext } from '@components/navigation/breadcrumbs';
import { setDocumentTitle } from '@utils';
// @ts-ignore
import bg from '@public/images/bg/bg.webp';

import { Players } from './rosterData';
import { FirstTeam$PlayerCard } from './playerCard';

export const FirstTeamPage = () => {
  const dispatch = useContext(BreadcrumbsDispatcherContext);

  const { theme } = useTheme();

  useEffect(() => {
    const _Titles = [
      {
        name: 'First Team',
        url: 'first-team',
      },
    ];

    dispatch(_Titles);
    setDocumentTitle(_Titles.map((title) => title.name).reverse());
  }, []);

  return (
    <Box>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.2,
          backgroundImage: `url(${bg})`,
        }}
      ></Box>
      <Box
        sx={{
          maxWidth: '1335px',
          color: 'gold',
          padding: ['3em 1em', '2em 0'],
          mx: 'auto',
        }}
      >
        <Text
          as='h1'
          sx={{
            fontSize: 8,
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            // borderBottomColor: theme.colors.gold[0],
          }}
        >
          First Team · Men
        </Text>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr 1fr'],
            gap: 3,
          }}
        >
          {Players.map((player: any) => (
            <FirstTeam$PlayerCard {...player} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
