import styled, { css } from 'styled-components';
import { AppearanceStyle } from '../../../../../interfaces/user';
import { getColor } from '../../../../themes';

interface StyledProps {
    appearanceStyle: AppearanceStyle;
}

export const StyledTitleBar = styled.div<StyledProps>`
  width: 100%;
  height: ${({appearanceStyle}) => appearanceStyle === 'top_double' ? '42px' : '50px'};
  display: grid;
  grid-template-columns: 1fr 135px;
  background-color: ${({ theme }) => getColor(theme.palette.titleBar)};
  app-region: drag;
`;

const getStyle = (style: AppearanceStyle) => {
    switch (style) {
        case 'top_single':
            return css`
              padding: .5rem 1rem .5rem .5rem;
              grid-template-columns: calc(50px - 1rem) auto minmax(250px, 25%) 1px 1fr;
              grid-template-areas: 'application-menu navigation-bar address-bar divider horizontal-tab-container';
            `;
        case 'top_double':
            return css`
              padding: .5rem 1rem 0 .5rem;
              grid-template-columns: calc(50px - 1rem) 1fr;
              grid-template-areas: 'application-menu horizontal-tab-container';
            `;
        case 'left':
        case 'right':
            return css`
              padding: .5rem 1rem .5rem .5rem;
              grid-template-columns: calc(50px - 1rem) auto 1fr auto;
              grid-template-areas: 'application-menu navigation-bar address-bar extensions';
            `;
        default:
            return css`
              padding: .5rem 1rem .5rem .5rem;
              grid-template-columns: calc(50px - 1rem) auto 1fr auto;
              grid-template-areas: 'application-menu navigation-bar address-bar extensions';
            `;
    }
};

export const StyledContainer = styled.div<StyledProps>`
  width: 100%;
  height: inherit;
  display: grid;
  gap: 8px;

  ${({ appearanceStyle }) => getStyle(appearanceStyle)};
`;