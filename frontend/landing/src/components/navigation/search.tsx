import React from 'react';

import { FormControl, Autocomplete, Text, themeGet } from '@primer/react';
import { SearchIcon } from '@primer/octicons-react';
import styled from 'styled-components';
import { useHotkeys, useHotkeysContext } from '@components/shortcuts';

import { KBD } from '@shared/text/kbd';

const PlaceholderSpan = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 36px;
  color: ${themeGet('colors.fg.subtle')};
  height: 32px;
  line-height: 1.5rem;
  z-index: -1;
`;

export const SearchComponent = () => {
  const ref = React.useRef(null);

  const [parent] = React.useState('*');
  const [context] = React.useState('searchBar');
  const { enabledScopes, enableScope, disableScope } = useHotkeysContext();

  const [previousScopes, setPreviousScopes] = React.useState([]);
  const [isOpen, setOpen] = React.useState(false);

  /**
   * Here we want to enable and disable scopes for hot keys if we have nested dialogs. To enable, we want to keep track of all previous scopes so that we can enable them when this dialog is escaped.
   *
   * @START_SCOPES
   */
  const enable = React.useCallback(() => {
    setPreviousScopes(enabledScopes);
    disableScope(parent);
    [].concat(context).forEach((s) => enableScope(s));
  }, [context, previousScopes]);

  const disable = React.useCallback(() => {
    [].concat(context).forEach((s) => disableScope(s));
    [].concat(parent, previousScopes).forEach((s) => enableScope(s));
    enableScope(parent);
  }, [previousScopes]);
  /** @END_SCOPES */

  const customSetOpen = React.useCallback(
    (open: boolean) => {
      if (open) {
        (ref as any).current.focus();
        (ref as any).current.value.slice(0, -1);
        enable();
      } else {
        // document.body.style.overflowY = 'visible';
        (ref as any).current.blur();
        disable();
      }
      setOpen(open);
    },
    [isOpen],
  );

  /** @KEYBIND 'm+n' to open and close the navigation menu */
  /** @KEYBIND 'm+u' to open and close the user menu */
  useHotkeys('/', () => customSetOpen(!isOpen), {
    preventDefault: true,
    scopes: [parent],
  });

  /** @KEYBIND 'esc' close dialog */
  useHotkeys(
    'esc',
    () => {
      customSetOpen(false);
    },
    {
      preventDefault: true,
      scopes: [context],
      enabled: isOpen,
      enableOnFormTags: true,
      enableOnContentEditable: true,
    },
    [isOpen],
  );

  return (
    <FormControl sx={{ position: 'relative' }}>
      <FormControl.Label
        id='search-autocomplete-label'
        visuallyHidden
        sx={{ bg: 'canvas.inset' }}
      ></FormControl.Label>
      <Autocomplete>
        <Autocomplete.Input
          leadingVisual={SearchIcon}
          aria-label='Search'
          name='Search'
          sx={{
            bg: 'transparent',
            width: isOpen ? '360px' : '256px',
            transition: 'all 0.125s ease',
          }}
          onBlur={() => {
            if (!ref.current.value) {
              customSetOpen(false);
            }
          }}
          // @TODO: prevent from double calling once this function if on keyPress
          onFocus={() => !isOpen && customSetOpen(true)}
          ref={ref}
        />
        {!isOpen && (
          <PlaceholderSpan>
            Type{' '}
            <KBD style={{ padding: '2px', lineHeight: 'calc(16/12)' }}>/</KBD>{' '}
            to search
          </PlaceholderSpan>
        )}
      </Autocomplete>
    </FormControl>
  );
};
