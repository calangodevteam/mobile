import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {AnimatedFAB, Button, useTheme, Avatar} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FlatList, ScrollView, View } from 'react-native';
import ListEmpty from '../../../components/ListEmpty';
import { AppTheme } from '../../../@types/theme';
import { Resultado } from '../../../@types/questionario';
import { findResultadoByAluno } from '../../../services/ApiCalango';

import Loading from '../../../components/Loading';
import auth from '@react-native-firebase/auth';
import { useAppSelector } from '../../../@types/reduxHooks';



//essa screen esta fazendo a importação da imagem do usuario para tela de historico ,conforme os prototipos do figma
const HistoricoCamp = () => {

  const theme = useTheme<AppTheme>();
  const aluno = useAppSelector((state) => state.auth.aluno);
  const navigation = useNavigation();
  const user = auth().currentUser;
  const [resultados, setResultados] = useState<Resultado[]>([]);

  const [isExtended, setIsExtended] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsExtended(!isExtended);
    findResultadoByAluno(aluno?.id!).then(response => {
      console.log('response: ', response.data.content);
      setResultados(response.data.content as Resultado[]);
      setLoading(false);
    }).catch(response => {
      console.log('Error: ', response.message);
    });
  }, []);

  const handleCampanha = () => {
    navigation.navigate('camp_escolha');
  };

  return (
    
    <SafeAreaView style={styles.container}>
    
       
    <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="none">
        <View style={styles.containerImage}>
          <Avatar.Image
            style={styles.image}
            size={120}
            source={
              user
                ? {
                    uri: user.photoURL,
                  }
                : require('../../../assets/avatar.png')
            }
          />
        </View>
   </ScrollView>
   
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

    
      <FlatList
        showsVerticalScrollIndicator={false}
        data={resultados}
        keyExtractor={(resp) => resp.questionario.id.toString()}
        ListEmptyComponent={
          resultados && loading === false ? (<ListEmpty
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
    
      {loading ? (<Loading/>) : null}
    </SafeAreaView>
  );
};

export default HistoricoCamp;
