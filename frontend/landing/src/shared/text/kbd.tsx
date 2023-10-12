import React from 'react';

import { sx, themeGet } from '@primer/react';
import styled from 'styled-components';

const KBDStyled = styled.kbd`
  display: inline-block;
  padding: 3px 5px;
  font: 11px ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
    Liberation Mono, monospace;
  line-height: 10px;
  color: ${themeGet('colors.fg.default')};
  vertical-align: middle;
  background-color: ${themeGet('colors.canvas.subtle')};
  border: 1px solid ${themeGet('colors.border.default')};
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 ${themeGet('colors.neutral.muted')};
`;

export const KBD = (props: any) => {
  return <KBDStyled style={props.style}>{props.children}</KBDStyled>;
};
