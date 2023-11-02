import {
  HotkeyCallback,
  Keys,
  Options,
  OptionsOrDependencyArray,
  RefType,
} from './types';
import {
  DependencyList,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { mapKey, parseHotkey, parseKeysHookInput } from './parseHotkeys';
import {
  isHotkeyEnabled,
  isHotkeyEnabledOnTag,
  isHotkeyMatchingKeyboardEvent,
  isKeyboardEventTriggeredByInput,
  isScopeActive,
  maybePreventDefault,
} from './validators';
import { useHotkeysContext } from './HotkeysProvider';
import { useBoundHotkeysProxy } from './BoundHotkeysProxyProvider';
import useDeepEqualMemo from './useDeepEqualMemo';
import {
  isReadonlyArray,
  pushToCurrentlyPressedKeys,
  removeFromCurrentlyPressedKeys,
} from './isHotkeyPressed';

const stopPropagation = (e: KeyboardEvent): void => {
  e.stopPropagation();
  e.preventDefault();
  e.stopImmediatePropagation();
};

const useSafeLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function useHotkeys<T extends HTMLElement>(
  keys: Keys,
  callback: HotkeyCallback,
  options?: OptionsOrDependencyArray,
  dependencies?: OptionsOrDependencyArray,
) {
  const ref = useRef<RefType<T>>(null);
  const hasTriggeredRef = useRef(false);

  const _options: Options | undefined = !(options instanceof Array)
    ? (options as Options)
    : !(dependencies instanceof Array)
    ? (dependencies as Options)
    : undefined;
  const _keys: string = isReadonlyArray(keys)
    ? keys.join(_options?.splitKey)
    : keys;
  const _deps: DependencyList | undefined =
    options instanceof Array
      ? options
      : dependencies instanceof Array
      ? dependencies
      : undefined;

  const memoisedCB = useCallback(callback, _deps ?? []);
  const cbRef = useRef<HotkeyCallback>(memoisedCB);

  if (_deps) {
    cbRef.current = memoisedCB;
  } else {
    cbRef.current = callback;
  }

  const memoisedOptions = useDeepEqualMemo(_options);

  const { enabledScopes } = useHotkeysContext();
  const proxy = useBoundHotkeysProxy();

  useSafeLayoutEffect(() => {
    if (
      memoisedOptions?.enabled === false ||
      !isScopeActive(enabledScopes, memoisedOptions?.scopes)
    ) {
      return;
    }

    let timer: NodeJS.Timeout | null = null;
    const possibleMatches = new Map();

    const listener = (e: KeyboardEvent, isKeyUp = false) => {
      if (
        isKeyboardEventTriggeredByInput(e) &&
        !isHotkeyEnabledOnTag(e, memoisedOptions?.enableOnFormTags)
      ) {
        return;
      }

      if (memoisedOptions?.ignoreEventWhen?.(e)) {
        return;
      }

      // TODO: SINCE THE EVENT IS NOW ATTACHED TO THE REF, THE ACTIVE ELEMENT CAN NEVER BE INSIDE THE REF. THE HOTKEY ONLY TRIGGERS IF THE
      // REF IS THE ACTIVE ELEMENT. THIS IS A PROBLEM SINCE FOCUSED SUB COMPONENTS WON'T TRIGGER THE HOTKEY.
      if (
        ref.current !== null &&
        document.activeElement !== ref.current &&
        !ref.current.contains(document.activeElement)
      ) {
        stopPropagation(e);

        return;
      }

      if (
        (e.target as HTMLElement)?.isContentEditable &&
        !memoisedOptions?.enableOnContentEditable
      ) {
        return;
      }

      parseKeysHookInput(_keys, memoisedOptions?.splitKey).forEach((key) => {
        const hotkey = parseHotkey(key, memoisedOptions?.combinationKey);

        const sequence = hotkey.keys;
        const prev = possibleMatches.get(sequence.join());
        const remainingExpectedPresses = prev ? prev : sequence;
        hotkey.expected = remainingExpectedPresses[0];

        if (
          isHotkeyMatchingKeyboardEvent(
            e,
            hotkey,
            memoisedOptions?.ignoreModifiers,
          ) ||
          hotkey.keys?.includes('*')
        ) {
          if (remainingExpectedPresses.length > 1) {
            possibleMatches.set(
              sequence.join(),
              remainingExpectedPresses.slice(1),
            );
          } else {
            possibleMatches.delete(sequence.join());

            if (isKeyUp && hasTriggeredRef.current) {
              return;
            }

            maybePreventDefault(e, hotkey, memoisedOptions?.preventDefault);

            if (!isHotkeyEnabled(e, hotkey, memoisedOptions?.enabled)) {
              stopPropagation(e);

              return;
            }

            // Execute the user callback for that hotkey
            cbRef.current(e, hotkey);

            if (!isKeyUp) {
              hasTriggeredRef.current = true;
            }
          }
        } else {
          possibleMatches.set(
            sequence.join(),
            remainingExpectedPresses.slice(1),
          );
        }
      });

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        possibleMatches.clear();
      }, 1000);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === undefined) {
        // Synthetic event (e.g., Chrome autofill).  Ignore.
        return;
      }

      pushToCurrentlyPressedKeys(mapKey(event.code));

      if (
        (memoisedOptions?.keydown === undefined &&
          memoisedOptions?.keyup !== true) ||
        memoisedOptions?.keydown
      ) {
        listener(event);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === undefined) {
        // Synthetic event (e.g., Chrome autofill).  Ignore.
        return;
      }

      removeFromCurrentlyPressedKeys(mapKey(event.code));

      hasTriggeredRef.current = false;

      if (memoisedOptions?.keyup) {
        listener(event, true);
      }
    };

    const domNode = ref.current || _options?.document || document;

    domNode.addEventListener('keyup', handleKeyUp);
    domNode.addEventListener('keydown', handleKeyDown);

    if (proxy) {
      parseKeysHookInput(_keys, memoisedOptions?.splitKey).forEach((key) =>
        proxy.addHotkey(
          parseHotkey(
            key,
            memoisedOptions?.combinationKey,
            memoisedOptions?.description,
          ),
        ),
      );
    }

    return () => {
      domNode.removeEventListener('keyup', handleKeyUp);
      domNode.removeEventListener('keydown', handleKeyDown);

      if (proxy) {
        parseKeysHookInput(_keys, memoisedOptions?.splitKey).forEach((key) =>
          proxy.removeHotkey(
            parseHotkey(
              key,
              memoisedOptions?.combinationKey,
              memoisedOptions?.description,
            ),
          ),
        );
      }
    };
  }, [_keys, memoisedOptions, enabledScopes]);

  return ref;
}
