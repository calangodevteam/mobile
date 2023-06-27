import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Auth/Login';
import Cadastro from '../pages/Auth/Cadastro';
import Inicial from '../pages/Inicial';
import AppRoutes from './AppRoutes';

const {Navigator, Screen} = createNativeStackNavigator();

const AuthRoutes = () => {

  return (
    <Navigator
    screenOptions={{headerShown: false}}
    initialRouteName={'inicial'}
    >
      <Screen
        name="inicial"
        component={Inicial}
      />
      <Screen
        name="login"
        component={Login}
      />
      <Screen
        name="cadastro"
        component={Cadastro}
      />
      <Screen
        name="app"
        component={AppRoutes}
      />
    </Navigator>
  );
};

export default AuthRoutes;
