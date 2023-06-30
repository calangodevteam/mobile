import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { Badge, Button, ProgressBar, Text, useTheme } from 'react-native-paper';
import { AppTheme } from '../../@types/theme';
import { Pontuacao } from '../../@types/aluno';

interface props {
  pontuacao: Pontuacao
}
const UsuLevelCard = ({pontuacao}:props) => {
  const theme = useTheme<AppTheme>();

  return (
    <View style={[styles.container, {borderColor:theme.colors.elevation.level5}]}>
        <View style={styles.viewNivel}>
          <Badge style={[{backgroundColor:theme.colors.onBackground},styles.badgeNivel]} size={35}>{pontuacao.nivel}</Badge>
          <View>
            <Text variant="titleLarge">{`Nível ${pontuacao.nivel}`}</Text>
            <Text variant="labelLarge" style={{color:theme.colors.outline}} >{`${pontuacao.proxNivel - pontuacao.experiencia} para o próximo nível`}</Text>
          </View>
        </View>

        <View style={styles.viewProgress}>
          <ProgressBar animatedValue={pontuacao.experiencia / pontuacao.proxNivel} color={theme.colors.scoreColor} style={styles.progressBar}/>
          <Badge size={32} style={[{backgroundColor:theme.colors.scoreColor}, styles.badgedProgressLeft]}>{pontuacao.nivel}</Badge>
          <Button icon="star" labelStyle={{color:theme.colors.onBackground}} mode="text" disabled style={styles.textProgress}>
            {`${pontuacao.experiencia}/${pontuacao.proxNivel}`}</Button>
          <Badge size={32} style={[{backgroundColor:theme.colors.scoreColor}, styles.badgedProgressRight]}>{pontuacao.nivel + 1}</Badge>
        </View>

    </View>
  );
};

export default UsuLevelCard;
