import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {Avatar, Button, Switch, Text} from 'react-native-paper';
import UsuLevelCard from '../../components/UsuLevelCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import { SignOut } from '../../services/FireBaseAuth';
import { findPontuacaoByAluno } from '../../services/ApiCalango';
import { Pontuacao } from '../../@types/aluno';
import { View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../@types/reduxHooks';
import { signOut } from '../../redux/authSlice';
import { toggleTheme } from '../../redux/themeSlice';

const User = () => {

  const aluno = useAppSelector((state) => state.auth.aluno);
  const isThemeDark = useAppSelector(state => state.theme.isThemeDark);
  const dispatch = useAppDispatch();

  const [pontuacao, setPontuacao] = useState<Pontuacao>();

  useEffect(() => {
    findPontuacaoByAluno(aluno?.id!).then(response => {
      setPontuacao(response.data as Pontuacao);
      console.log('response:', response.data);
    }).catch(response => {
      console.log('error:', response.message);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userPerfil}>

        <Avatar.Image size={96} source={{uri:aluno?.fotoPerfil}} />

        <Text variant="headlineMedium" style={styles.textPerfil}>{aluno?.nome}</Text>

      </View>
      {pontuacao ? (<UsuLevelCard pontuacao={pontuacao!} />) : null}
      <View style={{flexDirection:'row'}}>
      <Text>Tema: </Text>
      <Switch color={'red'} value={isThemeDark} onValueChange={() => {dispatch(toggleTheme());}} />
      </View>
      <Button mode="contained" onPress={() =>
        SignOut().then(() => {
          console.log('SignOut with Google!');
          signOut();
          dispatch(signOut());
      }).catch(error => {console.log('error signOut: ', error);})}
      >
        SignOut
      </Button>
    </SafeAreaView>
  );
};

export default User;
