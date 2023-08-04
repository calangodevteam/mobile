import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {AnimatedFAB, Button, Text, useTheme} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import ListEmpty from '../../../components/ListEmpty';
import { AppTheme } from '../../../types/theme';
import Loading from '../../../components/Loading';
import { useAppDispatch, useAppSelector } from '../../../types/reduxHooks';
import { fetchResult } from '../../../redux/resultadoSlice';
import AppBar from '../../../components/AppBar';
import ModalResultado from '../../../components/ModalResultado';
import { Resultado } from '../../../types/questionario';
import { isValid } from '../../../utils/Date';
import ListLoading from '../../../components/ListLoading';
import { PageRequest } from '../../../types/page';

const HistoricoCamp = () => {

  const theme = useTheme<AppTheme>();
  const dispatch = useAppDispatch();

  const aluno = useAppSelector((state) => state.auth.aluno);
  const loading = useAppSelector((state) => state.result.loading);
  const error = useAppSelector((state) => state.result.error);
  const resultados = useAppSelector((state) => state.result.resultados);
  const pageResultados = useAppSelector(state => state.result.pageResponse);

  const navigation = useNavigation();

  const [isExtended, setIsExtended] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [resultado, setResultado] = useState<Resultado>();

  const [pageble, setPageble] = useState<PageRequest>({
    page: 0,
    size: 10,
    sort: [
      {
        orderBy: 'termino',
        direction: 'desc',
      },
    ],
  });

  useEffect(() => {
    dispatch(fetchResult({alunoId: aluno?.id!, pageble: pageble})).then(page => {
      console.log('page:', page);
    })
    .catch(response => {
      console.log('error:', response.message);
    });
    setIsRefreshing(false);
  }, [pageble]);

  if (!loading && error !== ''){
    console.log('Error: ', error);
  }

  const showModal = () => setVisible(!visible);

  const handleResultado = (result: Resultado) => {
    setResultado(result);
  };

  const handleCampanha = () => {
    navigation.navigate('camp_escolha');
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    setPageble(prev => ({...prev, page: 0}));
  };

  const fetchMoreData = () => {
    if (!pageResultados?.last) {
      setPageble(prev => ({...prev, page: pageble.page! + 1}));
      console.log('deu bom');
    } else {
      console.log('acabou');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Histórico de Campanhas"
      />
      <FlatList
        showsVerticalScrollIndicator={true}
        data={resultados}
        style={styles.flatList}
        onScrollEndDrag={() => {setIsExtended(true);}}
        onScrollBeginDrag={() => {setIsExtended(false);}}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        keyExtractor={resp => resp.id!.toString()}
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
              handleResultado(item);
              showModal();
            }
          }
        >
          <Text>
          {`${item.questionario?.titulo} `}
          </Text>
          <Text style={{
            color: isValid(item.questionario?.dataCriacao!, item.questionario?.tempoDuracao!) === true ?
              theme.colors.success : theme.colors.errorLight,
            }}
          >
          {isValid(item.questionario?.dataCriacao!, item.questionario?.tempoDuracao!) === true ? ' Ativa' : ' Encerrada'}
          </Text>
        </Button>
        )}
        onEndReachedThreshold={0.1}
        onEndReached={fetchMoreData}
        ListFooterComponent={
          pageResultados?.empty === false ? (
            <ListLoading
              loading={!pageResultados.last}
              size={'small'}
              color={theme.colors.secondary}
            />
          ) : null
        }
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
      <ModalResultado
        visible={visible}
        resultado={resultado}
        onClose={() => showModal()}
      />
      {loading && !pageResultados ? (<Loading/>) : null}
    </SafeAreaView>
  );
};

export default HistoricoCamp;
