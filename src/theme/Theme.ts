import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  configureFonts,
} from 'react-native-paper';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const customVariants = {

  lilitaOne: {
    fontFamily: 'LilitaOne-Regular',
    fontWeight: '400',
    letterSpacing: 0.5,
    lineHeight: 22,
    fontSize: 24,
  },
} as const;

export const defaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  roundness: 12,

  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
    success:'#7bff00',
    warning:'#fae62e',
    errorLight:'#ff0000',
    scoreColor:'#F3B14E',
    scoreColorBronze:'#cd7f32',
    scoreColorPrata:'#c0c0c0',
    scoreColorOuro:'#ffd700',
  },

  fonts: configureFonts({config: customVariants}),

};

export const darkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  roundness: 12,

  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    success:'#7bff00',
    warning:'#fae62e',
    errorLight:'#ff0000',
    scoreColor:'#F3B14E',
    scoreColorBronze:'#cd7f32',
    scoreColorPrata:'#c0c0c0',
    scoreColorOuro:'#ffd700',
  },

  fonts: configureFonts({config: customVariants}),
};
