import { TextStyle } from 'react-native';
import { Colors } from './colors';

export const Typography: { [key: string]: TextStyle } = {
  hero: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textMain,
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  h1: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textMain,
    letterSpacing: -0.3,
    lineHeight: 30,
  },
  h2: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textMain,
    letterSpacing: -0.2,
    lineHeight: 26,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textMain,
    lineHeight: 24,
  },
  body: {
    fontSize: 15,
    fontWeight: '400',
    color: Colors.textSub,
    lineHeight: 22,
  },
  bodyBold: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textMain,
    lineHeight: 22,
  },
  callout: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSub,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textMuted,
    lineHeight: 16,
  },
  tag: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
};
