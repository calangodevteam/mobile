import React, { useEffect, useState } from 'react';
import {styles} from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import ModalQuestionario from '../../../components/ModalQuestionario';
import ListEmpty from '../../../components/ListEmpty';
import { Questionario } from '../../../types/questionario';
import { AppTheme } from '../../../types/theme';
import Loading from '../../../components/Loading';
import { useAppDispatch, useAppSelector } from '../../../types/reduxHooks';
import { fetchCamp } from '../../../redux/campanhaSlice';
import { PageRequest } from '../../../types/page';
import ListLoading from '../../../components/ListLoading';

const EscolhaCamp = () => {

  const theme = useTheme<AppTheme>();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const aluno = useAppSelector((state) => state.auth.aluno);
  const loading = useAppSelector((state) => state.campanha.loading);
  const error = useAppSelector((state) => state.campanha.error);
  const campanhas = useAppSelector((state) => state.campanha.campanhas);
  const pageCampanhas = useAppSelector(state => state.campanha.pageResponse);

  const [visible, setVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [campanha, setCampanha] = useState<Questionario>();

  const [pageble, setPageble] = useState<PageRequest>({
    page: 0,
    size: 10,
    sort: [
      {
        orderBy: 'dataCriacao',
        direction: 'desc',
      },
    ],
  });

  useEffect(() => {
    dispatch(fetchCamp({alunoId: aluno?.id!, pageble: pageble})).then(page => {
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


  const handleConfirm = () => {
    showModal();
    navigation.navigate('camp_questoes', campanha!);
  };

  const showModal = () => setVisible(!visible);

  const onRefresh = () => {
    setIsRefreshing(true);
    setPageble(prev => ({...prev, page: 0}));
  };

  const fetchMoreData = () => {
    if (!pageCampanhas?.last) {
      setPageble(prev => ({...prev, page: pageble.page! + 1}));
      console.log('deu bom');
    } else {
      console.log('acabou');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="titleLarge" style={styles.text}>Campanhas Disponiveis para você</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={campanhas}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        keyExtractor={(camp) => camp.id!.toString()}
        ListEmptyComponent={
          !campanhas && loading === false ? (<ListEmpty
            title="Não há campanhas no momento."
            subTitle="Tente voltar mais tarde!"
            icon={{
              name:'book-open-page-variant-outline',
              size:110,
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
              showModal();
              setCampanha(item);
            }
          }
        >
        {item.titulo}
        </Button>
        )}
        onEndReachedThreshold={0.1}
        onEndReached={fetchMoreData}
        ListFooterComponent={
          pageCampanhas?.empty === false ? (
            <ListLoading
              loading={!pageCampanhas.last}
              size={'small'}
              color={theme.colors.secondary}
            />
          ) : null
        }
      />
      <ModalQuestionario
        visible={visible}
        titulo={campanha ? campanha.titulo : '' }
        dificuldade={campanha ? campanha.dificuldade : ''}
        qtdQuestoes={campanha ? campanha.qtdQuestoes : 0 }
        onClose={() => showModal()}
        navigate={handleConfirm}
      />
      {loading && !pageCampanhas ? (<Loading/>) : null}
    </SafeAreaView>
  );
};

export default EscolhaCamp;
