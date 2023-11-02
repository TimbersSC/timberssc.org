import React from 'react';
import { useLocation } from 'react-router-dom';

import { IconButton, Box, useTheme, useFocusTrap } from '@primer/react';
import { ThreeBarsIcon, XIcon } from '@primer/octicons-react';
import { rgba } from 'polished';
import { CSSTransition } from 'react-transition-group';
import { useHotkeys, useHotkeysContext } from '@components/shortcuts';

import { createPortal } from '@core/components';
import { ButtonSX } from '../utils';

type Side = 'left' | 'right';
type OpenKeyBind = 'm+n' | 'm+u' | 'ctrl+/';

interface MenuPopupProps {
  children: any;
  header: any;
  context: string;
  button?: any;
  side?: Side;
  openKeyBind?: OpenKeyBind;
  showOpen?: boolean;
}

interface MenuModalProps {
  children: any;
  header: any;
  onClose: () => void;
  side?: Side;
}

const MenuPopupModal = React.forwardRef(function MenuPopupModal(
  props: MenuModalProps,
  ref,
): JSX.Element {
  const { children, header, side, onClose } = props;

  const { theme } = useTheme();

  /**
   * @TODO Figure out why this shifts the whole screen left for a left aligned menu
  // const nodeRef = React.useRef(null);
  // useFocusTrap({ containerRef: nodeRef });
   */

  return (
    <Box
      className='nav-menu'
      ref={ref as any}
      tabIndex={0}
      sx={{
        zIndex: 1000,
        position: 'absolute',
        inset: 0,
        visibility: 'visible',
        transition: 'all 0.25s ease',
        backdropFilter: 'blur(6px)',
        opacity: 0,
        outline: 0,
      }}
    >
      <Box
        onClick={onClose}
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'canvas.overlay',
          opacity: 0.4,
          transition: 'all 0.25s ease',
        }}
        className='nav-menu-overlay'
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          height: '100vh',
          maxWidth: '336px',
          width: '100%',
          transition: 'all 0.25s ease',
          padding: '0.5rem',
          opacity: 1,
        }}
        className={`nav-menu-content-${side}`}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: 'canvas.default',
            boxShadow: 'shadow.large',
            border: `1px solid ${rgba(theme.colors.border.subtle, 0.1)}`,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {header}
            </Box>
            <IconButton
              icon={XIcon}
              aria-labelledby='Actions'
              sx={{ position: 'relative' }} // , ...ButtonSX
              onClick={onClose}
              variant='invisible'
            />
          </Box>
          {children}
        </Box>
      </Box>
    </Box>
  );
});

export const MenuPopup = (props: MenuPopupProps): JSX.Element => {
  const {
    children,
    header,
    context,
    button,
    side = 'left',
    openKeyBind = 'm+n',
    showOpen = true,
  } = props;

  const [parent] = React.useState('*');
  const { enabledScopes, enableScope, disableScope } = useHotkeysContext();
  const location = useLocation();

  const [previousScopes, setPreviousScopes] = React.useState([]);
  const [isOpen, setOpen] = React.useState(false);

  React.useEffect(() => {
    disable();
    customSetOpen(false);
  }, [location]);

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
  }, [context, previousScopes]);
  /** @END_SCOPES */

  const customSetOpen = React.useCallback(
    (open: boolean) => {
      if (open) {
        document.body.style.overflowY = 'hidden';
        enable();
      } else {
        document.body.style.overflowY = 'visible';
        disable();
      }
      setOpen(open);
    },
    [isOpen],
  );

  /** @KEYBIND 'm+n' to open and close the navigation menu */
  /** @KEYBIND 'm+u' to open and close the user menu */
  useHotkeys(openKeyBind, () => customSetOpen(!isOpen), {
    preventDefault: true,
    scopes: [parent],
  });

  /** @KEYBIND 'esc' close dialog */
  useHotkeys(
    'esc',
    () => customSetOpen(false),
    {
      preventDefault: true,
      scopes: [context],
      enabled: isOpen,
    },
    [isOpen],
  );

  return (
    <>
      {showOpen &&
        (button ? (
          <div
            onClick={() => {
              customSetOpen(true);
            }}
          >
            {button}
          </div>
        ) : (
          <IconButton
            icon={ThreeBarsIcon}
            aria-labelledby='Actions'
            sx={{ position: 'relative', ...ButtonSX }}
            onClick={() => {
              customSetOpen(true);
            }}
          />
        ))}
      <CSSTransition
        in={isOpen}
        timeout={250}
        classNames='nav-menu'
        unmountOnExit
      >
        <>
          {createPortal(
            <MenuPopupModal
              onClose={() => customSetOpen(false)}
              header={header}
              side={side}
            >
              {children}
            </MenuPopupModal>,
          )}
        </>
      </CSSTransition>
    </>
  );
};
