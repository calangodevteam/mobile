import React from 'react';
import {Avatar, Card, useTheme} from 'react-native-paper';
import {styles} from './styles';
import { View } from 'react-native';
import { AppTheme } from '../../types/theme';

interface props {
  foto: string;
  nome: string;
  nivel: number;
  exp:number;
  ind:number
}

const image = (imageUrl: string, props: any) => (
  <Avatar.Image {...props} source={{uri: imageUrl}} />
);

const RankingCard = ({foto, nome, nivel, ind, exp}: props) => {

  const theme = useTheme<AppTheme>();

  const esqCor = () => {
    if (ind > 1){
      return theme.colors.scoreColorPrata;
    }
    return theme.colors.scoreColorOuro;
  };

  return (
    <View style={styles.container}>
      <Avatar.Text
        size={46}
        label={ind.toString()}
        labelStyle={{
          fontSize: ind > 999 ?
          theme.fonts.titleMedium.fontSize :
          theme.fonts.titleLarge.fontSize,
        }}
        style={{
          backgroundColor: esqCor(),
        }}
      />
      <Card style={styles.containerCard}>
        <Card.Title
          title={nome}
          titleVariant="titleMedium"
          subtitle={`Nivel: ${nivel} | Experiencia: ${exp}`}
          subtitleVariant="bodyMedium"
          left={props => image(foto, props)}
        />
      </Card>
    </View>
  );
};

export default RankingCard;
