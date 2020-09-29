import { StylesType } from 'types';
import { StyleSheet } from 'aphrodite/no-important';

export const notification = (styles?: StylesType) =>
  StyleSheet.create({
    _: {
      position: 'relative',
      minHeight: 65,
      padding: '2em',
      fontSize: '0.875rem',
      color: '#ffffff',
      borderRadius: 1,
      boxShadow: '0 1px 10px 0 rgba(0,0,0,.1), 0 2px 15px 0 rgba(0,0,0,.05)',
      cursor: 'pointer',
      boxSizing: 'border-box',
      ...styles
    }
  });

export const closeWrapper = (styles?: StylesType) =>
  StyleSheet.create({
    _: {
      position: 'absolute',
      right: '0.5em',
      top: '0.5em',
      display: 'flex',
      boxSizing: 'border-box',
      ...styles
    }
  });

export const close = (styles?: StylesType) =>
  StyleSheet.create({
    _: {
      width: '1em',
      height: '1em',
      fill: 'currentColor',
      opacity: 0.8,
      transition: 'opacity .3s ease',
      boxSizing: 'border-box',
      ':hover': {
        opacity: 1
      },
      ...styles
    }
  });
