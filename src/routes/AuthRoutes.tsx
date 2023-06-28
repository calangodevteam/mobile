import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Auth/Login';
import Cadastro from '../pages/Auth/Cadastro';

const {Navigator, Screen} = createNativeStackNavigator();

const AuthRoutes = () => {

  return (
    <Navigator
    screenOptions={{headerShown: false}}
    initialRouteName={'login'}
    >
      <Screen
        name="login"
        component={Login}
      />
      <Screen
        name="cadastro"
        component={Cadastro}
      />
    </Navigator>
  );
};

export default AuthRoutes;
