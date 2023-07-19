import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {AnimatedFAB, Button, useTheme} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import ListEmpty from '../../../components/ListEmpty';
import { AppTheme } from '../../../types/theme';
import Loading from '../../../components/Loading';
import { useAppDispatch, useAppSelector } from '../../../types/reduxHooks';
import { fetchResult } from '../../../redux/resultadoSlice';
import AppBar from '../../../components/AppBar';

const HistoricoCamp = () => {

  const theme = useTheme<AppTheme>();
  const dispatch = useAppDispatch();

  const aluno = useAppSelector((state) => state.auth.aluno);
  const loading = useAppSelector((state) => state.result.loading);
  const error = useAppSelector((state) => state.result.error);
  const resultados = useAppSelector((state) => state.result.resultados);

  const navigation = useNavigation();

  const [isExtended, setIsExtended] = useState(false);

  useEffect(() => {
    setIsExtended(true);
    dispatch(fetchResult(aluno?.id!));
  }, []);

  if (!loading && error !== ''){
    console.log('Error: ', error);
  }

  const handleCampanha = () => {
    navigation.navigate('camp_escolha');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Histórico de Campanhas"
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={resultados}
        keyExtractor={(resp) => resp.questionario.id.toString()}
        ListEmptyComponent={
          !resultados && loading === false ? (<ListEmpty
            title="Hístico de Campanha Vazio!"
            subTitle="Clique em iniciar campanha e se divirta!"
            icon={{
              name:'book-open-page-variant-outline',
              size:80,
              color:theme.colors.onBackground,
            }}
          />) : null
        }
        renderItem={({ item }) => (
          <Button
          mode="elevated"
          icon="chevron-right"
          contentStyle={styles.buttonContent}
          labelStyle={{color: theme.colors.onBackground}}
          style={styles.button}
          onPress={
            () => {
              console.log('clicou!');
            }
          }
        >
        {item.questionario.titulo}
        </Button>
        )}
      />
      <AnimatedFAB
        variant="primary"
        icon={'plus'}
        label={'Iniciar Campanha'}
        extended={isExtended}
        onPress={handleCampanha}
        animateFrom={'right'}
        iconMode={'dynamic'}
        style={styles.fab}
      />
      {loading ? (<Loading/>) : null}
    </SafeAreaView>
  );
};

export default HistoricoCamp;
