import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {AnimatedFAB, Button, useTheme} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import ListEmpty from '../../../components/ListEmpty';
import { respostaImpl } from '../../../utils/data';
import { AppTheme } from '../../../@types/theme';

const HistoricoCamp = () => {

  const theme = useTheme<AppTheme>();
  const navigation = useNavigation();

  const [isExtended, setIsExtended] = useState(false);

  useEffect(() => {
    setIsExtended(!isExtended);
  }, []);

  const handleCampanha = () => {
    navigation.navigate('camp_escolha');
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={respostaImpl}
        keyExtractor={(resp) => resp.questionario.id.toString()}
        ListEmptyComponent={
          <ListEmpty
            title="Hístico de Campanha Vazio!"
            subTitle="Clique em iniciar campanha e se divirta!"
            icon={{
              name:'book-open-page-variant-outline',
              size:80,
              color:theme.colors.onBackground,
            }}
          />
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
    </SafeAreaView>
  );
};

export default HistoricoCamp;
