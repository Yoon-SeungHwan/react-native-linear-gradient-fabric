import * as React from 'react';
import { Text } from 'react-native';

import { LinearGradient } from '../index';

// Mock the native component
jest.mock('../LinearGradientNativeComponent', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: View,
  };
});

describe('LinearGradient', () => {
  it('should throw an error if less than 2 colors are provided', () => {
    expect(() => {
      // @ts-expect-error Testing invalid input
      <LinearGradient colors={['#ff0000']} />;
    }).toThrow('LinearGradient requires at least 2 colors');
  });

  it('should accept valid color props', () => {
    expect(() => {
      <LinearGradient colors={['#ff0000', '#00ff00']} />;
    }).not.toThrow();
  });

  it('should accept children', () => {
    expect(() => {
      <LinearGradient colors={['#ff0000', '#00ff00']}>
        <Text>Hello</Text>
      </LinearGradient>;
    }).not.toThrow();
  });

  it('should accept start and end props', () => {
    expect(() => {
      <LinearGradient
        colors={['#ff0000', '#00ff00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />;
    }).not.toThrow();
  });

  it('should accept locations prop', () => {
    expect(() => {
      <LinearGradient
        colors={['#ff0000', '#00ff00', '#0000ff']}
        locations={[0, 0.5, 1]}
      />;
    }).not.toThrow();
  });

  it('should accept angle props', () => {
    expect(() => {
      <LinearGradient
        colors={['#ff0000', '#00ff00']}
        useAngle
        angle={45}
        angleCenter={{ x: 0.5, y: 0.5 }}
      />;
    }).not.toThrow();
  });
});
