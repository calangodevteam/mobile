import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import RankingCard from '../../components/RankingCard';
import {useAppDispatch, useAppSelector} from '../../types/reduxHooks';
import {fetchPoints} from '../../redux/pontuacaoSlice';
import AppBar from '../../components/AppBar';
import ListEmpty from '../../components/ListEmpty';
import {useTheme} from 'react-native-paper';
import {AppTheme} from '../../types/theme';
import Loading from '../../components/Loading';
import {PageRequest} from '../../types/page';
import ListLoading from '../../components/ListLoading';

const Ranking = () => {
  const theme = useTheme<AppTheme>();

  const dispatch = useAppDispatch();

  const pontuacoes = useAppSelector(state => state.pontuacao.pontuacoes);
  const pagePontuacoes = useAppSelector(state => state.pontuacao.pageResponse);
  const [pageble, setPageble] = useState<PageRequest>({
    page: 0,
    size: 2,
    sort: [
      {
        orderBy: 'nivel',
        direction: 'desc',
      },
      {
        orderBy: 'experiencia',
        direction: 'desc',
      },
    ],
  });

  const loading = useAppSelector(state => state.pontuacao.loading);

  useEffect(() => {
    dispatch(
      fetchPoints(pageble),
    ).then(page => {
        console.log('page:', page);
      })
      .catch(response => {
        console.log('error:', response.message);
      });
  }, [pageble]);

  const fetchMoreData = () => {
    if (!pagePontuacoes?.last) {
      setPageble(prev => ({...prev, page: pageble?.page! + 1}));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Ranking"
        dots={[
          {
            id: 1,
            title: 'Filtrar',
            action: () => {},
          },
        ]}
      />
      <FlatList
        showsVerticalScrollIndicator={true}
        data={pontuacoes}
        keyExtractor={point => point.id.toString()}
        ListEmptyComponent={
          !pontuacoes && loading === false ? (
            <ListEmpty
              title="Ranking Vazio!"
              subTitle="Clique em iniciar campanha e seja o primeiro!"
              icon={{
                name: 'podium',
                size: 60,
                color: theme.colors.onBackground,
              }}
            />
          ) : null
        }
        renderItem={({item, index}) => (
          <RankingCard
            foto={item.aluno.fotoPerfil}
            nome={item.aluno.nome}
            nivel={item.nivel}
            ind={index + 1}
            exp={item.experiencia}
          />
        )}
        onEndReachedThreshold={0.1}
        onEndReached={fetchMoreData}
        ListFooterComponent={
          pagePontuacoes ? (
            <ListLoading
              loading={!pagePontuacoes.last}
              size={'small'}
              color={theme.colors.secondary}
            />
          ) : null
        }
      />
      {loading && !pagePontuacoes ? <Loading /> : null}
    </SafeAreaView>
  );
};
export default Ranking;
