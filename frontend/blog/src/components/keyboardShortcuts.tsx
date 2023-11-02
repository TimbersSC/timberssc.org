import React from 'react';

import { FormControl, Autocomplete, Text, themeGet, Box } from '@primer/react';
import { SearchIcon } from '@primer/octicons-react';
import styled from 'styled-components';

import { useHotkeys, useHotkeysContext } from '@components/shortcuts';

import { SHORTCUTS, ShortcutDetails } from '@core/data';
import { MenuPopup } from './navigation/menu/menuPopup';
import { capitalizeFirstLetter } from '@utils';
import { KBD } from '@shared/text/kbd';

export const KeyboardShortcutsHelper = (): JSX.Element => {
  const hotKeys = React.useCallback((hotkey: string) => {
    const separator = '+';
    return hotkey.split(separator).map((hotkey: string, index: number) => {
      return (
        <>
          <KBD>{hotkey.toUpperCase()}</KBD>
          {/* {index !== hotkey.length && ` ${separator} `} */}
        </>
      );
    });
  }, []);

  return (
    <MenuPopup
      context='keyboardShortcutsPanel'
      side='right'
      openKeyBind={SHORTCUTS.general.shortcuts.sequence as any}
      header={<>Keyboard shortcuts</>}
      showOpen={false}
    >
      {/* Search bar for shortcuts */}

      {/* Help section */}
      <Box
        sx={{
          display: 'flex',
          flex: 'initial',
          overflow: 'hidden',
          paddingBottom: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            overflow: 'hidden auto',
            scrollbarGutter: 'auto',
            padding: '0 1rem 1rem 1.25rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flex: 'initial',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            {Object.keys(SHORTCUTS).map((header: keyof typeof SHORTCUTS) => (
              <Box
                key={header}
                sx={{
                  width: '100%',
                  paddingBottom: '1rem',
                  fontSize: '0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem',
                  flex: '1 1 auto',
                }}
              >
                <Text as='span' sx={{ fontWeight: 500 }}>
                  {capitalizeFirstLetter(header)}
                </Text>
                {Object.values(SHORTCUTS[header]).map(
                  (obj: ShortcutDetails) => (
                    <Box
                      key={obj.description}
                      sx={{
                        display: 'inline-flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        gap: '1rem',
                      }}
                    >
                      <Text
                        as='span'
                        sx={{ color: 'fg.muted', fontWeight: 500 }}
                      >
                        {obj.description}
                      </Text>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          flexShrink: 0,
                          gap: '0.5em',
                        }}
                      >
                        {hotKeys(obj.sequence)}
                      </Box>
                    </Box>
                  ),
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </MenuPopup>
  );
};
