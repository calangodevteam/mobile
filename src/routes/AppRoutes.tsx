import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EscolhaCamp from '../pages/Campanhas/EscolhaCamp';
import QuestoesCamp from '../pages/Campanhas/QuestoesCamp';
import ResultadoCamp from '../pages/Campanhas/ResultadoCamp';
import BottomRoutes from './BottomRoutes';

const {Navigator, Screen} = createNativeStackNavigator();

const AppRoutes = () => {
  return (
    <Navigator
    screenOptions={{}}
    >
      <Screen
        name="camp_historico"
        component={BottomRoutes}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="camp_escolha"
        component={EscolhaCamp}
        options={{
          title:'Lista de Campanhas',
        }}
      />
      <Screen
        name="camp_questoes"
        component={QuestoesCamp}
        options={{
          headerShown: false,
          title:'Questões',
        }}
      />
      <Screen
        name="camp_resultado"
        component={ResultadoCamp}
        options={{
          headerShown: false,
          title:'Resultado Obtido',
        }}
      />
    </Navigator>
  );
};

export default AppRoutes;
