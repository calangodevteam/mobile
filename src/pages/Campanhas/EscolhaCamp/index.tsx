import React, { useEffect, useState } from 'react';
import {styles} from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import ModalQuestionario from '../../../components/ModalQuestionario';
import ListEmpty from '../../../components/ListEmpty';
import { Questionario } from '../../../@types/questionario';
import { AppTheme } from '../../../@types/theme';
import { findQuestionarios } from '../../../services/ApiCalango';
import Loading from '../../../components/Loading';

const EscolhaCamp = () => {

  const theme = useTheme<AppTheme>();
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [campanhas, setCampanhas] = useState<Questionario[]>([]);
  const [campanha, setCampanha] = useState<Questionario>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    findQuestionarios().then((response) => {
      console.log('reposta: ', response.data.elementos);
      setCampanhas(response.data.elementos);
      setLoading(false);
    }).catch(response => {
      console.log('error: ', response);
    });
  }, []);

  const handleConfirm = () => {
    showModal();
    navigation.navigate('camp_questoes', campanha!);
  };

  const showModal = () => setVisible(!visible);

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="titleLarge" style={styles.text}>Campanhas Disponiveis para você</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={campanhas}
        refreshing={loading}
        keyExtractor={(camp) => camp.id!.toString()}
        ListEmptyComponent={
          campanhas && loading === false ? (<ListEmpty
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
      />
      <ModalQuestionario
        visible={visible}
        titulo={campanha ? campanha.titulo : '' }
        dificuldade={campanha ? campanha.dificuldade : ''}
        qtdQuestoes={campanha ? campanha.qtdQuestoes : 0 }
        onClose={() => showModal()}
        navigate={handleConfirm}
      />
      {loading ? (<Loading/>) : null}
    </SafeAreaView>
  );
};

export default EscolhaCamp;
