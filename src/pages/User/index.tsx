import React, {useEffect} from 'react';
import {styles} from './styles';
import {Avatar, Text} from 'react-native-paper';
import UsuLevelCard from '../../components/UsuLevelCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SignOut} from '../../services/FireBaseAuth';
import {View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../types/reduxHooks';
import {toggleTheme} from '../../redux/themeSlice';
import AppBar from '../../components/AppBar';
import { fetchPointUsu } from '../../redux/pontuacaoSlice';
import { persistor } from '../../redux/store';

const User = () => {
  const aluno = useAppSelector(state => state.auth.aluno);
  const pontuacao = useAppSelector(state => state.pontuacao.pontuacao);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPointUsu(aluno?.id!)).catch(response => {
        console.log('error:', response.message);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Usuario"
        dots={[
          {
            id:1,
            title: 'Alterar Tema',
            action: () => dispatch(toggleTheme()),
          },
          {
            id:2,
            title: 'Sair',
            action: () =>
              SignOut()
                .then(() => {
                  console.log('SignOut with Google!');
                  persistor.purge().catch(error => {
                    console.log('error delete AsyncStorage: ', error);
                  });
                })
                .catch(error => {
                  console.log('error signOut: ', error);
                }),
          },
        ]}
      />
      <View style={styles.containerView}>
        <View style={styles.userPerfil}>
          <Avatar.Image size={96} source={{uri: aluno?.fotoPerfil}} />
          <Text variant="headlineMedium" style={styles.textPerfil}>
            {aluno?.nome}
          </Text>
        </View>
        {pontuacao ? <UsuLevelCard pontuacao={pontuacao!} /> : null}
      </View>
    </SafeAreaView>
  );
};

export default User;
