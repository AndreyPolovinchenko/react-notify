import { StyleSheet } from 'aphrodite/no-important';
import { positionStyles } from 'constants';
import { PositionTypes } from './types';

export const container = (position: PositionTypes, isVisible: boolean) =>
  StyleSheet.create({
    _: {
      position: 'fixed',
      zIndex: 9999,
      display: 'grid',
      gridRowGap: '1rem',
      width: 320,
      maxHeight: '100vh',
      padding: 4,
      boxSizing: 'border-box',
      pointerEvents: !isVisible ? 'none' : 'auto',
      ...positionStyles[position]
    }
  });
