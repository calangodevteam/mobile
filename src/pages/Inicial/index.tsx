import React, { useEffect, useState } from 'react';
import {styles} from './styles';
import {Text, TouchableRipple, useTheme} from 'react-native-paper';
import {Image, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppTheme } from '../../@types/theme';
import { SvgXml } from 'react-native-svg';
import { CalangoSvgXml } from '../../assets/xml/CalangoSvg';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const Inicial = () => {

  const navigation = useNavigation();

  const theme = useTheme<AppTheme>();

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      if (userState) {
        setUser(userState);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleIsLogged = () => {
    console.log(user);
    user ? navigation.navigate('app') : navigation.navigate('login');
  };

  return (
    <TouchableRipple
      style={[styles.container]}
      onPress={() => handleIsLogged()}
      rippleColor="rgba(202, 202, 202, 0.01)">
      <View style={[styles.view]}>
        <SvgXml xml={CalangoSvgXml} fill={theme.colors.primary}/>
        <Image style={[styles.image]} source={require('../../assets/logo300.png')} />
        <Text variant="titleLarge" >versão 0.0.0.1</Text>
      </View>
    </TouchableRipple>
  );
};

export default Inicial;
