import { StyleSheet } from 'aphrodite/no-important';
import { positionStyles } from 'constants';
import { PositionTypes } from './types';

export const container = (position: PositionTypes, width: string | number, isVisible: boolean) =>
  StyleSheet.create({
    _: {
      position: 'fixed',
      zIndex: 9999,
      display: 'grid',
      gridRowGap: '1rem',
      width,
      maxHeight: '100vh',
      boxSizing: 'border-box',
      pointerEvents: !isVisible ? 'none' : 'auto',
      ...positionStyles[position]
    }
  });
