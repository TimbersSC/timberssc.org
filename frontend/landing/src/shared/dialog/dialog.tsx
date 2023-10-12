import React from 'react';

import { IconButton, Box, useTheme, useFocusTrap } from '@primer/react';
import { XIcon } from '@primer/octicons-react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { useHotkeys, useHotkeysContext } from '@components/shortcuts';
import { CSSTransition } from 'react-transition-group';

import { createPortal } from '@core/components';

/* Allowed Dialog types */
export type DialogType = 'todos' | 'duedate';

type DialogContextType = {
  [type in DialogType]: {
    get: boolean;
    set: (open: boolean) => void;
  };
};

interface DialogContextProps extends DialogContextType {
  current: {
    get: string[];
    set: (current: string | string[]) => void;
  };
}

const DialogContext = React.createContext<DialogContextProps>(null);

/**
 * Setup Dialog context without bloating the `layout.tsx` component.
 *
 * @TODO this needs to be optimized
 * @author Michael Podsiadly <mpodsiadly@ferant.io>
 */
export const DialogProvider = (props: any) => {
  const { children } = props;

  const [current, setCurrent] = React.useState(undefined);
  const [todos, setTodos] = React.useState(false);
  const [duedate, setDuedate] = React.useState(false);

  const dialogContextValue: DialogContextProps = {
    current: {
      get: current,
      set: setCurrent,
    },
    todos: {
      get: todos,
      set: setTodos,
    },
    duedate: {
      get: duedate,
      set: setDuedate,
    },
  };

  return (
    <DialogContext.Provider value={dialogContextValue}>
      {children}
    </DialogContext.Provider>
  );
};

interface DialogProps {
  children: JSX.Element;
  button: JSX.Element;
  type: DialogType;
  parent?: string;
  childrenScopes?: DialogType[] | DialogType;
  overlay?: boolean;
  header?: JSX.Element;
  footer?: JSX.Element;
  openKeyBind?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
interface DialogModalProps {
  children: JSX.Element;
  overlay?: boolean;
  header?: JSX.Element;
  footer?: JSX.Element;
  onClose: () => void;
}

export const DialogModal = React.forwardRef(function DialogModal(
  props: DialogModalProps,
  ref: React.MutableRefObject<HTMLElement>,
): JSX.Element {
  const { children, header, overlay, footer, onClose } = props;

  const { theme } = useTheme();

  useFocusTrap({ containerRef: ref as React.RefObject<HTMLDivElement> });

  return (
    <Box
      className='dialog-wrapper'
      sx={{
        zIndex: 1000,
        position: 'absolute',
        inset: 0,
        // backdropFilter: overlay ? 'blur(6px)' : 'none',
        backdropFilter: 'blur(2px)',
        outline: 0,
      }}
    >
      <Box
        className='dialog-overlay'
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '150vw',
          height: '100vh',
          // backgroundColor: overlay ? 'canvas.overlay' : 'transparent',
          backgroundColor: 'canvas.default',
          opacity: 0.2,
          visibility: 'visible',
        }}
      ></Box>
      <Box
        className='dialog-content'
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          // bg: `${rgba(theme.colors.canvas.default, 0.8)}`,
          // backdropFilter: 'blur(10px) saturate(190%) contrast(70%) brightness(80%)',
          backgroundColor: 'canvas.default',
          boxShadow: theme.shadows.shadow.large,
          opacity: 1,
          visibility: 'visible',
          padding: '1em',
          m: '1em',
          border: `1px solid ${rgba(theme.colors.border.subtle, 0.1)}`,
          borderRadius: 2,
          p: 0,
        }}
      >
        <Wrapper>
          <Box
            sx={{
              display: 'inline-flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              px: 3,
              pt: 2,
              pb: 1,
              // borderBottom: `1px solid ${rgba(
              //   theme.colors.border.subtle,
              //   0.1,
              // )}`,
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
              sx={{ position: 'relative' }}
              onClick={onClose}
              variant='invisible'
            />
          </Box>
          <Box sx={{ px: 3, pb: 2 }}>{children}</Box>
        </Wrapper>
        {footer && (
          <Box
            sx={{
              borderTop: `1px solid ${rgba(theme.colors.border.subtle, 0.1)}`,
              py: 2,
              px: 3,
            }}
          >
            {footer}
          </Box>
        )}
      </Box>
    </Box>
  );
});

export const Dialog = (props: DialogProps) => {
  const {
    children,
    button,
    type,
    parent = '*',
    childrenScopes,
    overlay = true,
    header,
    footer,
    openKeyBind,
  } = props;

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
    [].concat(type, childrenScopes).forEach((s) => enableScope(s));
  }, [childrenScopes, type, previousScopes]);

  const disable = React.useCallback(() => {
    [].concat(type, childrenScopes).forEach((s) => disableScope(s));
    [].concat(parent, previousScopes).forEach((s) => enableScope(s));
  }, [childrenScopes, type, previousScopes]);
  /** @END_SCOPES */

  const customSetOpen = React.useCallback(
    (open: boolean) => {
      // if (open && isOpen) return;
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

  /**
   * We set this scope to be the parent so that it is only accessible when the parent is "focused". By default, parent is '*'.
   *
   * @KEYBIND 'c' to open the create task dialog
   * @KEYBIND 'ctrl+d' to open the select due date dialog
   */
  useHotkeys(
    [openKeyBind],
    (e, handler) => {
      e.stopImmediatePropagation();
      customSetOpen(!isOpen);
    },
    {
      preventDefault: true,
      scopes: [parent],
      // keyup: true,
      // keydown: false,
    },
  );

  /**
   * With the hotkeys, we have to separate the `open` and `close` keys.
   *
   * @KEYBIND 'esc' close dialog
   */
  useHotkeys(
    ['escape'],
    (e) => {
      e.stopPropagation();
      customSetOpen(false);
    },
    {
      preventDefault: true,
      scopes: [type],
      enabled: isOpen,
      enableOnContentEditable: true,
    },
    [isOpen],
  );

  return (
    <>
      <Box
        className='box'
        onClick={() => {
          customSetOpen(true);
        }}
      >
        {button}
      </Box>
      <CSSTransition
        in={isOpen}
        timeout={250}
        classNames='dialog'
        unmountOnExit
      >
        <>
          {createPortal(
            <DialogModal
              onClose={() => customSetOpen(false)}
              header={header}
              footer={footer}
              overlay={overlay}
            >
              {children}
            </DialogModal>,
          )}
        </>
      </CSSTransition>
    </>
  );
};
