import React, { useState } from 'react';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { SignIn } from '../../../services/FireBaseAuth';
import { findAlunoByEmail } from '../../../services/ApiCalango';
import { Text } from 'react-native-paper';
import Loading from '../../../components/Loading';
import { signIn } from '../../../redux/authSlice';
import { useAppDispatch } from '../../../@types/reduxHooks';

const Login = () => {

  const navigation = useNavigation();
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
      setLoading(true);
      SignIn().then(({ user }) => {
        findAlunoByEmail(user.email!).then(response => {
          setLoading(false);
          dispatch(signIn({ aluno: response.data }));
        })
        .catch(error => {
          setLoading(false);
          console.log('erro ao buscar aluno: ', error);
          navigation.navigate('cadastro');
        });
      }).catch(error => {console.log('error: ', error); setLoading(false);});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require('../../../assets/estudante.png')} />
      <Text variant="displaySmall">Bem vindo(a)!</Text>
      <Text variant="titleMedium" style={styles.text}>Faça o login com o google e vamos começar!</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={() => handleSignIn() }
      />
      {loading ? (<Loading/>) : null}
    </SafeAreaView>
  );
};

export default Login;
