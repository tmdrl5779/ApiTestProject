import { color, overlayScrollBarXCss } from '@/data/variables.style'
import { css, SerializedStyles } from '@emotion/react'
import { TabPosition, TabType } from './types'

export const tabsCss: Record<
  'self' | 'item' | 'activeLine',
  (tabPosition: TabPosition, background: string | undefined, type: TabType) => SerializedStyles
> = {
  self: (tabPosition, background, type) => css`
    overflow: hidden;
    ${overlayScrollBarXCss}
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 16px;
    line-height: 0;
    list-style: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    margin-bottom: 0;
    padding-inline-start: 0;
    outline: none;
    transition: background 0.3s, width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
    box-shadow: none;
    border-inline-end: 0px solid rgba(5, 5, 5, 0.06);
    background: ${background !== undefined ? background : color.navBar};
    width: ${['left', 'right'].includes(tabPosition) ? '12rem' : '100%'};
    max-width: 100%;
    height: ${['left', 'right'].includes(tabPosition) ? '100%' : type === 'line' ? '52px' : '40px'};
    max-height: 100%;
    display: flex;
    flex-direction: ${['left', 'right'].includes(tabPosition) ? 'column' : 'row'};

    &::before {
      display: table;
      content: '';
    }

    ${type === 'card' && tabPosition === 'top'
      ? `& li:first-child {
      border-left: none;
    }

    & li:last-child {
      border-right: none;
    }`
      : ''}
  `,
  item: (tabPosition, background, type) => css`
    box-sizing: border-box;
    color: ${color.secondaryText};
    margin: 0;
    white-space: nowrap;
    cursor: pointer;
    text-overflow: ellipsis;
    height: ${type === 'line' ? '52px' : '40px'};
    line-height: ${type === 'line' ? '52px' : '40px'};
    list-style: none;
    display: flex;
    align-items: center;
    transition: border 0.3s, color 0.3s, background 0.3s, padding 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    position: relative;
    padding: 4px 12px;
    ${type === 'card' ? `border: 1px solid ${color.pale};` : ''}

    &.selected,
    &:not(.selected):active,
    &:not(.selected):hover {
      color: ${color.primaryText};
    }

    &.selected {
      ${type === 'card' && tabPosition === 'top' ? `border-bottom: 1px solid ${color.background}` : ''};
      ${type === 'card' && tabPosition === 'bottom' ? `border-top: 1px solid ${color.background}` : ''};
      ${type === 'card' && tabPosition === 'left' ? `border-right: 1px solid ${color.background}` : ''};
      ${type === 'card' && tabPosition === 'right' ? `border-left: 1px solid ${color.background}` : ''};
    }

    .item-title {
      margin-left: 12px;
    }
  `,
  activeLine: (tabPosition, background, type) => css`
    position: absolute;
    background: ${type === 'line' ? color.primaryText : color.accent};
    ${tabPosition !== 'right' ? (type === 'line' ? 'right: 0;' : 'left: 0;') : ''}
    ${tabPosition !== 'left' ? (type === 'line' ? 'left: 0;' : 'right: 0;') : ''}
    ${tabPosition !== 'top' ? (type === 'line' ? 'top: 0;' : 'bottom:0;') : ''}
    ${tabPosition !== 'bottom' ? (type === 'line' ? 'bottom: 0;' : 'top:0;') : ''}

    width: ${['left', 'right'].includes(tabPosition) ? '2px' : '100%'};
    height: ${['left', 'right'].includes(tabPosition) ? '100%' : '2px'};
  `,
}
