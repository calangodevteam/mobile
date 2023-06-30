import React from 'react';
import { ActivityIndicator, Portal, useTheme } from 'react-native-paper';
import { AppTheme } from '../../@types/theme';
import { styles } from './styles';

const Loading = () => {
    const theme = useTheme<AppTheme>();
  return (
    <Portal>
    <ActivityIndicator style={styles.container} animating={true} size={'large'} color={theme.colors.primary} />
  </Portal>
  );
};

export default Loading;
