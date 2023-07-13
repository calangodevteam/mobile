import React, { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';
import LoadingInicial from '../components/LoadingInicial';
import { useAppSelector } from '../types/reduxHooks';


const Routes = () => {
    const signed = useAppSelector((state) => state.auth.signed);
    const [loadingGoogle, setLoadingGoogle] = useState<boolean>(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(() => {
        auth().onAuthStateChanged(userState => {
          setUser(userState);

          if (loadingGoogle) {
            setLoadingGoogle(false);
          }
        });
      }, []);

    if (loadingGoogle){
        return <LoadingInicial/>;
    }

    return user != null && signed ? <AppRoutes /> : <AuthRoutes />;

};

export default Routes;
