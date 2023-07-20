import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Button,
  Dialog,
  List,
  Portal,
  ProgressBar,
  RadioButton,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Questionario} from '../../../types/questionario';
import {Image, ScrollView, View} from 'react-native';
import {Questao} from '../../../types/questao';
import QuestaoOpcao from '../../../components/QuestaoOpcao';
import QuestaoArtigo from '../../../components/QuestaoArtigo';
import {AppTheme} from '../../../types/theme';
import {createRespostaEmMassa, createResultado, updateResultado} from '../../../services/ApiCalango';
import {useAppDispatch, useAppSelector} from '../../../types/reduxHooks';
import {fetchResult} from '../../../redux/resultadoSlice';
import {Resposta} from '../../../types/resposta';
import { fetchPointUsu, fetchPoints } from '../../../redux/pontuacaoSlice';

const QuestoesCamp = () => {
  const theme = useTheme<AppTheme>();
  const aluno = useAppSelector(state => state.auth.aluno);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const route = useRoute();
  const questionario = route.params as Questionario;

  const [index, setIndex] = useState(0);

  const [respostas, setRespostas] = useState<Resposta[]>([]);

  const [acertos, setAcertos] = useState(0);

  const [idResultado, setIdResultado] = useState<number | null>();

  const [questAtual, setQuestAtual] = useState<Questao>(
    questionario.questoes[index],
  );

  const [valueOption, setValueOption] = useState(
    questAtual.opcoes[0].id.toString(),
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    createResultado({aluno: aluno!, questionario: questionario!, acertos: 0})
      .then(response => {
        setIdResultado(response.data.id);
      })
      .then(() => {
        dispatch(fetchResult(aluno?.id!));
      })
      .catch(response => {
        console.log('error:', response.message);
        navigation.goBack();
      });
  }, []);

  useEffect(() => {
    setQuestAtual(questionario.questoes[index]);
  }, [index]);

  useEffect(() => {
    setValueOption(questAtual.opcoes[0].id.toString());
  }, [questAtual]);

  const showDialog = () => setVisible(!visible);

  const handleFinishQuest = () => {
    updateResultado({
      id: idResultado!,
      aluno: aluno!,
      questionario: questionario!,
      acertos: acertos,
    })
      .then(() => {
        dispatch(fetchPoints());
        dispatch(fetchPointUsu(aluno?.id!));
        navigation.navigate('camp_resultado', {
          acertos: acertos,
          dificuldade: questionario.dificuldade,
          qtdQuestoes: questionario.qtdQuestoes,
        });
      })
      .catch(response => {
        console.log('error:', response.message);
      });
  };

  const handleResponse = () => {
    const newRespone: Resposta = {
      aluno: {
        id: aluno?.id!,
      },
      questionario: {
        id: questionario.id,
      },
      questao: {
        id: questAtual.id,
      },
      opcao: {
        id: parseFloat(valueOption),
      },
    };
    setRespostas(res => [...res, newRespone]);
    if (questAtual.opcaoCorreta.id.toString() == valueOption) {
      setAcertos(acertos + 1);
    }

    if (index == questionario.questoes.length - 1) {
      createRespostaEmMassa(respostas).then(() => {
        showDialog();
      }).catch((response) => {
        console.log(response.message);
      });
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar
        key={'progress1'}
        animatedValue={index / (questionario.questoes.length - 1)}
        color={theme.colors.primary}
        style={styles.progressBar}
      />
      <View style={styles.containerQuestao}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}
          keyboardDismissMode="none">
          <Text variant="titleMedium" style={styles.text}>
            {questAtual!.texto}
          </Text>

          <View style={styles.imageView}>
            {questAtual.figuras.map(fig => (
              <TouchableRipple
                key={`touch${fig.id}`}
                style={styles.touchImage}
                background={{color: 'rgba(0, 0, 0, .30)'}}
                onPress={() => {
                  console.log('clicou');
                }}>
                <Image
                  key={`fig${fig.id}`}
                  style={styles.image}
                  source={{uri: fig.atributo}}
                />
              </TouchableRipple>
            ))}
          </View>

          {questAtual.artigos.length > 0 ? (
            <List.Section
              id="art"
              style={[
                {borderColor: theme.colors.elevation.level5},
                styles.listSecion,
              ]}>
              <List.Subheader style={styles.listSubHeader}>
                Artigos
              </List.Subheader>
              {questAtual.artigos.map(art => (
                <QuestaoArtigo key={`art${art.id}`} artigo={art} />
              ))}
            </List.Section>
          ) : null}

          <RadioButton.Group
            onValueChange={newValue => setValueOption(newValue)}
            value={valueOption}>
            {questAtual.opcoes.map(op => (
              <QuestaoOpcao key={`op${op.id}`} opcao={op} />
            ))}
          </RadioButton.Group>
        </ScrollView>
      </View>
      <Button
        mode="contained"
        onPress={() => {
          handleResponse();
        }}>
        {questionario.questoes.length != 1 &&
        index != questionario.questoes.length - 1
          ? 'Proxima'
          : 'Finalizar'}
      </Button>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={showDialog}
          style={[
            {backgroundColor: theme.colors.background},
            styles.dialogoContainer,
          ]}>
          <Image
            source={require('../../../assets/champagne.png')}
            style={styles.imageDialogo}
          />
          <Dialog.Title style={styles.dialogoTitle}>Parabéns</Dialog.Title>
          <Dialog.Content style={styles.dialogoContent}>
            <Text variant="titleMedium">Você concluiu este questionário!</Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.actionContainerDialogo}>
            <Button
              mode="elevated"
              contentStyle={styles.buttonDialogo}
              icon={'arrow-right'}
              onPress={() => {
                showDialog();
                handleFinishQuest();
              }}>
              Ir Para Resultados
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

export default QuestoesCamp;
