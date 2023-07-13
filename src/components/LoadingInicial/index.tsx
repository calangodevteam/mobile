import React from 'react';
import {styles} from './styles';
import {Text, useTheme} from 'react-native-paper';
import {Image, SafeAreaView, View} from 'react-native';
import { AppTheme } from '../../types/theme';
import { SvgXml } from 'react-native-svg';
import { CalangoSvgXml } from '../../assets/xml/CalangoSvg';

const LoadingInicial = () => {

  const theme = useTheme<AppTheme>();

  return (
    <SafeAreaView
      style={[styles.container,{backgroundColor:theme.colors.background}]}>
      <View style={[styles.view]}>
        <SvgXml xml={CalangoSvgXml} fill={theme.colors.primary}/>
        <Image style={[styles.image]} source={require('../../assets/logo300.png')} />
        <Text variant="titleLarge" >versão 0.0.0.1</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoadingInicial;
