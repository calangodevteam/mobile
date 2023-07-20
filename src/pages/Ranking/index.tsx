import React, {useEffect} from 'react';
import {FlatList} from 'react-native';

import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import RankingCard from '../../components/RankingCard';
import {useAppDispatch, useAppSelector} from '../../types/reduxHooks';
import {fetchPoints} from '../../redux/pontuacaoSlice';
import AppBar from '../../components/AppBar';
import ListEmpty from '../../components/ListEmpty';
import { useTheme } from 'react-native-paper';
import { AppTheme } from '../../types/theme';
import Loading from '../../components/Loading';

const Ranking = () => {

  const theme = useTheme<AppTheme>();

  const dispatch = useAppDispatch();

  const pontuacoes = useAppSelector(state => state.pontuacao.pontuacoes);
  const loading = useAppSelector((state) => state.pontuacao.loading);

  useEffect(() => {
    dispatch(fetchPoints({
      page:0,
      size:10,
      sort:[
        {
          orderBy:'nivel',
          direction:'desc',
        },
        {
          orderBy:'experiencia',
          direction:'desc',
        },
      ],
    })).catch(response => {
      console.log('error:', response.message);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Ranking"
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={pontuacoes}
        keyExtractor={point => point.id.toString()}
        ListEmptyComponent={
          !pontuacoes && loading === false ? (
            <ListEmpty
              title="Ranking Vazio!"
              subTitle="Clique em iniciar campanha e seja o primeiro!"
              icon={{
                name: 'podium',
                size:60,
                color: theme.colors.onBackground,
              }}
            />
          ) : null
        }
        renderItem={({item, index}) => (
          <RankingCard foto={item.aluno.fotoPerfil} nome={item.aluno.nome} nivel={item.nivel} ind={(index + 1)} exp={item.experiencia} />
        )}
      />
    {loading ? (<Loading/>) : null}
    </SafeAreaView>
  );
};
export default Ranking;
