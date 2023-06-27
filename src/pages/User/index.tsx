import React, {useContext} from 'react';
import {styles} from './styles';
import {Button, Switch} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {PreferencesContext} from '../../contexts/ThemeContext';
import UsuLevelCard from '../../components/UsuLevelCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import { SignOut } from '../../services/FireBaseAuth';

const User = () => {
  const navigation = useNavigation();

  const {toggleTheme, isThemeDark} = useContext(PreferencesContext);

  return (
    <SafeAreaView style={styles.container}>
      <Switch color={'red'} value={isThemeDark} onValueChange={toggleTheme} />
      <Button mode="contained" onPress={() =>
        SignOut().then(() => {
          console.log('SignOut with Google!');
          navigation.navigate('inicial');
      }).catch(error => {console.log('error signOut: ', error);})}
      >
        SignOut
      </Button>
      <UsuLevelCard />
    </SafeAreaView>
  );
};

export default User;
