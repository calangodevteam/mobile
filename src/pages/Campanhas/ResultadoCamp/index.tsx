import React, {useState} from 'react';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Card, Text, useTheme} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Image, View} from 'react-native';
import {moedasGanhas} from '../../../utils/Pontuacao';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Resultado} from '../../../@types/@navigation';
import { AppTheme } from '../../../@types/theme';

const ResultadoCamp = () => {
  const theme = useTheme<AppTheme>();
  const navigation = useNavigation();

  const route = useRoute();
  const resultado = route.params as Resultado;
  const [showPercente, setShowPercente] = useState(false);
  const porcento = parseFloat(
    ((resultado.acertos / resultado.qtdQuestoes) * 100).toPrecision(2),
  );
  const pontuacao = moedasGanhas(resultado.dificuldade, resultado.acertos);

  const aux = () => {
    navigation.navigate('camp_historico');
  };

  const complete = () => setShowPercente(!showPercente);

  const definedColor = () => {
    if (porcento > 60) {
      return theme.colors.success;
    }
    else {
      return porcento < 40 ? theme.colors.errorLight : theme.colors.warning;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card contentStyle={styles.cardContainer}>
        <Card.Content style={styles.CardDireitoContainer}>
          <Text variant="titleSmall">Seu desempenho</Text>
          <AnimatedCircularProgress
            size={125}
            width={8}
            backgroundWidth={10}
            fill={porcento}
            duration={1000}
            onAnimationComplete={() => complete()}
            tintColor={definedColor()}
            backgroundColor={theme.colors.surfaceVariant}
            style={styles.animated}>
            {fill => (
              <Text
                variant="headlineSmall"
                style={[{color: definedColor()},styles.fontBold]}>
                {showPercente ? `${fill}%` : ''}
              </Text>
            )}
          </AnimatedCircularProgress>
          <View style={styles.viewPoints}>
            <Text variant="titleSmall" style={styles.textViewPoint}>
              Moedas:
            </Text>
            <Image
              style={styles.imageIcon}
              source={require('../../../assets/dollar32.png')}
            />
            {showPercente ? (
              <Text
                variant="titleSmall"
                style={styles.textViewPoint}>{`+${pontuacao.moedas}`}</Text>
            ) : null}
          </View>
          <View style={styles.viewPoints}>
            <Text variant="titleSmall" style={styles.textViewPoint}>
              Exp:
            </Text>
            <Image
              style={styles.imageIcon}
              source={require('../../../assets/star32.png')}
            />
            {showPercente ? (
              <Text
                variant="titleSmall"
                style={styles.textViewPoint}>{`+${pontuacao.exp}`}</Text>
            ) : null}
          </View>
        </Card.Content>
        <Card.Content style={styles.cardEsquerdoContainer}>
          <View>
            <Text variant="titleLarge" style={styles.textRespCerta}>
              Respostas Certas
            </Text>
            <Text
              variant="headlineMedium"
              style={[{color: theme.colors.success},styles.fontBold]}>
              {showPercente ? resultado.acertos : ''}
            </Text>
            <Text variant="titleLarge" style={styles.textRespErradas}>
              Respostas Erradas
            </Text>
            <Text
              variant="headlineMedium"
              style={[{color: theme.colors.errorLight},styles.fontBold]}>
              {showPercente ? resultado.qtdQuestoes - resultado.acertos : ''}
            </Text>
          </View>
        </Card.Content>
        <Card.Actions style={styles.cardInferiorContainer}>
          <Button
            mode="contained"
            onPress={aux}
            icon={'arrow-left-thin'}
            style={styles.buttonBack}>
            Voltar ao menu
          </Button>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
};

export default ResultadoCamp;
