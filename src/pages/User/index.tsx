import React, {useContext} from 'react';
import {styles} from './styles';
import {Button, Switch} from 'react-native-paper';
import {PreferencesContext} from '../../contexts/ThemeContext';
import UsuLevelCard from '../../components/UsuLevelCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import { SignOut } from '../../services/FireBaseAuth';
import { useAuth } from '../../contexts/AuthContext';

const User = () => {

  const {signOut, aluno} = useAuth();
  const {toggleTheme, isThemeDark} = useContext(PreferencesContext);

  return (
    <SafeAreaView style={styles.container}>
      <Switch color={'red'} value={isThemeDark} onValueChange={toggleTheme} />
      <Button mode="contained" onPress={() =>
        SignOut().then(() => {
          console.log('SignOut with Google!');
          signOut();
      }).catch(error => {console.log('error signOut: ', error);})}
      >
        SignOut {aluno?.nome}
      </Button>
      <UsuLevelCard />
    </SafeAreaView>
  );
};

export default User;
