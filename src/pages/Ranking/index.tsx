import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import RankingCard from '../../components/RankingCard';
import {useAppDispatch, useAppSelector} from '../../types/reduxHooks';
import {fetchPoints} from '../../redux/pontuacaoSlice';
import AppBar from '../../components/AppBar';
import ListEmpty from '../../components/ListEmpty';
import {useTheme, CheckboxItemProps} from 'react-native-paper';
import {AppTheme} from '../../types/theme';
import Loading from '../../components/Loading';
import {PageRequest} from '../../types/page';
import ListLoading from '../../components/ListLoading';
import DialogFilter, { checkBoxInterface } from '../../components/DialogFilter';

const Ranking = () => {
  const theme = useTheme<AppTheme>();

  const dispatch = useAppDispatch();

  const pontuacoes = useAppSelector(state => state.pontuacao.pontuacoes);
  const pagePontuacoes = useAppSelector(state => state.pontuacao.pageResponse);
  const loading = useAppSelector(state => state.pontuacao.loading);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const [checkBox, setCheckBox] = useState<checkBoxInterface[]>([
    {
      title: 'nivel',
      checked: 'checked',
      orientation:'desc',
    },
    {
      title: 'experiencia',
      checked: 'checked',
      orientation:'desc',
    },
  ]);

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

  useEffect(() => {
    dispatch(fetchPoints(pageble))
      .then(page => {
        console.log('page:', page);
      })
      .catch(response => {
        console.log('error:', response.message);
      });
    setIsRefreshing(false);
  }, [pageble]);

  const onRefresh = () => {
    setIsRefreshing(true);
    setPageble(prev => ({...prev, page: 0}));
  };

  const handleFilter = () => {
    setIsRefreshing(true);

    setPageble((prev) => ({
      ...prev,
      sort: getCheckedSortOptions(),
      page: 0,
    }));
  };

  const getCheckedSortOptions = () => {
    return checkBox
      .filter((item) => item.checked === 'checked')
      .map((item) => ({
        orderBy: item.title,
        direction: item.orientation,
      }));
  };

  const fetchMoreData = () => {
    if (!pagePontuacoes?.last) {
      setPageble(prev => ({...prev, page: pageble.page! + 1}));
      console.log('deu bom');
    } else {
      console.log('acabou');
    }
  };

  const updateCheck = (index: number, checked:CheckboxItemProps['status']) => {
    let newArr = [...checkBox];
    newArr[index].checked = checked;
    setCheckBox(newArr);
    console.log(newArr);
  };

  const updateRadio = (index: number, orientation:checkBoxInterface['orientation']) => {
    let newArr = [...checkBox];
    newArr[index].orientation = orientation;
    setCheckBox(newArr);
    console.log(newArr);
  };

  const showDialog = () => setVisible(!visible);

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title="Ranking"
        dots={[
          {
            id: 1,
            title: 'Filtrar',
            action: () => {
              showDialog();
            },
          },
        ]}
      />
      <FlatList
        showsVerticalScrollIndicator={true}
        data={pontuacoes}
        keyExtractor={point => point.id.toString()}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
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
      {!loading && pagePontuacoes ?
        <DialogFilter
          content={checkBox}
          ok={handleFilter}
          showDialog={showDialog}
          title="Pontuação"
          updateCheck={updateCheck}
          updateRadio={updateRadio}
          visible={visible}
        /> : null}
    </SafeAreaView>
  );
};
export default Ranking;
